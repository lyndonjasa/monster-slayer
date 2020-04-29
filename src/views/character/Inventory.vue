<template>
  <app-layout headerText="Inventory">
    <app-loader v-if="showLoader" :loadingMessage="loadingMessage"></app-loader>

    <div class="character-inventory row nomargin">
      <div class="col-sm-8 nopadding">
        <app-tile>
          Item Tiles here
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

export default {
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
      inventory: []
    };
  },
  computed: {
    ...mapGetters({
      characterId: 'character'
    })
  }
}
</script>

<style lang="scss" scoped>
.character-inventory {
  height: 100%;
}
</style>