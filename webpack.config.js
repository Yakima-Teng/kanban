const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const NpmInstallPlugin = require('npm-install-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TARGET = process.env.npm_lifecycle_event

// Load *package.json* so we can use `dependencies` from there
const pkg = require('./package.json')

process.env.BABEL_ENV = TARGET

const common = {
  entry: {
    app: './src/index.jsx'
  },
  // Add resolve.extensions
  // '' is needed to allow imports without an extension
  // Note the . before extensions as it will fail to match without!!!
  // resolve.extensions gets evaluated from left to right
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: './dist/',
    // Output using entry name
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        // loaders are evaluaated from right to left
        // css-loader will resolve @import and url statements in CSS files
        // style-loader deals with require statements in JavaScript
        loaders: ['style-loader', 'css-loader', 'less-loader'],
        include: path.join(__dirname, './src')
      },
      // Set up jsx. The accepts js too thanks to RegExp
      {
        test: /\.jsx?$/,
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need something
        // more custom, pass a path to it.
        // I.e., babel?cacheDirectory=<path>
        loaders: ['babel?cacheDirectory'],
        include: path.join(__dirname, './src')
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'node_modules/html-webpack-template/index.ejs',
      title: 'Kanban app',
      appMountId: 'app',
      inject: false
    })
  ]
}

/***********************************************************************************
 *                                                                                  *
 * Default configuration
 *                                                                                  *
 ***********************************************************************************/
if (TARGET === 'dev' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      // contentBase: './dist/',
      // Enable history API fallback so HTML5 History API based routing works
      // This is a good default that will come in handy in more complicated setups
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      // Display only errors to reduce the amount of output
      stats: 'erros-only',
      // Parse host and port from env so this is easy to customize
      // 0.0.0.0 is available to all network devices unlike default
      host: process.env.HOST,
      // 使用package.json中npm run start命令中传入的port参数值
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // 会自动检测项目文件和webpack.config.js配置文件，主动进行npm package的下载
      // 并且会自动更新package.json文件
      new NpmInstallPlugin({
        save: true
      })
    ]
  })
}

if (TARGET === 'build') {
  module.exports = merge(common, {
    // Define vendor entry point needed for splitting
    entry: {
      vendor: Object.keys(pkg.dependencies).filter(v => {
        // Exclude alt-utils as it won't work with this setup
        // due to the way the package has been designed
        // (no package.json main: there is a main filed in package.json pointing to index.js which doesn't exsit)
        return v !== 'alt-utils'
      })
    },
    output: {
      path: './dist/',
      filename: '[name].[chunkhash].js',
      chunkFilename: '[chunkhash].js'
    },
    plugins: [
      // Extract vendor and manifest files
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      // Setting DefinePlugin affects React library size!
      // DefinPlugin replaces content 'as is' so we need some extra quotes for the generated code to make sense
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  })
}
