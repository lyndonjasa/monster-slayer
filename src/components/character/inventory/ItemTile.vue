<template>
  <div class="item-tile row nomargin" @click="onItemClick">
    <div class="col-sm-2 nopadding right">
      <v-svg :icon="itemIcon" class="item-icon"></v-svg>
    </div>
    <div class="col-sm-9 offset-sm-1 nopadding">
      {{ item.item.name }}
    </div>
  </div>
</template>

<script>
import { classTypes } from "../../../shared/class-types";

export default {
  props: {
    item: {
      required: true
    },
    value: undefined
  },
  computed: {
    itemIcon: function() {
      const className = classTypes.find(x => x.id == this.item.item.classId).name.toUpperCase();

      return `${className}-${this.item.item.type}`;
    }
  },
  methods: {
    onItemClick: function() {
      this.$emit("input", this.item);
    }
  }
}
</script>

<style lang="scss" scoped>
.item-tile {
  padding: 10px 0;
  margin-top: 3px !important;
  border: 1px solid transparent;

  .item-icon {
    width: 25px;
    height: 25px;
  }
}

.item-tile:hover {
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
}

.item-tile:active {
  border: 1px solid white;
}
</style>