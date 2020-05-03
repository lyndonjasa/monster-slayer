<template>
  <div class="item-details">
    <app-tile>
      <div class="details-header bold">
        {{ headerText }}
        <span class="delete-item" v-if="canRemove && item" @click="$emit('remove-item')"> (Delete)</span>
      </div>
      <div class="stat-details" v-if="item">
        <div class="item-name bold">
          <v-svg :icon="itemIcon" class="item-icon"></v-svg>
          {{ item.name }}
        </div>

        <div class="stat-bonus row nomargin">
          <div class="col-sm-6 row nomargin nopadding"
            v-for="key in Object.keys(bonusStats)" :key="key">
            <div class="col-sm-5 offset-sm-1 nopadding bold">{{ key.toUpperCase() }}</div>
            <div class="col-sm-5 nopadding right">{{ bonusStats[key] }}</div>
          </div>
        </div>
      </div>
    </app-tile>
  </div>
</template>

<script>
import { itemIcons } from "../../../shared/class-types";

export default {
  props: {
    headerText: {
      required: true
    },
    item: undefined,
    canRemove: { default: false }
  },
  computed: {
    itemIcon: function() {
      const icon = itemIcons.find(x => x.classId === this.item.classId &&
                          x.type === this.item.type);

      return icon.svg;
    },
    bonusStats: function() {
      const itemBonus = this.item.bonus;
      const keys = Object.keys(itemBonus);

      const bonus = {};
      keys.forEach(key => {
        bonus[key] = itemBonus[key];
      });

      return bonus;
    }
  }
}
</script>

<style lang="scss" scoped>
.item-details {
  height: 175px;

  .details-header {
    text-align: center;

    .delete-item {
      color: gray;
      cursor: pointer;
    }

    .delete-item:hover {
      color: white;
    }
  }

  .item-name {
    text-align: center;

    .item-icon {
      height: 24px;
      width: 24px;
    }
  }

  .stat-bonus {
    margin-top: 10px !important;
  }
}
</style>