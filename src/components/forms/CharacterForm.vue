<template>
  <div class="character-form row nomargin">
    <div class="col-sm-6 nopadding">
      <div class="header">Character</div>

      <div class="row nomargin">
        <div class="col-sm-4 nopadding">Name/Alias:</div>
        <div class="col-sm-6 nopadding">
          <input type="text" class="input-principal" v-model="characterName"/>
        </div>
      </div>

      <div class="row nomargin">
        <div class="col-sm-4 nopadding">Class:</div>
        <div class="col-sm-6 nopadding">
          <select class="select-principal" v-model="selectedType">
            <option disabled selected value="0"> Select a Class </option>
            <option v-for="type in classTypes" :key="type.id" :value="type.id">
              {{ type.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="character-image-container" v-if="selectedType !== 0">
        <img :src="selectedClass.image" />
      </div>
    </div>
    <div class="col-sm-6 nopadding" v-if="selectedType !== 0">
      <div class="header">Details</div>

      <div class="selected-class-details">
        {{ selectedClass.details }}
      </div>

      <br />

      <div class="selected-class-weapon">
        Weapons: {{ selectedClass.weapons }}
      </div>

      <br />

      <div class="selected-class-attributes">
        <span>Attribute Rank</span>

        <div class="row nomargin attributes" v-for="key in Object.keys(selectedClass.stats)" :key="key">
          <div class="col-sm-6 nopadding">{{ key.toUpperCase() }}</div>
          <div class="col-sm-6 nopadding" :style="{ color: setColorStyle(selectedClass.stats[key]) }">
            {{ selectedClass.stats[key] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { classTypes } from "../../shared/class-types";

export default {
  data: function() {
    return {
      classTypes,
      selectedType: 1,
      characterName: ""
    };
  },
  computed: {
    selectedClass: function() {
      const classType = classTypes.find(x => x.id === this.selectedType);
      
      return classType;
    }
  },
  methods: {
    setColorStyle: function(value) {
      switch (value) {
        case "S":
          return "red";
        case "A":
          return "violet";
        case "B":
          return "orange";
        case "C":
          return "lightblue";
        case "D":
          return "green";
        default:
          return "white";
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.character-form {
  width: 700px;
  margin: auto !important;

  .header {
    text-align: center;
  }

  .row {
    &.nomargin {
      margin-bottom: 10px !important;
    }
  }

  .character-image-container {
    width: 300px;
    margin: auto;
    text-align: center;
    margin-top: 35px;

    img {
      height: 150px;
    }
  } 

  .selected-class-attributes {
    width: 100%;
    margin: auto;
    text-align: center;

    .attributes {
      font-weight: bold;
    }
  }
}
</style>