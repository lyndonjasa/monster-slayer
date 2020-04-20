<template>
  <div class="character-form row nomargin">
    <div class="col-sm-6 nopadding">
      <div class="header">Character</div>

      <form>
        <div class="character-creation">
          <div class="row nomargin">
            <div class="col-sm-4 nopadding">Name/Alias:</div>
            <div class="col-sm-6 nopadding">
              <input type="text" class="input-principal" v-model.lazy="characterName" @blur="$v.characterName.$touch()"/>
            </div>

            <div class="col-sm-6 offset-sm-4 nopadding">
              <p v-if="!$v.characterName.required && $v.characterName.$dirty">Character Name is required</p>
              <p v-if="!$v.characterName.minLength && $v.characterName.$dirty">Name must be at least 6 characters</p>
              <p v-if="!$v.characterName.maxLength && $v.characterName.$dirty">Name must be at most 20 characters</p>
            </div>
          </div>

          <div class="row nomargin">
            <div class="col-sm-4 nopadding">Class:</div>
            <div class="col-sm-6 nopadding">
              <select class="select-principal" v-model="selectedType" @blur="$v.selectedType.$touch()">
                <option disabled selected value="0"> Select a Class </option>
                <option v-for="type in classTypes" :key="type.id" :value="type.id">
                  {{ type.name }}
                </option>
              </select>
            </div>

            <div class="col-sm-6 offset-sm-4 nopadding">
              <p v-if="!$v.selectedType.between && $v.selectedType.$dirty">Class is required</p>
            </div>
          </div>

          <button @click.prevent="onFormSubmit" v-show="false">Submit</button>
        </div>
      </form>

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
import { required, maxLength, minLength, between } from "vuelidate/lib/validators";
import { bus } from "../../shared/event-bus";

export default {
  props: ["value"],
  mounted: function() {
    bus.$on("on-character-creation", () => {
      this.onFormSubmit();
    });
  },
  data: function() {
    return {
      classTypes,
      selectedType: this.value.classType,
      characterName: this.value.name
    };
  },
  validations: {
    selectedType: { between: between(1, 5) },
    characterName: { required, minLength: minLength(6), maxLength: maxLength(20) }
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
    },
    onFormSubmit: function() {
      this.$v.$touch();

      if (!this.$v.$error) {
        const formData = {
          name: this.characterName,
          classType: this.selectedType
        };

        this.$emit("input", formData);
        this.$emit("character-submitted");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.character-form {
  width: 700px;
  margin: auto !important;

  .character-creation {
    height: 115px;
  }

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

  p {
    font-size: 10px;
    margin-top: 0px;
    margin-bottom: 0px;
    text-indent: 3px;
  }
}
</style>