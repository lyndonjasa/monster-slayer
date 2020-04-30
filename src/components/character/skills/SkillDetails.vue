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
          <div class="col-sm-12 row nomargin" v-for="(key,index) in Object.keys(skillDetails)" :key="index">
            <div class="col-sm-3 nopadding bold">{{ key.toUpperCase() }}</div>
            <div class="col-sm-8 offset-sm-1 nopadding left">{{ skillDetails[key] }}</div>
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
        target: this.skill.target,
        type: this.skill.type === "P" ? "Physical" : "Magical",
        cost: this.skill.cost + " mana",
        damage: this.skill.damage + "% " + this.damageBasis,
        heal: Math.abs(this.skill.damage) + "% " + this.damageBasis
      };

      if (this.skill.damage < 0) {
        delete skill.damage;
      } else {
        delete skill.heal;
      }

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
  height: 200px;

  .stat-details {
    padding: 10px;
  }
}
</style>