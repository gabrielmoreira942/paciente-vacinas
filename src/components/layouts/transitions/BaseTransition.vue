<template>
  <main>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'BaseTransition',
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.main {
  min-height: 100vh;
  height: 100%;
  background: linear-gradient(to bottom right, #282828, rgb(62, 42, 84)) !important;
}

.container {
  height: 100%;
  padding: 40px 20px !important;
}

.container > .main-content {
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 8px;
}

.slide-enter,
.slide-leave-to {
  transform: translate(-50px);
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s;
}
</style>
