<template>
  <div class="action-pane">
    <button class="action-btn btn-principal" @click="onAttack">Attack</button>
    <button class="action-btn btn-principal" @click="onFocus">Focus</button>
    <button v-for="skill in skills" 
      :key="skill.name"
      class="action-btn btn-principal"
      @click="onSkill(skill)">
      {{ skill.name }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["skills"],
  methods: {
    onAttack: function() {
      this.$emit("attack");
    },
    onFocus: function() {
      this.$emit("focus");
    },
    onSkill: function(skill) {
      this.$emit('ability-use', skill);
    }
  }
}
</script>

<style lang="scss" scoped>
.action-btn {
  margin: 5px;
  font-size: 12px;
  font-family: AtariClassic;
}
</style>