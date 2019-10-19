<template>
  <div>
    <button @click="login">Log in with spotify</button>
    <p>{{ token }}</p>
  </div>
</template>

<script>
export default {
  props: {
    clientId: String
  },
  data: function() {
    const tokenParams = this.getHashParams() 
    return {
      token: tokenParams
    }
  },
  methods: {
    login: async function(){
      const client_id = this.$props.clientId
      var redirect_uri = 'http://localhost:8080/'; // Your redirect uri

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
      });
      this.$store.commit('setAccessToken', hashParams.access_token)
      return params
    }
  }
}
</script>

<style>

</style>