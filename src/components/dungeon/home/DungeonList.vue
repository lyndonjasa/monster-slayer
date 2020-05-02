<template>
  <div class="dungeon-list">
    <app-tile>
      <vue-scroll :ops="scrollOptions">
        <div class="dungeon-tiles-container center">
          <slot></slot>
        </div>
      </vue-scroll>
    </app-tile>
  </div>
</template>

<script>
export default {
  computed: {
    scrollOptions: function() {
      return {
          scrollPanel: {
            scrollingX: false
          },
          bar: {
            keepShow: true,
            background: "#E4E1CB",
            opacity: 0.5
          }
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