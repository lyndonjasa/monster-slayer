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
  computed: {
    remainingHealthPercentage: function() {
      return (this.character.actualHealth / this.character.totalHealth);
    },
    remainingManaPercentage: function() {
      return (this.character.mana / this.character.totalMana);
    }
  }
}
</script>

<style lang="scss" scoped>
.character-image-container {
  text-align: center;
}

.character-image {
  text-align: center;

  &.player-image {
    margin-top: 175px;
    height: 75px;
  }

  &.enemy-image {
    height: 250px;
    margin-top: 25px;
  }
}
</style>