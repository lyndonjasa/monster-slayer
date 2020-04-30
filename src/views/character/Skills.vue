<template>
  <app-layout headerText="Skills" prevRoute="/character">
    <app-loader v-if="showLoader" :loadingMessage="loadingMessage"></app-loader>
    <div class="character-skills row nomargin">
      <div class="col-sm-8 nopadding">
        <app-tile>
          <div class="skill-tiles-container row nomargin">
            <div v-for="skill in skills" :key="skill._id" class="col-sm-6 tile">
              <app-skill-tile v-model="selectedSkill" :skill="skill"></app-skill-tile>
            </div>
          </div>
        </app-tile>
      </div>
      <div class="col-sm-4 nopadding">
        <app-skill-details :skill="selectedSkill"></app-skill-details>
        <app-skill-list 
          :skills="character.skills" 
          v-if="character"
          @remove-skill="onRemove($event)"></app-skill-list>
        <div class="skill-actions">
          <v-icon icon="exclamation-triangle" 
            v-if="disableEquipButton"
            class="action-warning"></v-icon>
          <div class="warning-message dark-bg">{{ warningMessage }}</div>
          <button class="btn-principal" 
            :disabled="disableEquipButton"
            @click="onEquip">Equip</button>
          <button class="btn-principal"
            :disabled="!hasChanges"
            @click="onSave">Save</button>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import CharacterMixin from "../../mixins/CharacterMixin";
import { mapGetters } from "vuex";
import SkillTile from "../../components/character/skills/SkillTile";
import SkillList from "../../components/character/skills/SkillList";
import SkillDetails from "../../components/character/skills/SkillDetails";
import _ from "lodash";

export default {
  components: {
    appSkillTile: SkillTile,
    appSkillList: SkillList,
    appSkillDetails: SkillDetails
  },
  created: function() {
    this.loadingMessage = "Loading Character";
    this.showLoader = true;

    this.getCharacterById(this.characterId).then(res => {
      this.character = res;
      this.loadingMessage = "Loading Skills"
      this.charCopy = _.cloneDeep(this.character);

      this.getCharacterSkills(this.characterId).then(res => {
        this.showLoader = false;
        this.skills = res;
      });
    });
  },
  mixins: [CharacterMixin],
  computed: {
    ...mapGetters({
      characterId: "character"
    }),
    hasChanges: function() {
      return !_.isEqual(this.character, this.charCopy);
    },
    disableEquipButton: function() {
      if (!this.selectedSkill) return true;

      const id = this.selectedSkill._id;
      const skill = this.character.skills.find(x => x._id === id);
      if (skill) {
        return true;
      } else {
        return false;
      }
    },
    warningMessage: function() {
      if (!this.selectedSkill) return "Select a skill to equip";
      else return "Skill is already equipped"; 
    }
  },
  data: function() {
    return {
      character: undefined,
      selectedSkill: undefined,
      skills: [],
      showLoader: false,
      loadingMessage: "",
      charCopy: undefined
    };
  },
  methods: {
    onEquip: function() {
      this.character.skills.push(this.selectedSkill);
    },
    onSave: function() {

    },
    onRemove: function(skillId) {
      this.character.skills = this.character.skills.filter(x => x._id !== skillId);
    }
  }
}
</script>

<style lang="scss" scoped>
.character-skills {
  min-height: 448px;

  .skill-tiles-container {

    .tile {
      height: 50px;
    }
  }

  .skill-actions {
    margin-top: 10px;
    font-family: AtariClassic;
    text-align: center;

    .action-warning {
      position: absolute;
      left: 8px;
      bottom: 70px;
    }

    .warning-message {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      position: absolute;
      z-index: 5;
      border: 1px solid white;
      border-radius: 5px;
      padding: 5px;
      left: 35px;
      display: none;
    }

    .action-warning:hover + .warning-message {
      display: block;
    }

    button {
      width: 200px; 
    }
  }
}
</style>