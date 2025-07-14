import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginView from '@views/LoginView.vue'

const mockLoginUser = vi.fn(async () => true)

vi.mock('@/composables/useUser', () => ({
  useUser: () => ({ loginUser: mockLoginUser })
}))

describe('LoginView', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(LoginView, {
      global: {
        stubs: ['RouterLink', 'Form', 'InputText', 'Button', 'AlertMessage', 'icon'],
        mocks: {
          $t: (msg: string) => msg
        }
      },
    })
    mockLoginUser.mockClear()
  })

  it('renderiza correctamente el formulario de login', () => {
    expect(wrapper.findComponent({ name: 'Form' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'InputText' })).toBeTruthy()
    expect(wrapper.findComponent({ name: 'Button' })).toBeTruthy()
  })

  it('llama a loginUser al enviar el formulario', async () => {
    await wrapper.findComponent({ name: 'Form' }).vm.$emit('submit')
    expect(mockLoginUser).toHaveBeenCalled()
  })
})
