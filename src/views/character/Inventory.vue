<template>
  <app-layout headerText="Inventory">
    <app-loader v-if="showLoader" :loadingMessage="loadingMessage"></app-loader>

    <div class="character-inventory row nomargin">
      <div class="col-sm-8 nopadding">
        <app-tile>
          <div class="row nomargin item-tiles-container" v-slimscroll="slimScrollOptions">
            <div v-for="item in inventory" :key="item._id" class="col-sm-6">
              <app-item-tile :item="item" v-model="selectedItem"></app-item-tile>
            </div>
          </div>
        </app-tile>
      </div>
      <div class="col-sm-4 nopadding">
        <app-tile>
          Item Details here
        </app-tile>
      </div>
    </div>
  </app-layout>
</template>

<script>
import { mapGetters } from "vuex";
import CharacterMixin from "../../mixins/CharacterMixin";
import ItemTile from "../../components/character/inventory/ItemTile";

export default {
  components: {
    appItemTile: ItemTile
  },
  created: function() {
    this.showLoader = true;
    this.loadingMessage = "Loading Character";

    this.getCharacterById(this.characterId).then(res => {
      this.character = res;

      this.loadingMessage = "Loading Inventory";
      this.getInventory(this.characterId).then(res => {
        this.inventory = res;
        this.showLoader = false;
      });
    });
  },
  mixins: [CharacterMixin],
  data: function() {
    return {
      showLoader: false,
      character: undefined,
      loadingMessage: "",
      inventory: [],
      selectedItem: undefined
    };
  },
  computed: {
    ...mapGetters({
      characterId: 'character'
    }),
    slimScrollOptions: function() {
      return {
        height: "448px",
        color: "#E4E1CB"
      };
    }
  },
  watch: {
    selectedItem: function(value) {
      console.log(value.item.name);
    }
  }
}
</script>

<style lang="scss" scoped>
.character-inventory {
  height: 100%;

  .item-tiles-container {
    height: 448px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>