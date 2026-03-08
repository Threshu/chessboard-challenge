import App from '@/App.vue'
import { useBoardState } from '@/composables/useBoardState'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'

describe('App', () => {
  const { resetBoard } = useBoardState()
  beforeEach(() => {
    resetBoard()
  })

  it('renders board and sidebar', () => {
    const wrapper = mount(App)

    expect(wrapper.find('[data-testid="board"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="sidebar-log"]').exists()).toBe(true)
  })

  it('logs new entry after clicking a square', async () => {
    const wrapper = mount(App)

    const square = wrapper.find('[data-square="e4"]')
    await square.trigger('click')
    expect(square.classes()).toContain('square--highlighted')

    const sidebar = wrapper.find('[data-testid="sidebar-log"]')
    expect(sidebar.text()).toContain('e4')
    expect(sidebar.findAll('[data-testid="log-entry"]')).toHaveLength(1)
  })

  it('clears highlighted squares and log after reset', async () => {
    const wrapper = mount(App)

    const square = wrapper.find('[data-square="e4"]')
    await square.trigger('click')

    const resetButton = wrapper.find('[data-testid="reset-button"]')
    await resetButton.trigger('click')

    expect(square.classes()).not.toContain('square--highlighted')

    const sidebar = wrapper.find('[data-testid="sidebar-log"]')
    expect(sidebar.text()).toContain('No moves yet')
    expect(sidebar.findAll('[data-testid="log-entry"]')).toHaveLength(0)
  })
})
