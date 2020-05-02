<template>
  <div class="battle-outcome-overlay">
    <div class="battle-outcome-pane dark-bg" v-if="outcome">
      <div class="pane-header">Battle Results</div>
      <div class="lvlup-message" v-if="outcome.lvlUp">
        {{ notification }}
      </div>
      <div class="outcome-details row nomargin">
        <div class="col-sm-6 right">Exp Gained:</div>
        <div class="col-sm-6 left">{{ outcome.exp }}</div>
        <div class="col-sm-6 right">Item Drop:</div>
        <div class="col-sm-6 left">{{ outcome.drop ? outcome.drop : 'None' }}</div>

        <template v-if="outcome.newSkills.length > 0">
          <div class="col-sm-6 right">Skills Learned:</div>
          <div class="col-sm-6 left row nomargin">
            <div class="col-sm-12 nopadding" v-for="skill in outcome.newSkills" :key="skill">
              {{ skill }}
            </div>
          </div>
        </template>

        <template v-if="outcome.unlockedDungeons.length > 0">
          <div class="col-sm-6 right">Dungeons Unlocked:</div>
          <div class="col-sm-6 left row nomargin">
            <div class="col-sm-12 nopadding" v-for="dungeon in outcome.unlockedDungeons" :key="dungeon">
              {{ dungeon }}
            </div>
          </div>
        </template>
      </div>

      <div class="outcome-actions center">
        <button class="btn-principal" @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import TypewriterMixin from "../../../mixins/TypewriterMixin";

export default {
  props: {
    outcome: { required: true }
  },
  mixins: [TypewriterMixin],
  mounted: function() {
    this.writeNotification("LEVEL UP !!!", 100);
  }
}
</script>

<style lang="scss" scoped>
.battle-outcome-overlay {
  position: fixed;
  display: block; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 9; /* Specify a stack order in case you're using a different order for other elements */
  overflow: auto;

  .battle-outcome-pane {
    padding: 15px;
    width: 400px;
    z-index: 10;
    margin: auto;
    text-align: center;
    margin-top: 150px;
    font-family: AtariClassic;
    color: white;

    .pane-header {
      font-size: 20px;
    }

    .lvlup-message {
      font-size: 18px;
      margin-top: 5px;
    }

    .outcome-details {
      font-size: 16px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin-top: 10px !important;
    }

    .outcome-actions {
      margin-top: 10px;
    }
  }
}
</style>