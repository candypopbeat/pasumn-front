const appEnvironment = require(`./config/env.${process.env.NODE_ENV}.js`)

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: '%s | ' + appEnvironment.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: appEnvironment.description },
      { hid: 'og:site_name', property: 'og:site_name', content: appEnvironment.title },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: appEnvironment.baseUrl },
      { hid: 'og:title', property: 'og:title', content: appEnvironment.title },
      { hid: 'og:description', property: 'og:description', content: appEnvironment.description },
      { hid: 'og:image', property: 'og:image', content: `${appEnvironment.baseUrl}/img/main_visual.jpg` },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' }
    ],
    script: [
      {
        src: '/js/bootstrap/bootstrap.bundle.min.js',
        body: true
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/scss/bootstrap.scss"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // サーバーの環境変数であるNODE＿ENVの値によって参照する設定ファイルを変更する処理を入れる
  env: appEnvironment,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
