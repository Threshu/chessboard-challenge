import { describe, it, expect, beforeEach } from 'vitest'
import { useBoardState } from '@/composables/useBoardState'

describe('useBoardState', () => {
  const { toggleSquare, isHighlighted, resetBoard, clickLog } = useBoardState()

  beforeEach(() => {
    resetBoard()
  })

  it('should highlight a square when toggled', () => {
    toggleSquare('e4')

    expect(isHighlighted('e4')).toBe(true)
  })

  it('should unhighlight a square when toggled twice', () => {
    toggleSquare('e4')
    toggleSquare('e4')

    expect(isHighlighted('e4')).toBe(false)
    expect(clickLog.value).toHaveLength(1)
    expect(clickLog.value[0]).toEqual({ id: 1, squareId: 'e4' })
  })

  it('should highlight multiple squares at once', () => {
    toggleSquare('e4')
    toggleSquare('d5')
    expect(isHighlighted('e4')).toBe(true)
    expect(isHighlighted('d5')).toBe(true)
    expect(clickLog.value).toHaveLength(2)
    expect(clickLog.value[0]).toEqual({ id: 1, squareId: 'e4' })
    expect(clickLog.value[1]).toEqual({ id: 2, squareId: 'd5' })
  })

  it('should add new log entry when re-highlighting a square', () => {
    toggleSquare('e4')
    toggleSquare('e4')
    toggleSquare('e4')
    expect(isHighlighted('e4')).toBe(true)
    expect(clickLog.value).toHaveLength(2)
    expect(clickLog.value[0]).toEqual({ id: 1, squareId: 'e4' })
    expect(clickLog.value[1]).toEqual({ id: 2, squareId: 'e4' })
  })

  it('should clear everything on reset', () => {
    toggleSquare('e4')
    resetBoard()
    expect(isHighlighted('e4')).toBe(false)
    expect(clickLog.value).toHaveLength(0)
  })
})
