import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@views/RegisterView.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@views/ChatView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@views/SettingsView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const protectedRoutes = ['chat', 'settings']
  if (protectedRoutes.includes(to.name as string) && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
