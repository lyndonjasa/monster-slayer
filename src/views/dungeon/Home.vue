<template>
  <app-layout headerText="Dungeons">
    <app-loader v-if="showLoader" loadingMessage="Loading Dungeons"></app-loader>

    <div class="dungeon-home-screen row nomargin">
      <div class="col-sm-6 nopadding">
        <app-dungeon-list>
          <app-dungeon-tile v-for="dungeon in dungeons" :key="dungeon._id" 
            :dungeon="dungeon"
            v-model="selectedDungeon">
          </app-dungeon-tile>
        </app-dungeon-list>
      </div>

      <div class="col-sm-6 nopadding">
        <app-dungeon-details :dungeon="selectedDungeon" @enter-dungeon="enterDungeon"></app-dungeon-details>
      </div>
    </div>
  </app-layout>
</template>

<script>
import { mapGetters } from "vuex";
import CharacterMixin from "../../mixins/CharacterMixin";
import DungeonDetails from "../../components/dungeon/home/DungeonDetails";
import DungeonList from "../../components/dungeon/home/DungeonList";
import DungeonTile from "../../components/dungeon/home/DungeonTile";

export default {
  components: {
    appDungeonDetails: DungeonDetails,
    appDungeonList: DungeonList,
    appDungeonTile: DungeonTile
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
  },
  methods: {
    enterDungeon: function(dungeonId) {
      this.$router.push(`/dungeons/${dungeonId}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.dungeon-home-screen {
  height: 450px;
}
</style>