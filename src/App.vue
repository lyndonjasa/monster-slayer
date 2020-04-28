<template>
  <div id="app">
    <app-start v-if="showOverlay" @start="showOverlay = false"></app-start>
    <div v-if="!account" class="white-overlay"></div>

    <router-view />
    <!-- <app-form 
      v-if="!hasAccount"
      @account-created="loadAccount($event)"
      @on-login="loadAccount($event)">
    </app-form> -->
    <!-- <app-battle
      v-else-if="hasAccount && playerAccount"
      :player="playerAccount">
    </app-battle> -->
  </div>
</template>

<script>
import Start from "./components/Start";
import Battle from "./components/Battle";
import Form from "./views/login/Form";
import { loadFromStore } from "./shared/storage-helper";
import { createPlayer, extractPlayer } from "./shared/characters";
import AccountMixin from "./mixins/AccoutMixin";
import { mapGetters } from "vuex";

export default {
  name: 'app',
  components: {
    appStart: Start,
    appBattle: Battle,
    appForm: Form
  },
  mixins: [AccountMixin],
  computed: {
    ...mapGetters({
      account: "account"
    })
  },
  created: function() {
    if (this.account) {
      this.showOverlay = false;
    }
  },
  data () {
    return {
      showOverlay: true,
      hasAccount: false,
      playerAccount: undefined,
      isLoading: false
    };
  },
  methods: {
    loadAccount: function(accountId) {
      this.isLoading = true;
      this.getCharacter(accountId).then(response => {
        this.hasAccount = true;
        this.playerAccount = extractPlayer(response);

        this.isLoading = false;
      });
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
  min-width: 800px;
  background-image: url("./assets/images/main_bg.png");
  background-position: center;

  .white-overlay {
    position: fixed;
    display: block; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white; /* Hide background */
    z-index: 4; /* Specify a stack order in case you're using a different order for other elements */
    overflow: auto;
  }
}
</style>
