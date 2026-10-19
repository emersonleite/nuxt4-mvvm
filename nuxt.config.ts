export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  app: {
    head: {
      title: 'Benefícios | Nuxt 4 MVVM',
      meta: [
        {
          name: 'description',
          content: 'Exemplo de dashboard de benefícios com Nuxt 4 e MVVM.',
        },
      ],
    },
  },
});
