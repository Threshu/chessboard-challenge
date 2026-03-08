<template>
  <div class="sidebar" data-testid="sidebar-log">
    <div class="sidebar__header">
      <button data-testid="reset-button" @click="resetBoard">Reset</button>
    </div>
    <div class="sidebar__content">
      <ol v-if="clickLog.length > 0">
        <li v-for="entry in clickLog" :key="entry.id" data-testid="log-entry">
          {{ entry.id }}. {{ entry.squareId }}
        </li>
      </ol>
      <p v-else class="sidebar__empty">No moves yet</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoardState } from '@/composables/useBoardState'

const { clickLog, resetBoard } = useBoardState()
</script>

<style lang="scss" scoped>
.sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--color-sidebar-bg);
  color: var(--color-sidebar-text);

  &__header {
    padding: 1rem 1rem 0;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: 0 1rem 1rem;
  }

  &__empty {
    margin-top: 0.75rem;
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
    font-weight: 600;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.02);
  }

  button {
    width: 100%;
    height: 40px;
    background-color: var(--color-sidebar-button-bg);
    color: inherit;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;

    &:hover {
      background-color: var(--color-sidebar-button-hover);
    }
  }

  ol {
    list-style: none;
    margin-top: 0.75rem;
    border-radius: 5px;
    overflow: hidden;
  }

  li {
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
    font-weight: 600;

    &:nth-child(odd) {
      background-color: rgba(255, 255, 255, 0.02);
    }
  }
}
</style>
