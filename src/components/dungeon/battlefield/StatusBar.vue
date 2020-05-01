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
    <div class="name-bar row nomargin">
      <div class="col-sm-2 nopadding right-border transparent-border"></div>
      <div class="col-sm-8 nopadding dark-bg">Lvl {{ level }}. {{ name }}</div>
      <div class="col-sm-2 nopadding left-border transparent-border"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['remainingHealthPercentage', 'remainingManaPercentage', 'name', 'level'],
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
    margin-top: 2px !important;
    color: white;

    .right-border {
      border-right: 12px solid black;
    }

    .left-border {
      border-left: 12px solid darkblue;
    }

    .transparent-border {
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
  }
}
</style>