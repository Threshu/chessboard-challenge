<template>
  <div class="sidebar" data-testid="sidebar-log">
    <button data-testid="reset-button" @click="resetBoard">Reset</button>
    <ol v-if="clickLog.length > 0">
      <li v-for="entry in clickLog" :key="entry.id" data-testid="log-entry">
        {{ entry.squareId }}
      </li>
    </ol>
    <p v-else>No moves yet</p>
  </div>
</template>

<script setup lang="ts">
import { useBoardState } from '@/composables/useBoardState'

const { clickLog, resetBoard } = useBoardState()
</script>

<style lang="scss" scoped>
.sidebar {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>
