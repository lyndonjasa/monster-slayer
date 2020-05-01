<template>
  <div class="dungeon-list">
    <app-tile>
      <div class="dungeon-tiles-container center" v-slimscroll="slimScrollOptions">
        <slot></slot>
      </div>
    </app-tile>
  </div>
</template>

<script>
export default {
  computed: {
    slimScrollOptions: function() {
      return {
        height: "430px",
        color: "#E4E1CB",
        alwaysVisible: true
      };
    }
  }
}
</script>

<style lang="scss" scoped>
.dungeon-list {
  height: 448px;
}
</style>