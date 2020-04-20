<template>
  <div class="status-bar">
    <div class="health-bar">
      <div class="total-health" 
          :style="{ width: healthWidth }"
          :class="{ critical: criticalHealth }"></div>
    </div>
    <div class="mana-bar">
      <div class="total-mana" 
          :style="{ width: manaWidth }"
          :class="{ critical: criticalMana }"></div>
    </div>
    <div class="name-bar">
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['remainingHealthPercentage', 'remainingManaPercentage', 'name'],
  computed: {
    healthWidth: function() {
      return this.remainingHealthPercentage * 376 + 'px';
    },
    criticalHealth: function() {
      return this.remainingHealthPercentage <= .3;
    },
    manaWidth: function() {
      return this.remainingManaPercentage * 376 + 'px';
    },
    criticalMana: function() {
      return this.remainingManaPercentage <= .3;
    }
  }
}
</script>

<style lang="scss" scoped>
.status-bar {
  margin: 5px;
  border: 3px solid #01091E;
  border-radius: 5px;
  padding: 3px;

  .health-bar {
    width: 100%;
    border: 1px solid white;
    height: 25px;

    .total-health {
      height: 23px;
      background-color: green;

      &.critical {
        background-color: red !important;
      }
    }
  }

  .mana-bar {
    margin-top: 2px;
    width: 100%;
    border: 1px solid white;
    height: 6px;

    .total-mana {
      width: 100%;
      height: 4px;
      background-color: violet;

      &.critical {
        background-color: orange !important;
      }
    }
  }

  .name-bar {
    text-align: center;
    font-size: 12px;
  }
}
</style>