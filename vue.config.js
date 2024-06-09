'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528

const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  // 设置应用的根路径。默认为 '/'，表示应用将部署在域名的根路径下。
  publicPath: '/',
  // 构建输出目录。默认为 'dist'。
  outputDir: 'dist',
  // 静态资源目录（相对于 outputDir）。默认为 'static'。
  assetsDir: 'static',
  // 是否在保存时启用 eslint 校验。仅在开发环境中启用。
  lintOnSave: process.env.NODE_ENV === 'development',
  // 是否在生产环境中生成 source map。设置为 false 以加快构建速度。
  productionSourceMap: false,
  // 开发服务器配置：
  devServer: {
    // 前端端口。
    port: port,
    // 是否在服务器启动时自动打开浏览器。
    open: false,
    // 是否显示错误和警告的遮罩层。
    overlay: {
      warnings: false,
      errors: true
    },
    // 在开发服务器启动前运行的中间件，这里用于引入 mock 数据服务器。
    // before: require('./mock/mock-server.js')
    proxy: {
      '/api': {
        target: process.env.APP_BASE_URL, // 后端服务器地址
        changeOrigin: true // 是否跨域
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  },
  // 直接进行 Webpack 配置的对象：
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // 应用的名称，用于设置 HTML 页面标题。
    name: name,
    // 配置路径解析，设置别名 @ 指向 src 目录。
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  // 以链式编程方式进行更细粒度的 Webpack 配置：
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // 配置预加载，优化首屏加载速度。
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    // 删除预获取插件，避免多余的请求。
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    // 配置 SVG 图标加载器，用于处理 src/icons 目录下的 SVG 文件。
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    // 插入插件以支持内联 runtime chunk 。
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          // 配置代码分割：
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
              // 分割第三方库。
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                // 分割 ElementUI 库。
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                // 分割公共组件代码。
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          // 设置 runtime chunk，优化缓存。
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
