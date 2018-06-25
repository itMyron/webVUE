//主要功能:
//1、配置webpack编译入口
//2、配置webpack输出路径和命名规则
//3、配置模块resolve规则
//4、配置不同类型模块的处理规则

'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
var px2rem = require('postcss-plugin-px2rem');	
const vueLoaderConfig = require('./vue-loader.conf')		//css兼容
var ImageminPlugin = require("imagemin-webpack-plugin").default;    //图片压缩

// 获取绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
	// webpack入口文件
  entry: {
    app: './src/main.js'
  },
  // webpack输出路径和命名规则
  output: {
  	// webpack输出的目标文件夹路径（例如：/dist）
    path: config.build.assetsRoot,
    // webpack输出bundle文件命名格式
    filename: '[name].js',
    // webpack编译输出的发布路径（例如'//cdn.xxx.com/app/'）
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 模块resolve的规则
  resolve: {
    extensions: ['.js', '.vue', '.json'],
     // 别名，方便引用模块，例如有了别名之后，
    // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  plugins: [
    // 这个插件压缩图片需要时间，因此开发环境中关闭这个插件，在生产环境中打包压缩图片时开启。
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production' ,
      pngquant: {
        quality: '95-100'
      }
    })
  ],
  // 不同类型模块的处理规则
  module: {
    rules: [
    // 对src和test文件夹下的.js和.vue文件使用eslint-loader进行代码规范检查
      {// 对所有.vue文件使用vue-loader进行编译
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
        /*options: {
            postcss: function () {
                return [px2rem({rootValue:37.5})];
            },
            autoprefixer: {
                browsers: ['last 2 versions', 'Android > 4', 'iOS > 6', 'Safari > 6']
            }
        }*/
      },
      {// 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {// 对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
        	// 小于10K的图片转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的图片转移到静态资源文件夹
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {// 对多媒体资源文件使用url-loader
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
        	// 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {// 对字体资源文件使用url-loader
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
        	// 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
}
