<template>
  <app-layout headerText="Battlefield" prevRoute="/dungeons">
    <app-loader v-if="showLoader" loadingMessage="Loading Battlefield"></app-loader>

    <div class="dungeon-battlefield-container">
      <app-main-battle
        v-if="player && enemy"
        :player="player" 
        :enemy="enemy" 
        :dungeon="dungeon"></app-main-battle>
    </div>
  </app-layout>
</template>

<script>
import { mapGetters } from "vuex";
import CharacterMixin from "../../mixins/CharacterMixin";
import DungeonMixin from "../../mixins/DungeonMixin";
import { extractPlayer, extractEnemy } from "../../shared/characters";
import MainBattle from "../../components/dungeon/battlefield/MainBattle";

export default {
  components: {
    appMainBattle: MainBattle
  },
  created: function() {
    this.showLoader = true;
    this.getCharacterById(this.characterId).then(res => {
      this.player = extractPlayer(res);

      this.enterDungeon(this.dungeonId, this.characterId).then(res => {
        this.dungeon = res.dungeon;
        this.enemy = extractEnemy(res.enemy);
        this.showLoader = false;
      }).catch(err => {
        if (err.status == 400 && err.body == "Character has no access to this dungeon") {
          this.$router.push("/dungeons");
        }
      });
    });
  },
  mixins: [CharacterMixin, DungeonMixin],
  data: function() {
    return {
      dungeon: undefined,
      player: undefined,
      enemy: undefined,
      showLoader: false
    };
  },
  computed: {
    dungeonId: function() {
      return this.$route.params.id;
    },
    ...mapGetters({
      characterId: "character"
    })
  }
}
</script>

<style lang="scss" scoped>
.dungeon-battlefield-container {
  height: 520px;
}
</style>