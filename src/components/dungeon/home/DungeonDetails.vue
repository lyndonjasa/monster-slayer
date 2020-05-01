<template>
  <div class="dungeon-details-container">
    <app-tile>
      <div class="dungeon-details" v-if="dungeon">
        <div class="header bold row center nomargin">
          <div class="col-sm-8 nopadding">
            {{ dungeon.name }}
          </div>
          <div class="col-sm-4 nopadding" v-if="!dungeon.locked">
            <button class="dungeon-enter btn-principal" @click="onDungeonEnter">Enter</button>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 bold">Recommended Level:</div>
          <div class="col-sm-6 center">{{ dungeon.recommendedLevel }}</div>
        </div>

        <template v-if="!dungeon.locked">
          <div class="row nomargin" v-if="encounters.length > 0">
            <div class="col-sm-12 bold nopadding">Encounters/Drops:</div>
            <div class="encounter-list col-sm-12 row nomargin nopadding" 
              v-for="enemy in encounters" :key="enemy._id">
              <div class="col-sm-3 offset-sm-1 nopadding bold">
                {{ enemy.name }}
              </div>
              <div class="col-sm-8 nopadding" v-if="enemy.drops.length > 0">
                <app-dungeon-item v-for="drop in enemy.drops" :key="drop._id" :item="drop">
                </app-dungeon-item>
              </div>
              <div class="col-sm-7 nopadding offset-sm-1" v-else>
                None
              </div>
            </div>
          </div>

          <div class="row nomargin" v-if="boss">
            <div class="col-sm-12 bold nopadding">Boss/Drops:</div>
            <div class="encounter-list col-sm-12 row nomargin nopadding">
              <div class="col-sm-3 offset-sm-1 nopadding bold">
                {{ boss.name }}
              </div>
              <div class="col-sm-8 nopadding" v-if="boss.drops.length > 0">
                <app-dungeon-item v-for="drop in boss.drops" :key="drop._id" :item="drop">
                </app-dungeon-item>
              </div>
              <div class="col-sm-7 offset-sm-1 nopadding" v-else>
                None
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="row nomargin">
            <div class="col-sm-12 bold nopadding">Requirements:</div>
            <div class="encounter-list col-sm-12 row nomargin nopadding">
              <div class="col-sm-11 offset-sm-1 nopadding requirement">
                Defeat <span class="bold">{{ dungeon.bossReq.name }}</span> from the previous dungeon.
              </div>
            </div>
          </div>
        </template>
      </div>
    </app-tile>
  </div>
</template>

<script>
import DungeonItem from "./DungeonItem";

export default {
  components: {
    appDungeonItem: DungeonItem
  },
  props: {
    dungeon: {
      required: true
    }
  },
  computed: {
    encounters: function() {
      return this.dungeon.enemies.filter(x => !x.boss);
    },
    boss: function() {
      return this.dungeon.enemies.find(x => x.boss);
    }
  },
  methods: {
    onDungeonEnter: function() {
      this.$emit("enter-dungeon", this.dungeon._id);
    }
  }
}
</script>

<style lang="scss" scoped>
.dungeon-details-container {
  height: 450px;

  .header {
    margin: 15px 0 !important;
    font-size: 25px;

    .dungeon-enter {
      font-size: 14px;
      position: absolute;
      font-family: AtariClassic;
      right: 5px;
      top: -2px;
    }
  }

  .dungeon-details {
    width: 350px;
    margin: auto;
    font-size: 14px;

    .encounter-list {
      margin-bottom: 15px !important;

      .requirement {
        font-size: 16px;
      }
    }
  }
}
</style>