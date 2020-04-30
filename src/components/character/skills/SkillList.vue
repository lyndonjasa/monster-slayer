<template>
  <div class="skill-list">
    <app-tile>
      <div class="center bold">Current Skills</div>
      <div class="current-skill-list row" v-for="(i, index) in 4" :key="i">
        <template v-if="skills[index]">
          <div class="col-sm-2 nopadding right">
            <v-svg :icon="getTypeIcon(skills[index].type)"></v-svg>
          </div>
          <div class="col-sm-6 offset-sm-1 nopadding">
            {{ skills[index].name }}
          </div>
          <div class="col-sm-2 right">
            <v-icon v-if="skills.length > 1" icon="times" 
              class="skill-list-action" @click="onSkillRemoval(skills[index]._id)">
            </v-icon>
          </div>
        </template>
        <template v-else>
          <div class="col-sm-2 nopadding right">
            ---
          </div>
          <div class="col-sm-6 offset-sm-1 nopadding">
            ----------------------
          </div>
        </template>
      </div>
    </app-tile>
  </div>
</template>

<script>
export default {
  props: {
    skills: {
      required: true,
      type: Array
    }
  },
  methods: {
    getTypeIcon: function(type) {
      if (type === "P") {
        return "PHYSICAL";
      } else {
        return "MAGICAL";
      }
    },
    onSkillRemoval: function(id) {
      this.$emit("remove-skill", id);
    }
  }
}
</script>

<style lang="scss" scoped>
.skill-list {
  height: 150px;

  .center.bold {
    margin-bottom: 10px;
  }

  .skill-list-action {
    color: gray;
    cursor: pointer;
  }

  .skill-list-action:hover {
    color: #E4E1CB;
  }
}
</style>