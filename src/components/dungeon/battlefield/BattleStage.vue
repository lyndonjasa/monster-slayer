<template>
  <div class="battle-stage" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    image: { required: true }
  },
  computed: {
    backgroundImage: function() {
      return require(`../../../assets/images/dungeons/${this.image}.jpg`);
    }
  }
}
</script>

<style lang="scss" scoped>
.battle-stage {
  height: 400px;
  width: 800px;
}
</style>