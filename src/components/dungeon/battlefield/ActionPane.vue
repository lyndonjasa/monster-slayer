<template>
  <div class="action-pane-container dark-bg">
    <app-tile>
      <div class="actions row nomargin">
        <div class="col-sm-6 nopadding">
          <button class="btn-principal" @click="$emit('attack')">Attack</button>
        </div>
        <div class="col-sm-6 nopadding">
          <button class="btn-principal" @click="$emit('focus')">Focus</button>
        </div>
        <div class="col-sm-12 row nomargin nopadding" v-for="skill in skills" :key="skill._id">
          <div class="col-sm-10 nopadding">
            <button class="btn-principal" 
              :disabled="disableSkill(skill.cost)"
              @click="activateSkill(skill)">
              {{ skill.name }}
            </button>
          </div>
          <div class="col-sm-2 nopadding skill-cost">
            {{ skill.cost }}
          </div>
        </div>
      </div>
    </app-tile>
  </div>
</template>

<script>
export default {
  props: {
    skills: { required: true },
    mana: { required: true }
  },
  methods: {
    activateSkill: function(skill) {
      this.$emit("activate-skill", skill);
    },
    disableSkill: function(cost) {
      return cost > this.mana;
    }
  }
}
</script>

<style lang="scss" scoped>
.action-pane-container {
  position: absolute;
  min-width: 230px;
  max-width: 350px;
  right: calc(50vw + 220px);
  top: 250px;
  border-radius: 8px;

  .actions {
    font-family: AtariClassic;
    font-size: 12px;

    .skill-cost {
      padding-top: 15px !important;
    }
  }
}
</style>