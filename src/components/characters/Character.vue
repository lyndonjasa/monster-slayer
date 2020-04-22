<template>
  <div>
    <div class="status-bar-container">
      <app-health-bar v-if="character"
        :remainingHealthPercentage="remainingHealthPercentage"
        :remainingManaPercentage="remainingManaPercentage"
        :name="character.name"
      ></app-health-bar>
    </div>

    <div class="character-image-container">
      <img class="character-image" 
          :src="!character.showAlt ? character.image : character.altImage"
          :class="{ 'player-image' : character.isPlayer, 'enemy-image': !character.isPlayer }"
          :style="{ left: leftAlign }"
      />
    </div>
  </div>
</template>

<script>
import HealthBar from "./HealthBar";

export default {
  components: {
    appHealthBar: HealthBar
  },
  props: ["character"],
  data: function() {
    return {
      leftAlign: "0px"
    }
  },
  computed: {
    remainingHealthPercentage: function() {
      return (this.character.actualHealth / this.character.totalHealth);
    },
    remainingManaPercentage: function() {
      return (this.character.mana / this.character.totalMana);
    }
  },
  mounted: function() {
    debugger
    setTimeout(() => {
      const selector = this.character.isPlayer ? ".player-image" : ".enemy-image";
      const image = document.querySelector(selector);
      const leftPosition = (400 - image.clientWidth) / 2;

      this.leftAlign = leftPosition + "px";
    }, 100);
  }
}
</script>

<style lang="scss" scoped>
.character-image-container {
  text-align: center;
  height: 327px;
}

.character-image {
  position: absolute;
  bottom: 70px;

  &.player-image {
    max-height: 75px;
  }

  &.enemy-image {
    max-height: 250px;
  }
}
</style>