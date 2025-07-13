import { createFetchInstance } from '@/modules/shared/GlobalFetch'
import { userProvier } from './UserProvider'
import type { App, Plugin } from 'vue'

const BASE_URL = 'https://api.tuservidor.com/' // TODO: mandar a una variable de entorno

const useDependenciesLocator = (app: App) => {
  const fetchInstance = createFetchInstance(BASE_URL)

  const loadDependencies = () => {
    app.provide('userProvider', userProvier(fetchInstance))
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
