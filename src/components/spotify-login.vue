<template>
  <div>
    <div v-if="this.access_token">
      <p> Welcome, {{ name }}</p>
      <button @click="wipeData">Log out</button>
    </div>
    <div v-else>
      <button @click="login">Log in with spotify</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clientId: String
  },
  data: function() {
    const tokenParams = this.getHashParams()
    if (tokenParams.access_token) {
      this.$store.commit('setAccessToken', tokenParams.access_token)
    }
    if (this.$store.state.spotify.access_token) {
      this.$store.dispatch('loadUserData')
      this.$store.dispatch('loadUserSongs')
    }
    return {
      token: tokenParams
    }
  },
  computed: {
    name: function() {
      if(this.$store.state.spotify.user.display_name) {
        return this.$store.state.spotify.user.display_name
      } else {
        return 'moodscape'
      }
    },
    access_token: function() {
      this.$store.dispatch('loadUserData')
      this.$store.dispatch('loadUserSongs')
      return this.$store.state.spotify.access_token
    }
  },
  methods: {
    login: async function(){
      const client_id = this.$props.clientId
      var redirect_uri = window.location // Your redirect uri

      var state = this.generateRandomString(16);

      var scope = 'user-read-recently-played';

      var url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      url += '&state=' + encodeURIComponent(state);

      window.location = url;
    },
    generateRandomString: function(length) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    getHashParams: function() {
      const location = window.location.hash.substring(1)
      const paramList = location.split('&')
      const params = paramList.map((s)=>{
        return s.split('=')
      })
      let hashParams = {}
      params.forEach(element => {
        hashParams[element[0]] = element[1]
      })
      return hashParams
    },
    showToken: function() {
      alert(this.$store.state.spotify.access_token)
    },
    wipeData: function() {
      this.$store.commit('resetState')
      this.$data.access_token = ''
    }
  }
}
</script>

<style>

</style>