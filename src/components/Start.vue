<template>
  <div class="title-screen-overlay">
    <div class="title-screen">
      <div class="title">
        <div style="margin-left: 85px;"><span>Monster</span></div>
        <div style="margin-left: 245px;margin-top: -30px;"><span>Slayer</span></div>
      </div>
      <div class="action">
        <button class="btn-principal" @click="$emit('start')">Click Here to Start!</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title-screen-overlay {
  position: fixed;
  display: block; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  overflow: auto;
}

.title-screen {
  margin: auto;
  width: 600px;
  height: 337px;
  background-image: url("../assets/images/title-screen-bg.jpg");
  background-size: contain;
  overflow: auto;
  margin-top: calc(calc(100vh - 337px) / 2);

  span {
    font-family: Target3D;
    font-size: 50px;
    color: white;
    font-weight: bold;
  }

  .title {
    margin-top: 25px;
  }

  .action {
    text-align: center;
    margin-top: 25px;
    font-family: AtariClassic;
  }
}
</style>