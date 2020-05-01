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

    <app-action-pane v-if="playerTurn" :skills="player.skills"></app-action-pane>

    <div class="pane row nomargin">
      <div class="col-sm-3 nopadding">
        <app-status-pane v-if="player" :stats="player.stats"></app-status-pane>
      </div>
      <div class="col-sm-9 nopadding">
        <app-battle-notification :message="battleMessage">
        </app-battle-notification>
      </div>
    </div>
  </div>
</template>

<script>
import BattleStage from "./BattleStage";
import Combatant from "./Combatant";
import BattleNotification from "./BattleNotification";
import ActionPane from "./ActionPane";
import StatusPane from "./StatusPane";

export default {
  components: {
    appBattleStage: BattleStage,
    appCombatant: Combatant,
    appBattleNotification: BattleNotification,
    appActionPane: ActionPane,
    appStatusPane: StatusPane
  },
  props: {
    dungeon: { required: true },
    enemy: { required: true },
    player: { required: true }
  },
  data: function() {
    return {
      battleMessage: "",
      playerTurn: false
    }
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