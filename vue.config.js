const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const productionGzip = true

const productionGzipExtensions = ['js', 'css']

const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'axios': 'axios',
  'element-ui': 'ELEMENT'
}

const cdn = {
  css: [
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
  ],
  js: [
    'https://cdn.jsdelivr.net/npm/vue@2.6.7/dist/vue.js',
    'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
    'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
    'https://unpkg.com/element-ui/lib/index.js'
  ]
}

module.exports = {
  baseUrl: './',
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: process.env.NODE.ENV !== 'production',
  runtimeCompiler: true,
  configureWebpack: (config) => {
    config.externals = externals,
      productionGzip && config.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 8192,
          minRatio: 0.8
        })
      )
  },
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {},
    modules: false
  },
  parallel: require('os').cpus().length > 1,
  pwa: {},
  devServer: {
    host: '0.0.0.0',
    port: 9080,
    https: false,
    hot: true,
    hotOnly: false,
    proxy: {
      "/api.*": {
        target: "http://10.246.9.139:9000",
        changeOrigin: true,
        secure: false
      },
      "/109-35": {
        target: "http://route.showapi.com",
        changeOrigin: true,
        secure: false
      }
    },
    before: app => {}
  },
  pluginOptions: {
  },
  chainWebpack(config) {

    config.resolve.alias
      .set('style', resolve('src/style'))
      .set('api', resolve('src/api'))
      .set('tools', resolve('src/tools'))
      .set('components', resolve('src/components'))
      .set('echarts', resolve('src/echarts'))
      .set('echarts', resolve('node_modules/echarts'))
      .set('src', resolve('src'))
      .set('router', resolve('src/router'))

    config.output.filename('[name].[hash].js').end()

    config
      .plugin('html')
      .tap(args => {
        args[0].cdn = cdn
        return args
      })
  }
}