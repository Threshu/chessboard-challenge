import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChessSquare from '@/components/ChessSquare.vue'

describe('ChessSquare', () => {
  it('renders with correct data-square attribute', () => {
    const wrapper = mount(ChessSquare, {
      props: {
        squareId: 'e4',
        isLight: true,
        isHighlighted: false,
      },
    })

    const square = wrapper.find('[data-square="e4"]')

    expect(square.exists()).toBe(true)
  })

  it('applies square--light class for light square', () => {
    const wrapper = mount(ChessSquare, {
      props: {
        squareId: 'e4',
        isLight: true,
        isHighlighted: false,
      },
    })

    expect(wrapper.classes()).toContain('square--light')
    expect(wrapper.classes()).not.toContain('square--dark')
  })

  it('emits click with squareId when clicked', async () => {
    const wrapper = mount(ChessSquare, {
      props: {
        squareId: 'd5',
        isLight: false,
        isHighlighted: false,
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.emitted('click')![0]).toEqual(['d5'])
  })

  it('applies square--dark class for dark square', () => {
    const wrapper = mount(ChessSquare, {
      props: {
        squareId: 'e4',
        isLight: false,
        isHighlighted: false,
      },
    })

    expect(wrapper.classes()).toContain('square--dark')
    expect(wrapper.classes()).not.toContain('square--light')
  })

  it('applies square--highlighted class when highlighted', () => {
    const wrapper = mount(ChessSquare, {
      props: {
        squareId: 'e4',
        isLight: true,
        isHighlighted: true,
      },
    })

    const square = wrapper.find('[data-square="e4"]')

    expect(square.classes()).toContain('square--highlighted')
  })

  it('does not apply square--highlighted class when not highlighted', () => {
    const wrapper = mount(ChessSquare, {
      props: {
        squareId: 'e4',
        isLight: true,
        isHighlighted: false,
      },
    })

    const square = wrapper.find('[data-square="e4"]')

    expect(square.classes()).not.toContain('square--highlighted')
  })

  it('has correct accessibility attributes', () => {
    const wrapper = mount(ChessSquare, {
      props: {
        squareId: 'e4',
        isLight: true,
        isHighlighted: false,
      },
    })

    expect(wrapper.attributes('aria-label')).toBe('e4')
    expect(wrapper.attributes('role')).toBe('button')
    expect(wrapper.attributes('tabindex')).toBe('0')
  })
})
