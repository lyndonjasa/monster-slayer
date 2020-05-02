<template>
  <div class="dungeon-re-enter-overlay">
    <div class="reenter-actions-pane dark-bg">
      <div class="pane-header">Re-Enter Dungeon?</div>
      <div class="pane-actions row nomargin">
        <div class="col-sm-6 center">
          <button class="btn-principal" @click="$emit('re-enter', true)">Yes</button>
        </div>
        <div class="col-sm-6 center">
          <button class="btn-principal" @click="$emit('re-enter', false)">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.dungeon-re-enter-overlay {
  position: fixed;
  display: block; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 9; /* Specify a stack order in case you're using a different order for other elements */
  overflow: auto;

  .reenter-actions-pane {
    height: 140px;
    padding: 15px;
    width: 400px;
    z-index: 10;
    margin: auto;
    text-align: center;
    margin-top: calc(calc(100vh - 220px) / 2);
    font-family: AtariClassic;

    .pane-header {
      font-size: 20px;
    }

    .pane-actions {
      margin-top: 15px !important;

      button {
        width: 100px;
      }
    }
  }
}
</style>