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

    <div class="app-header">
      {{ headerText }}
    </div>

    <div class="app-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerText: {
      required: true
    } 
  }
}
</script>

<style lang="scss" scoped>
.app-base-layout {
  width: 800px;
  min-height: 555px;
  color: #E4E1CB;
  margin: auto;

  .app-links {
    button {
      font-family: AtariClassic;
    }

    .active-route {
      background-color: white;
      color: black;
      border-color: black;
    }
  }

  .app-header {
    height: 30px;
    text-align: center;
    font-family: Target3D;
    font-size: 24px;
  }

  .app-body {
    height: 450px;
  }
}
</style>