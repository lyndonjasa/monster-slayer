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
        <app-skill-list></app-skill-list>
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
    })
  },
  data: function() {
    return {
      character: undefined,
      selectedSkill: undefined,
      skills: [],
      showLoader: false,
      loadingMessage: ""
    };
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
}
</style>