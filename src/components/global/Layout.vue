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

    <div class="app-header row nomargin">
      <div class="col-sm-2 left">
        <v-icon class="header-router" 
          v-if="prevRoute" 
          icon="angle-double-left"
          @click="reRoute(prevRoute)">
        </v-icon>
      </div>
      <div class="col-sm-8">{{ headerText }}</div>
      <div class="col-sm-2">
        <v-icon class="header-router" 
          v-if="nextRoute" 
          icon="angle-double-right"
          @click="reRoute(nextRoute)">
        </v-icon>
      </div>
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
    },
    prevRoute: {
      default: undefined
    },
    nextRoute: {
      default: undefined
    }
  },
  methods: {
    reRoute: function(route) {
      this.$router.push(route);
    }
  }
}
</script>

<style lang="scss" scoped>
.app-base-layout {
  width: 800px;
  min-height: 610px;
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

    .header-router {
      cursor: pointer;
    }
  }

  .app-body {
    height: 448px;
  }
}
</style>