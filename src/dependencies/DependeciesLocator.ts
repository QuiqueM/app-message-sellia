import { createFetchInstance } from '@/modules/shared/GlobalFetch'
import { userProvier } from './UserProvider'
import { customerProvider } from './CustomerProvider'
import { messageProvider } from './MessageProvider'
import type { App, Plugin } from 'vue'

const BASE_URL = 'https://sellia-files.s3.us-east-2.amazonaws.com/challenge' // TODO: mandar a una variable de entorno

const useDependenciesLocator = (app: App) => {
  const fetchInstance = createFetchInstance(BASE_URL)

  const loadDependencies = () => {
    app.provide('userProvider', userProvier(fetchInstance))
    app.provide('customerProvider', customerProvider(fetchInstance))
    app.provide('messageProvider', messageProvider(fetchInstance))
  }

  return {
    loadDependencies,
  }
}

export const DependenciesLocatorPlugin: Plugin = {
  install(app) {
    const { loadDependencies } = useDependenciesLocator(app)
    loadDependencies()
    console.log('DependenciesLocatorPlugin running in install', app)
  },
}
