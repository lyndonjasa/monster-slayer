<template>
  <div class="character-stats-container">
    <div class="character-stats row nomargin">
      <div class="col-sm-3 nopadding center">
        <img class="character-image" :src="characterImage" />
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

    <div class="character-arsenal row nomargin">
      <div class="col-sm-6 nopadding">
        <div class="center bold">Equipment</div>
        <div class="row nomargin">
          <div class="col-sm-10 offset-sm-2 bold">Weapon</div>
          <div class="col-sm-8 offset-sm-4">{{ weapon.name }}</div>

          <div class="col-sm-10 offset-sm-2 bold">Armor</div>
          <div class="col-sm-8 offset-sm-4">{{ armor.name }}</div>
        </div>
      </div>

      <div class="col-sm-6 nopadding">
        <div class="center bold">Skills</div>
        <div class="row nomargin" v-for="skill in character.skills" :key="skill._id">
          <div class="col-sm-8 offset-sm-2">{{ skill.name }}</div>
          <div class="col-sm-2 bold">({{ skill.type }})</div>
        </div>
      </div>
    </div>

    <div class="character-stats-actions">
      <router-link
        to="/character/inventory"
        v-slot="{ href, route, navigate }"
      >
        <button 
          :href="href" @click="navigate" class="btn-principal">
          Inventory
        </button>
      </router-link>

      <router-link
        to="/character/skills"
        v-slot="{ href, route, navigate }"
      >
        <button 
          :href="href" @click="navigate" class="btn-principal">
          Skills
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { classTypes } from "../../shared/class-types";

export default {
  props: {
    character: {
      required: true
    }
  },
  computed: {
    bonusStats: function() {
      const weapon = this.weapon.bonus;
      const armor = this.armor.bonus;

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
    },
    characterImage: function() {
      const classType = classTypes.find(x => x.id == this.character.classType);

      return classType.image;
    },
    weapon: function() {
      return this.character.equipment.weapon;
    },
    armor: function() {
      return this.character.equipment.armor;
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

  .character-stats {
    margin-top: 25px !important;

    .character-image {
      max-width: 90%;
    }
  }

  .character-arsenal {
    margin-top: 25px !important;
    height: 150px;
  }

  .character-stats-actions {
    text-align: right;
    font-family: AtariClassic;
    padding-right: 20px;
  }
}
</style>