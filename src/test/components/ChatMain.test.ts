import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatMain from '@components/molecules/chat/ChatMain.vue'

const chatMock = {
  id: '1',
  name: 'Juan Pérez',
  avatar: '',
  isOnline: true
}

const messagesMock = [
  {
    id: '1',
    text: 'Hola, ¿cómo estás?',
    timestamp: '10:30',
    isOwn: false,
    status: 'read'
  },
  {
    id: '2',
    text: '¡Hola! Muy bien, gracias. ¿Y tú?',
    timestamp: '10:32',
    isOwn: true,
    status: 'read'
  }
]

describe('ChatMain', () => {
  it('valida las props requeridas', () => {
    const wrapper = mount(ChatMain, {
      props: {
        chat: chatMock,
        messages: messagesMock
      },
      global: {
        stubs: ['HeaderChat', 'BarSendMessage']
      }
    })
    expect(wrapper.props().chat).toEqual(chatMock)
    expect(wrapper.props().messages).toEqual(messagesMock)
  })

  it('renderiza correctamente el diseño del chat', () => {
    const wrapper = mount(ChatMain, {
      props: {
        chat: chatMock,
        messages: messagesMock
      },
      global: {
        stubs: ['HeaderChat', 'BarSendMessage']
      }
    })
    // Verifica que el header se renderiza
    expect(wrapper.findComponent({ name: 'HeaderChat' }).exists()).toBe(true)
    // Verifica que los mensajes se muestran
    expect(wrapper.text()).toContain('Hola, ¿cómo estás?')
    expect(wrapper.text()).toContain('¡Hola! Muy bien, gracias. ¿Y tú?')
    // Verifica que el input para enviar mensajes existe
    expect(wrapper.findComponent({ name: 'BarSendMessage' }).exists()).toBe(true)
  })
})
