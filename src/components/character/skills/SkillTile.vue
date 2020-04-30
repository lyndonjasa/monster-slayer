<template>
  <div class="skill-tile row nomargin" @click="onSkillClick">
    <div class="col-sm-2">
      <v-svg class="skill-type-icon" :icon="typeIcon"></v-svg>
    </div>
    <div class="col-sm-8">
      {{ skill.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    skill: {
      required: true
    },
    value: undefined
  },
  computed: {
    typeIcon: function() {
      if (this.skill.type === "P") return "PHYSICAL";
      else return "MAGICAL";
    }
  },
  methods: {
    onSkillClick: function() {
      this.$emit("input", this.skill);
    }
  }
}
</script>

<style lang="scss" scoped>
.skill-tile {
  padding: 10px 0;
  margin-top: 3px !important;
  border: 1px solid transparent;

  .skill-type-icon {
    width: 25px;
    height: 25px;
  }
}

.skill-tile:hover {
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
}

.skill-tile:active {
  border: 1px solid white;
}
</style>