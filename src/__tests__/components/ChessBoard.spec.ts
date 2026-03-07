import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ChessBoard from '@/components/ChessBoard.vue'
import { useBoardState } from '@/composables/useBoardState'

describe('ChessBoard', () => {
  const { resetBoard } = useBoardState()
  beforeEach(() => {
    resetBoard()
  })
  it('renders 64 squares', () => {
    const wrapper = mount(ChessBoard)

    const squares = wrapper.findAll('[data-square]')
    expect(squares).toHaveLength(64)
  })

  it('check corner squares', () => {
    const wrapper = mount(ChessBoard)

    const squares = wrapper.findAll('[data-square]')
    expect(squares[0]?.attributes('data-square')).toBe('a8')
    expect(squares[7]?.attributes('data-square')).toBe('h8')
    expect(squares[56]?.attributes('data-square')).toBe('a1')
    expect(squares[63]?.attributes('data-square')).toBe('h1')
  })

  it('toggles highlight on square click', async () => {
    const wrapper = mount(ChessBoard)

    const square = wrapper.find('[data-square="e4"]')
    await square.trigger('click')

    expect(square.classes()).toContain('square--highlighted')
  })
})
