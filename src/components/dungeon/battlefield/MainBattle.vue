<template>
  <div class="main-battle-container">
    <app-battle-stage :image="dungeon.image"></app-battle-stage>
    Main Battle Container
  </div>
</template>

<script>
import BattleStage from "./BattleStage";

export default {
  components: {
    appBattleStage: BattleStage
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
}
</style>