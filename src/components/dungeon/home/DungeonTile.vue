<template>
  <div class="dungeon-tile" 
    :style="{ backgroundImage: `url(${backgroundImage})` }"
    @click="onDungeonClick">
    <img :src="overlayImage" class="locked-overlay" v-if="dungeon.locked" />
  </div>
</template>

<script>
export default {
  props: {
    dungeon: {
      required: true
    },
    value: undefined
  },
  computed: {
    backgroundImage: function() {
      return require(`../../../assets/images/dungeons/${this.dungeon.image}.jpg`);
    },
    overlayImage: function() {
      return require(`../../../assets/images/dungeons/locked-overlay.png`);
    }
  },
  methods: {
    onDungeonClick: function() {
      this.$emit("input", this.dungeon);
    }
  }
}
</script>

<style lang="scss" scoped>
.dungeon-tile {
  height: 150px;
  width: 300px;
  margin: 15px auto 30px auto;
  background-size: cover;
  background-image: url('../../../assets/images/dungeons/beast-den.jpg');
  cursor: pointer;

  .locked-overlay {
    height: 150px;
    width: 300px;
  }
}
</style>