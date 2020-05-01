<template>
  <div class="combatant-container">
    <div class="status-bar-container">
      <app-status-bar v-if="combatant"
        :remainingHealthPercentage="remainingHealthPercentage"
        :remainingManaPercentage="remainingManaPercentage"
        :name="combatant.name"
        :level="combatant.level"
      ></app-status-bar>
    </div>

    <div class="character-image-container">
      <div class="character-image-container">
        <img class="character-image" 
            :src="!combatant.showAlt ? combatant.image : combatant.altImage"
            :class="{ 'player-image' : combatant.isPlayer, 'enemy-image': !combatant.isPlayer }"
            :style="{ left: leftAlign }"
        />
        <img class="character-image-alt" 
            :src="combatant.altImage"
            style="display: none"
        />
      </div>
    </div>
  </div>
</template>

<script>
import StatusBar from "./StatusBar";

export default {
  components: {
    appStatusBar: StatusBar
  },
  props: {
    combatant: { required: true }
  },
  data: function() {
    return {
      leftAlign: "0px"
    }
  },
  computed: {
    remainingHealthPercentage: function() {
      return (this.combatant.stats.health / this.combatant.stats.totalHealth);
    },
    remainingManaPercentage: function() {
      return (this.combatant.stats.mana / this.combatant.stats.totalMana);
    }
  },
  mounted: function() {
    this.$nextTick(() => {
      const img = new Image();
      img.src = this.combatant.image;

      img.onload = () => {
        const selector = this.combatant.isPlayer ? ".player-image" : ".enemy-image";
        const image = document.querySelector(selector);
        const leftPosition = (400 - image.clientWidth) / 2;
        this.leftAlign = leftPosition + "px";
      };
    });
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