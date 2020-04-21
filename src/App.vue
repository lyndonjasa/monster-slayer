<template>
  <div id="app">
    <app-start v-if="showOverlay" @start="showOverlay = false"></app-start>

    <app-form 
      v-if="!hasAccount"
      @account-created="loadAccount">
    </app-form>
    <app-battle
      v-else-if="hasAccount && playerAccount"
      :player="playerAccount">
    </app-battle>
  </div>
</template>

<script>
import Start from "./components/Start";
import Battle from "./components/Battle";
import Form from "./components/forms/Form";
import { loadFromStore } from "./shared/storage-helper";
import { createPlayer } from "./shared/characters";

export default {
  name: 'app',
  components: {
    appStart: Start,
    appBattle: Battle,
    appForm: Form
  },
  data () {
    return {
      showOverlay: false,
      hasAccount: false,
      playerAccount: undefined
    };
  },
  mounted: function() {
    this.loadAccount();
  },
  methods: {
    loadAccount: function() {
      const gameAccount = loadFromStore("gameAccount");
      if (gameAccount) {
        this.hasAccount = true;
        this.playerAccount = createPlayer(gameAccount.character.classType, gameAccount.character.name);
      }
    }
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
