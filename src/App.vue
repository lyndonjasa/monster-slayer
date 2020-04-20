<template>
  <div id="app">
    <app-start v-if="showOverlay" @start="showOverlay = false"></app-start>

    <app-form v-if="!hasAccount"></app-form>
    <app-battle v-else></app-battle>
  </div>
</template>

<script>
import Start from "./components/Start";
import Battle from "./components/Battle";
import Form from "./components/forms/Form";

export default {
  name: 'app',
  components: {
    appStart: Start,
    appBattle: Battle,
    appForm: Form
  },
  data () {
    return {
      showOverlay: true,
      hasAccount: false
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
