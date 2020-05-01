<template>
  <div class="status-pane dark-bg">
    <app-tile>
      <div class="status row nomargin">
        <div class="col-sm-12 nopadding">Health:</div>
        <div class="col-sm-12 right nopadding">{{ stats.health }} / {{ stats.totalHealth }}</div>
        <div class="col-sm-12 nopadding">Mana:</div>
        <div class="col-sm-12 right nopadding">{{ stats.mana }} / {{ stats.totalMana }}</div>
      </div>
    </app-tile>
  </div>
</template>

<script>
export default {
  props: {
    stats: { required: true }
  }
}
</script>

<style lang="scss" scoped>
.status-pane {
  height: 120px;

  .status {
    color: white;
    font-size: 12px;
    font-family: AtariClassic;
    margin-top: 15px !important;
    padding: 3px !important;
  }
}
</style>