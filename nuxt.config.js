const env = require('./env')

export default {
  server: {
    port: 3000, // 服务器运行的端口
    host: '0.0.0.0',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '说客英语_英语口语在线学习_外教一对一培训',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,viewport-fit=cover' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/web/favicon.ico' }]
  },
  loading: false,
  env: {
    API_URL: env[process.env.MODE].API_URL,
    BASE_PATH: env[process.env.MODE].BASE_PATH,
    IM_LINK: env[process.env.MODE].IM_LINK,
    MODE: env[process.env.MODE].MODE
  },
  // proxy: {
  //   '/api': {
  //     target: env[process.env.MODE].API_URL,
  //     pathRewrite: {
  //       changeOrigin: true,
  //       '^/api': ''
  //     }
  //   }
  // },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/reset.css',
    '@/assets/css/public.css',
    '@/assets/css/element-ui.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/request.js',
    '~/plugins/api',
    '@/plugins/element-ui',
    '@/plugins/event-bus.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  router: {
    base: '/web/', // 替换为你想要设置的基础 URL
    trailingSlash: false
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ],
    },
    transpile: [/^element-ui/],
    extractCSS: true,
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       styles: {
    //         name: 'styles',
    //         test: /\.(css|vue)$/,
    //         chunks: 'all',
    //         enforce: true
    //       }
    //     }
    //   }
    // }
  },
}
