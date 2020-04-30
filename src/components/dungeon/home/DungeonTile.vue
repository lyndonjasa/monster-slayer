<template>
  <div class="dungeon-tile">
    {{ dungeon.name }}
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
  methods: {
    onDungeonClick: function() {
      this.$emit("input", this.dungeon);
    },
    backgroundImage: function() {
      return `../../../assets/images/dungeons/${this.dungeon.image}.jpg`;
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
}
</style>