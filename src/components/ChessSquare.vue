<template>
  <div
    class="square"
    role="button"
    tabindex="0"
    :class="[isLight ? 'square--light' : 'square--dark', { 'square--highlighted': isHighlighted }]"
    :aria-label="squareId"
    :data-square="squareId"
    @click="$emit('click', squareId)"
  ></div>
</template>

<script setup lang="ts">
import type { SquareId } from '@/types'

interface Props {
  squareId: SquareId
  isLight: boolean
  isHighlighted: boolean
}
defineProps<Props>()
defineEmits<{ (e: 'click', squareId: SquareId): void }>()
</script>

<style lang="scss" scoped>
.square {
  aspect-ratio: 1 / 1;
  cursor: pointer;
  position: relative;

  &--light {
    background-color: var(--color-light);
  }
  &--dark {
    background-color: var(--color-dark);
  }

  &--highlighted::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--color-highlight);
  }
}
</style>
