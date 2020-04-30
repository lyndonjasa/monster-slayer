<template>
  <div class="skill-details">
    <app-tile>
      <div class="details-header center bold">
        Skill Details
      </div>

      <div class="skill-stats" v-if="skill">
        <div class="skill-name center bold">
          {{ skill.name }}
        </div>

        <div class="row stat-details">
          <div class="col-sm-6 row nomargin">
            <div class="col-sm-6 nopadding bold">Level</div>
            <div class="col-sm-6 nopadding right">{{ skillDetails.level }}</div>
          </div>

          <div class="col-sm-6 row nomargin">
            <div class="col-sm-6 nopadding bold">Target</div>
            <div class="col-sm-6 nopadding right">{{ skillDetails.target }}</div>
          </div>

          <div class="col-sm-12 row nomargin">
            <div class="col-sm-3 nopadding bold">Type</div>
            <div class="col-sm-8 offset-sm-1 nopadding left">{{ skillDetails.type }}</div>
          </div>

          <div class="col-sm-12 row nomargin">
            <div class="col-sm-3 nopadding bold">Cost</div>
            <div class="col-sm-8 offset-sm-1 nopadding left">{{ skillDetails.cost }}</div>
          </div>
          
          <div class="col-sm-12 row nomargin" v-if="skill.damage > 0">
            <div class="col-sm-3 nopadding bold">Damage</div>
            <div class="col-sm-8 offset-sm-1 nopadding left">{{ skillDetails.damage }} {{ damageBasis }}</div>
          </div>

          <div class="col-sm-12 row nomargin" v-else>
            <div class="col-sm-3 nopadding bold">Heal</div>
            <div class="col-sm-8 offset-sm-1 nopadding left">{{ skillDetails.damage }} {{ damageBasis }}</div>
          </div>
        </div>
      </div>
    </app-tile>
  </div>
</template>

<script>
export default {
  props: {
    skill: {
      required: true
    }
  },
  computed: {
    skillDetails: function() {
      const skill = {
        level: this.skill.lvlReq,
        damage: Math.abs(this.skill.damage) + "%",
        target: this.skill.target,
        cost: this.skill.cost + " mana",
        type: this.skill.type === "P" ? "Physical" : "Magical"
      };

      return skill;
    },
    damageBasis: function() {
      return this.skill.type === "P" ? "Offense" : "Intelligence";
    }
  }
}
</script>

<style lang="scss" scoped>
.skill-details {
  height: 175px;

  .stat-details {
    padding: 3px;
  }
}
</style>