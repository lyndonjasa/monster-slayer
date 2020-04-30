<template>
  <app-layout headerText="Dungeons">
    <app-loader v-if="showLoader" loadingMessage="Loading Dungeons"></app-loader>

    <div class="dungeon-home-screen row nomargin">
      <div class="col-sm-6 nopadding">
        <app-dungeon-list></app-dungeon-list>
      </div>

      <div class="col-sm-6 nopadding">
        <app-dungeon-details></app-dungeon-details>
      </div>
    </div>
  </app-layout>
</template>

<script>
import { mapGetters } from "vuex";
import CharacterMixin from "../../mixins/CharacterMixin";
import DungeonDetails from "../../components/dungeon/DungeonDetails";
import DungeonList from "../../components/dungeon/DungeonList";

export default {
  components: {
    appDungeonDetails: DungeonDetails,
    appDungeonList: DungeonList
  },
  created: function() {
    this.showLoader = true;
    this.getDungeonAccess(this.characterId).then(res => {
      this.showLoader = false;
      this.dungeons = res;
      this.selectedDungeon = res[0];
    });
  },
  mixins: [CharacterMixin],
  data: function() {
    return {
      dungeons: [],
      showLoader: false,
      selectedDungeon: undefined
    };
  },
  computed: {
    ...mapGetters({
      characterId: "character"
    })
  }
}
</script>

<style lang="scss" scoped>
.dungeon-home-screen {
  height: 450px;
}
</style>