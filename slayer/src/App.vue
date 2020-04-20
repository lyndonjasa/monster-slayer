<template>
  <div id="app">
    <app-start v-if="showOverlay" @start="showOverlay = false"></app-start>

    <app-battle></app-battle>
  </div>
</template>

<script>
import Start from "./components/Start";
import Battle from "./components/Battle";

export default {
  name: 'app',
  components: {
    appStart: Start,
    appBattle: Battle
  },
  data () {
    return {
      showOverlay: true
    };
  }
}
</script>

<style lang="scss">
@import "./assets/styles.scss";

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
