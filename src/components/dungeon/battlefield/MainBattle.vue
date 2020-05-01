<template>
  <div class="main-battle-container">
    <app-battle-stage v-if="dungeon" :image="dungeon.image">
      <div class="dungeon-field row nomargin">
        <div class="col-sm-6 nopadding">
          <app-combatant :combatant="player"></app-combatant>
        </div>
        <div class="col-sm-6 nopadding">
          <app-combatant :combatant="enemy"></app-combatant>
        </div>
      </div>
    </app-battle-stage>
  </div>
</template>

<script>
import BattleStage from "./BattleStage";
import Combatant from "./Combatant";

export default {
  components: {
    appBattleStage: BattleStage,
    appCombatant: Combatant
  },
  props: {
    dungeon: { required: true },
    enemy: { required: true },
    player: { required: true }
  }
}
</script>

<style lang="scss" scoped>
.main-battle-container {
  height: 100%;

  .dungeon-field {
    width: 100%;
    height: 400px;
  }
}
</style>