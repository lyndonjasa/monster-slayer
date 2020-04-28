<template>
  <div class="character-stats-container">
    <div class="character-stats row nomargin">
      <div class="col-sm-3 nopadding">
        Character Image Here
      </div>
      <div class="col-sm-9">
        <div class="center">Character Stats</div>
        <div class="detailed-stats row nomargin center">
          <div class="col-sm-3 bold">Attrib</div>
          <div class="col-sm-3 bold">Base</div>
          <div class="col-sm-3 bold">Bonus</div>
          <div class="col-sm-3 bold">Total</div>
        </div>

        <div class="detailed-stats row nomargin" v-for="key in statKeys" :key="key">
          <div class="col-sm-3 bold">{{ key.toUpperCase() }}</div>
          <div class="col-sm-3 center">{{ character.stats[key] }}</div>
          <div class="col-sm-3 center">{{ bonusStats[key] }}</div>
          <div class="col-sm-3 center">{{ totalStats[key] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    character: {
      required: true
    }
  },
  computed: {
    bonusStats: function() {
      const weapon = this.character.equipment.weapon.bonus;
      const armor = this.character.equipment.armor.bonus;

      const bonus = {};
      this.statKeys.forEach(key => {
        bonus[key] = weapon[key] + armor[key];
      });
      
      return bonus;
    },
    statKeys: function() {
      return Object.keys(this.character.stats);
    },
    totalStats: function() {
      const stats = this.character.stats;

      const totalStats = {};
      this.statKeys.forEach(key => {
        totalStats[key] = stats[key] + this.bonusStats[key];
      });

      return totalStats;
    }
  }
}
</script>

<style lang="scss" scoped>
.character-stats-container {
  height: 100%;
  border: 2px solid white;
  margin: 3px;
  border-radius: 8px;
  padding: 2px;
  font-size: 14px;
}
</style>