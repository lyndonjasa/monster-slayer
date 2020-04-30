<template>
  <app-layout headerText="Inventory" prevRoute="/character">
    <app-loader v-if="showLoader" :loadingMessage="loadingMessage"></app-loader>

    <div class="character-inventory row nomargin">
      <div class="col-sm-8 nopadding">
        <app-tile>
          <div class="row nomargin item-tiles-container" v-if="inventory.length <= 16">
            <div v-for="item in inventory" :key="item._id" class="col-sm-6 tile">
              <app-item-tile :item="item" v-model="selectedItem"></app-item-tile>
            </div> 
          </div>
          <div class="row nomargin item-tiles-container" v-else v-slimscroll="slimScrollOptions">
            <div v-for="item in inventory" :key="item._id" class="col-sm-6 tile">
              <app-item-tile :item="item" v-model="selectedItem"></app-item-tile>
            </div> 
          </div>
        </app-tile>
      </div>
      <div class="col-sm-4 nopadding">
        <app-item-details headerText="Selected Item" :item="selected"></app-item-details>
        <app-item-details headerText="Current Equipment" :item="currentItem"></app-item-details>
        <div class="inventory-actions">
          <button class="btn-principal" 
            :disabled="disableEquipButton"
            @click="onEquip">Equip</button>
          <button class="btn-principal"
            :disabled="!hasChanges"
            @click="onSave">Save</button>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import { mapGetters } from "vuex";
import CharacterMixin from "../../mixins/CharacterMixin";
import ItemTile from "../../components/character/inventory/ItemTile";
import ItemDetails from "../../components/character/inventory/ItemDetails";
import _ from "lodash";

export default {
  components: {
    appItemTile: ItemTile,
    appItemDetails: ItemDetails
  },
  created: function() {
    this.showLoader = true;
    this.loadingMessage = "Loading Character";

    this.getCharacterById(this.characterId).then(res => {
      this.character = res;
      this.charCopy = _.cloneDeep(this.character);

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
      selectedItem: undefined,
      charCopy: undefined
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
    },
    disableEquipButton: function() {
      if (!this.selectedItem) return true;
      return this.selected.classId !== this.character.classType;
    },
    selected: function() {
      if (!this.selectedItem) return undefined;
      else return this.selectedItem.item;
    },
    currentItem: function() {
      if (!this.selectedItem) return undefined;
      else {
        const type = this.selectedItem.item.type;
        if (type === "WPN") {
          return this.character.equipment.weapon;
        } else {
          return this.character.equipment.armor;
        }
      }
    },
    hasChanges: function() {
      return !_.isEqual(this.character, this.charCopy);
    }
  },
  methods: {
    onEquip: function() {
      const type = this.selected.type;
      if (type === "WPN") {
        this.character.equipment.weapon = this.selected;
      } else {
        this.character.equipment.armor = this.selected;
      }
    },
    onSave: function() {
      const request = {
        weaponId: this.character.equipment.weapon._id,
        armorId: this.character.equipment.armor._id,
      }

      this.loadingMessage = "Uploading Equipment";
      this.showLoader = true;
      this.updateEquipment(this.characterId, request).then(() => {
        this.showLoader = false;
        this.charCopy = _.cloneDeep(this.character);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.character-inventory {
  height: 100%;

  .item-tiles-container {
    max-height: 448px;

    .tile {
      height: 50px;
    }
  }

  .inventory-actions {
    margin-top: 10px;
    font-family: AtariClassic;
    text-align: center;

    button {
      width: 200px; 
    }
  }
}
</style>