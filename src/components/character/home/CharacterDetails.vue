<template>
  <div class="character-details-container">
    <div class="character-name">
      {{ character.name }}
    </div>

    <div class="row nomargin character-details">
      <div class="col-sm-3 offset-sm-1 nopadding bold">Level</div>
      <div class="col-sm-6 offset-sm-2 nopadding">{{ character.level}}</div>

      <div class="col-sm-12 row-break"></div>

      <div class="col-sm-3 offset-sm-1 nopadding bold">Class</div>
      <div class="col-sm-6 offset-sm-2 nopadding">{{ className }}</div>

      <div class="col-sm-12 row-break"></div>

      <div class="col-sm-3 offset-sm-1 nopadding bold">Total Exp</div>
      <div class="col-sm-6 offset-sm-2 nopadding">{{ character.totalExp }}</div>

      <div class="col-sm-12 row-break"></div>

      <div class="col-sm-3 offset-sm-1 nopadding bold">Next Lvl</div>
      <div class="col-sm-6 offset-sm-2 nopadding">{{ character.nextLevelExp }}</div>

      <div class="col-sm-12 row-break"></div>

      <div class="col-sm-3 offset-sm-1 nopadding bold">Char Id</div>
      <div class="col-sm-8"></div>
      <div class="col-sm-10 offset-sm-2 nopadding">{{ character._id }}</div>

      <div class="col-sm-12 row-break"></div>
      
      <div class="col-sm-6 offset-sm-1 nopadding bold">Dungeon Access</div>
      <div class="col-sm-5 nopadding"></div>
      <div class="col-sm-10 offset-sm-2 nopadding" 
        v-for="dungeon in character.dungeonAccess"
        :key="dungeon._id">
        {{ dungeon.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { classTypes } from "../../../shared/class-types";

export default {
  props: {
    character: {
      required: true
    }
  },
  computed: {
    className: function() {
      const classType = classTypes.find(x => x.id == this.character.classType);

      return classType.name;
    }
  }
}
</script>

<style lang="scss" scoped>
.character-details-container {
  height: 100%;
  border: 2px solid white;
  margin: 3px;
  border-radius: 8px;
  padding: 2px;
  font-size: 14px;

  .character-name {
    text-align: center;
    font-size: 18px;
  }

  .character-details {
    .row-break {
      margin: 3px 0;
    }
  }
}
</style>