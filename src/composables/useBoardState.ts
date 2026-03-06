import type { LogEntry, SquareId } from '@/types'
import { reactive, ref, type Ref } from 'vue'

const highlightedSquares = reactive<Set<SquareId>>(new Set())
const clickLog = ref<LogEntry[]>([])

interface BoardState {
  highlightedSquares: Set<SquareId>
  clickLog: Ref<LogEntry[]>
  toggleSquare: (squareId: SquareId) => void
  isHighlighted: (squareId: SquareId) => boolean
  resetBoard: () => void
}

export function useBoardState(): BoardState {
  const toggleSquare = (squareId: SquareId) => {
    if (highlightedSquares.has(squareId)) {
      highlightedSquares.delete(squareId)
    } else {
      highlightedSquares.add(squareId)
      clickLog.value.push({
        id: clickLog.value.length + 1,
        squareId,
      })
    }
  }

  const isHighlighted = (squareId: SquareId) => {
    return highlightedSquares.has(squareId)
  }

  const resetBoard = () => {
    highlightedSquares.clear()
    clickLog.value = []
  }

  return {
    highlightedSquares,
    clickLog,
    toggleSquare,
    isHighlighted,
    resetBoard,
  }
}
