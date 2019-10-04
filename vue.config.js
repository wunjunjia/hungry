const path = require('path')

module.exports = {
  publicPath: '/',
  outputDir: 'server/assets',
  assetsDir: 'public',
  indexPath: 'index.html',
  pages: {
    index: {
      entry: path.join(__dirname, 'src/main.js'),
      template: path.join(__dirname, 'public/index.html'),
      filename: 'index.html',
      title: 'Hungry',
      chunks: ['index', 'chunk-vendors']
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src')
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/assets/style/index.scss";`
      }
    }
  }
}
