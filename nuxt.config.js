const env = require('./env')

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: 8000,
    host: '127.0.0.1'
  },
  head: {
    title: '说客英语_英语口语在线学习_外教一对一',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '外教英语,英语口语在线学习,英语培训,欧美一对一外教,外教一对一,一对一雅思外教,一对一英语培训,找英语外教,线上一对一英语外教,真人外教一对一,外教口语一对一,英语一对一线上外教,在线外教一对一'},
      { hid: 'description', name: 'description', content: '说客英语，国内在线英语外教一对一培训知名品牌，外教老师全部持有TESOL、TEEL资格认证，有欧美英语外教、菲律宾英语外教、中国英语教师等英语一对一教师可供学员选择，适合零基础和其他不同基础的学员进行英语学习及英语口语练习。'}
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

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
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/request.js',
    '~/plugins/api.js',
    '@/plugins/element-ui',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

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
    extractCSS: { allChunks: true }
  },
}
