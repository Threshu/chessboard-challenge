<template>
  <div class="app">
    <ChessBoard />
    <SidebarLog />
  </div>
</template>

<script setup lang="ts">
import ChessBoard from './components/ChessBoard.vue'
import SidebarLog from './components/SidebarLog.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins';

.app {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  min-height: 100vh;

  @include mixins.tablet {
    flex-direction: row;
    height: 100vh;
  }
}
</style>
