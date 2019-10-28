<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <sky/>
    <spotifyLogin clientId="fcbd8cb9249b4fb28c041a433bdccd07"/>
    <div :v-if="songs">
      <div v-for="s in songs" v-bind:key="s.id" class="flowers">
        <song :id="s.id" dimension="81px"/>
      </div>
    </div>

  </div>
</template>

<script>
import song from './components/song.vue'
import spotifyLogin from './components/spotify-login.vue'
import sky from './components/sky.vue'

export default {
  name: 'app',
  components: {
    spotifyLogin,
    song,
    sky
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
        background-image: linear-gradient(#87ceeb, #1DB954);
        background-size: cover;
    }
    #app * {
      max-width: 100%;
    }
    .flowers {
      display: inline-block
    }

    body{
        margin:0;
    }
</style>
