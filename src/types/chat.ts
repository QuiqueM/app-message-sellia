export interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
}

export interface Message {
  id: string
  text: string
  timestamp: string
  isOwn: boolean
  status: 'sent' | 'delivered' | 'read'
}

export interface Conversation {
  clientId: string
  messages: Message[]
}
