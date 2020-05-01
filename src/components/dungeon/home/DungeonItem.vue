<template>
  <div class="dungeon-item">
    <v-svg :icon="itemIcon"></v-svg> {{item.name}} &nbsp;
  </div>
</template>

<script>
import { itemIcons } from "../../../shared/class-types";

export default {
  props: ["item"],
  computed: {
    itemIcon: function() {
      const icon = itemIcons.find(x => x.classId == this.item.classId &&
                    x.type == this.item.type);

      return icon.svg;
    }
  }
}
</script>

<style lang="scss" scoped>
.dungeon-item {
  float: left;
}
</style>