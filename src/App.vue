<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <spotifyLogin clientId="fcbd8cb9249b4fb28c041a433bdccd07"/>
    <div :v-if="songs">
      <div v-for="s in songs" v-bind:key="s.id" class="flowers">
        <song :id="s.id" />
      </div>
    </div>
  </div>
</template>

<script>
import song from './components/song.vue'
import spotifyLogin from './components/spotify-login.vue'

export default {
  name: 'app',
  components: {
    spotifyLogin,
    song
  },
  computed: {
    songs: function() {
      return this.$store.state.spotify.songs
    },
    access_token: function() {
      if (this.$store.state.spotify.access_token) {
        this.$store.dispatch('loadUserData')
        this.$store.dispatch('loadUserSongs')
      }
      return this.$store.state.spotify.access_token
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.flowers {
  display: inline-block
}
</style>
