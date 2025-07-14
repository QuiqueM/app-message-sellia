# Documentación Técnica: app-message-sellia

## Descripción General
Aplicación web de mensajería y gestión de usuarios desarrollada con Vue 3, Pinia, Vite y Tailwind. Incluye autenticación, chat, internacionalización y pruebas automatizadas.

---

## Estructura de Carpetas

- **src/**
  - **App.vue, main.ts:** Entrada principal.
  - **assets/**: Estilos y recursos.
  - **composables/**: Hooks personalizados (ej. useUser, useDarkMode).
  - **modules/users/**: Lógica de dominio, adapters y casos de uso para usuarios.
  - **router/**: Configuración de rutas y guards.
  - **stores/**: Pinia stores.
  - **types/**: Tipos TypeScript.
  - **ui/components/**: Componentes atómicos, moléculas, vistas e iconos SVG.
    - **atoms/**, **chat/**, **icons/**, **views/** (ej. LoginView.vue, ChatView.vue).

---

## Principales Tecnologías
- **Vue 3** (Composition API)
- **Pinia** (gestión de estado)
- **Vue Router** (ruteo)
- **Tailwind CSS** (estilos)
- **Vite** (build y dev server)
- **Vitest** + **@vue/test-utils** (testing)
- **VeeValidate** (validación de formularios)
- **i18n** (internacionalización)

---

## Funcionalidades

### Autenticación
- Registro y login de usuarios.
- Validación de formularios con VeeValidate.
- Manejo de errores y feedback visual.

### Chat
- Vistas y componentes para chat.
- Scroll automático y lógica responsive.
- Skeleton loaders para UX.

### UI/UX
- Diseño responsive y mobile.
- Iconos SVG personalizados.
- Skeleton loaders y feedback visual.

### Internacionalización
- Uso de `$t` para textos traducibles.
- Mock de `$t` en pruebas.

### Testing
- Pruebas unitarias y de componentes.
- Mocks y stubs de dependencias (Pinia, i18n, composables).
- Corrección de errores comunes: entorno DOM, mocks de ESM, eventos en stubs.

---

## Configuración

### Alias
- Configurados en `vite.config.ts` y `tsconfig.json` para rutas cortas (`@views`, `@composables`, etc.).

### Vitest
- Configurado con entorno `jsdom` en `vitest.config.ts`.
- Pruebas en `src/test/composables/` y `src/test/views/`.

### Mocks
- Mock de `inject` para composables.
- Mock de `$t` para i18n en vistas.
- Stubs de componentes en pruebas.

---

## Ejemplo de Test de Composable
```typescript
vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue')
  return {
    ...actual,
    inject: () => mockUserProvider
  }
})
```

## Ejemplo de Test de Vista
```typescript
wrapper = mount(LoginView, {
  global: {
    stubs: ['Form', 'InputText', 'Button'],
    mocks: { $t: (msg: string) => msg }
  }
})
```

---

## Buenas Prácticas
- Separación de lógica de dominio y presentación.
- Uso de mocks y stubs para aislar dependencias en tests.
- Alias para rutas cortas y mantenibles.
- Configuración de entorno DOM para pruebas de componentes.

---

## Requisitos para Desarrollo
- Node.js >= 18
- npm >= 9
- Instalar dependencias: `npm install`
- Ejecutar en desarrollo: `npm run dev`
- Ejecutar tests: `npm run test`

---

## Contacto y Mantenimiento
- Owner: QuiqueM
- Rama principal: main

---

## Notas
- El proyecto está preparado para escalar y agregar nuevos módulos.
- La arquitectura facilita la mantenibilidad y el testing.
