<template>
  <div class="loading-screen-overlay">
    <div class="loading-screen">
      <div class="animated-images" v-if="inanimate">
        <img src="../../assets/images/classes/saber.png" />
        <img src="../../assets/images/classes/archer.png" />
        <img src="../../assets/images/classes/lancer.png" />
        <img src="../../assets/images/classes/berserker.png" />
        <img src="../../assets/images/classes/caster.png" />
      </div>

      <div class="animated-images" v-else>
        <img src="../../assets/images/classes/saber-blink.png" />
        <img src="../../assets/images/classes/archer-blink.png" />
        <img src="../../assets/images/classes/lancer-blink.png" />
        <img src="../../assets/images/classes/berserker-blink.png" />
        <img src="../../assets/images/classes/caster-blink.png" />
      </div>

      <div class="loading-message" v-if="inanimate">
        {{ loadingMessage }} . . .
      </div>

      <div class="loading-message" v-else>
        {{ loadingMessage }} &nbsp; &nbsp; &nbsp;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loadingMessage: {
      type: String,
      default: "Now Loading"
    }
  },
  data: function() {
    return {
      inanimate: true
    };
  },
  mounted: function() {
    var vm = this;
    setInterval(() => {
      vm.inanimate = !vm.inanimate
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
.loading-screen-overlay {
  position: fixed;
  display: block; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 5; /* Specify a stack order in case you're using a different order for other elements */
  overflow: auto;
  color: #E4E1CB;

  .loading-screen {
    width: 700px;
    margin: auto;
    text-align: center;
    font-family: AtariClassic;
    background-color: #00386d;
    padding: 15px 0;
    margin-top: calc(calc(100vh - 223px) / 2);

    img {
      width: 100px;
      margin: 0 10px;
    }

    .loading-message {
      margin-top: 15px;
      font-size: 25px;
    }
  }
}
</style>