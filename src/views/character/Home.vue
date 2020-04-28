<template>
  <app-layout headerText="Character Status">
    <app-loader v-if="showLoader" loadingMessage="Loading Character"></app-loader>

    <div class="character-home-screen row nomargin">
      <div class="col-sm-4 nopadding" v-if="character">
        <app-character-details :character="character"></app-character-details>
      </div>

      <div class="col-sm-8 nopadding" v-if="character">
        <app-character-stats :character="character"></app-character-stats>
      </div>
    </div>
  </app-layout>
</template>

<script>
import { mapGetters } from "vuex";
import AccountMixin from "../../mixins/AccoutMixin";
import CharacterDetails from "../../components/character/CharacterDetails";
import CharacterStats from "../../components/character/CharacterStats";

export default {
  components: {
    appCharacterDetails: CharacterDetails,
    appCharacterStats: CharacterStats
  },
  created: function() {
    this.showLoader = true;
    this.getCharacter(this.account).then(res => {
      this.showLoader = false;
      this.character = res;

      this.$store.commit("setCharacter", res._id);
    });
  },
  computed: {
    ...mapGetters({
      account: 'account'
    })
  },
  mixins: [AccountMixin],
  data: function() {
    return {
      character: undefined,
      showLoader: false
    };
  }
}
</script>

<style lang="scss" scoped>
.character-home-screen {
  height: 100%;
}
</style>