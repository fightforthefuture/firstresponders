module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'First Responders for Net Neutrality',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Montserrat:700|Open+Sans:300,600'
      }
    ]
  },
  css: [
    'normalize.css/normalize.css',
    '~/assets/css/main.scss'
  ],
  modules: [
    'nuxt-sass-resources-loader'
  ],
  sassResources: [
    '~/assets/css/_header.scss'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  vendor: [
    'babel-polyfill'
  ],
  babel: {
    presets: [
      ['vue-app', {
          useBuiltIns: true,
          targets: { ie: 9, uglify: true }
        }
      ]
    ]
  },
  plugins: [
    { src: '~/plugins/analytics.js', ssr: false },
    { src: '~/plugins/hash-link-fix.js', ssr: false }
  ]
}

