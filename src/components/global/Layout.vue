<template>
  <div class="app-base-layout">
    <div class="app-links">
      <router-link
        to="/character"
        v-slot="{ href, route, navigate, isActive }"
      >
        <button 
          :href="href" @click="navigate" class="btn-principal"
          :class="{ 'active-route': isActive }">
          Character
        </button>
      </router-link>

      <router-link
        to="/dungeons"
        v-slot="{ href, route, navigate, isActive }"
      >
        <button
          :href="href" @click="navigate" class="btn-principal"
          :class="{ 'active-route': isActive }">
          Dungeons
        </button>
      </router-link>
    </div>

    <div class="app-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.app-base-layout {
  width: 800px;
  min-height: 555px;
  color: #E4E1CB;
  background-image: url("../../assets/images/main_bg.png");
  margin: auto;

  button {
    font-family: AtariClassic;
  }

  .active-route {
    background-color: white;
    color: black;
    border-color: black;
  }
}
</style>