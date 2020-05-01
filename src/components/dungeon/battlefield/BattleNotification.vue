<template>
  <div class="battle-notification dark-bg">
    <app-tile>
      <div class="message">
        {{ notification }}
      </div>
    </app-tile>
  </div>
</template>

<script>
import TypewriterMixin from "../../../mixins/TypewriterMixin";

export default {
  props: ["message"],
  mixins: [TypewriterMixin],
  watch: {
    message: function(value) {
      this.writeNotification(value);
    }
  }
}
</script>

<style lang="scss" scoped>
.battle-notification {
  height: 120px;
  color: white;
  font-family: AtariClassic;
  font-size: 18px;

  .message {
    margin: 10px;
  }
}
</style>