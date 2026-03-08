<template>
  <div class="board" data-testid="board">
    <template v-for="rank in ranks" :key="rank">
      <ChessSquare
        v-for="file in files"
        :key="`${file}${rank}`"
        :square-id="`${file}${rank}`"
        :is-highlighted="isHighlighted(`${file}${rank}`)"
        :is-light="isLight(rank, file)"
        @click="toggleSquare"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { File, Rank } from '@/types'
import ChessSquare from './ChessSquare.vue'
import { useBoardState } from '@/composables/useBoardState'

const files: File[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const ranks: Rank[] = ['8', '7', '6', '5', '4', '3', '2', '1']

const { toggleSquare, isHighlighted } = useBoardState()

const isLight = (rank: Rank, file: File) => {
  return (files.indexOf(file) + Number(rank)) % 2 === 0
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/mixins';

.board {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  aspect-ratio: 1 / 1;
  width: 100%;
  min-width: 264px;

  @include mixins.tablet {
    height: 100vh;
    width: auto;
  }
}
</style>
