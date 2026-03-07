import SidebarLog from '@/components/SidebarLog.vue'
import { useBoardState } from '@/composables/useBoardState'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

describe('SidebarLog', () => {
  const { resetBoard, toggleSquare } = useBoardState()
  beforeEach(() => {
    resetBoard()
  })

  it('check if no logs initially', () => {
    const wrapper = mount(SidebarLog)

    expect(wrapper.findAll('[data-testid="log-entry"]')).toHaveLength(0)
    expect(wrapper.text()).toContain('No moves yet')
  })

  it('displays entry after highlighting a square', async () => {
    const wrapper = mount(SidebarLog)

    toggleSquare('e4')
    await nextTick()

    expect(wrapper.findAll('[data-testid="log-entry"]')).toHaveLength(1)
    expect(wrapper.text()).toContain('e4')
  })

  it('no extra entry after unhighlighting a square', async () => {
    const wrapper = mount(SidebarLog)

    toggleSquare('e4')
    toggleSquare('e4')
    await nextTick()

    expect(wrapper.findAll('[data-testid="log-entry"]')).toHaveLength(1)
  })

  it('reset clears log entries', async () => {
    const wrapper = mount(SidebarLog)

    toggleSquare('e4')
    toggleSquare('d5')
    resetBoard()
    await nextTick()

    expect(wrapper.findAll('[data-testid="log-entry"]')).toHaveLength(0)
    expect(wrapper.text()).toContain('No moves yet')
  })
})
