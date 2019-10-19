<template>
  <button @click="login">Log in with spotify</button>
</template>

<script>
import store from '../store'
export default {
    data: function() {
        return {}
    },
    methods: {
        login: function(){
            console.log("do implicit grant here")

        }
    }
}
</script>

<style>

</style>