
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
var new_date = new Date();

/**日期时间格式化 20170413170432**/
var date_month = new_date.getMonth() <= 8 ? '0' + (new_date.getMonth() + 1) : (new_date.getMonth() + 1);
var date_day = new_date.getDate() <= 9 ? '0' + new_date.getDate() : new_date.getDate();
var date_hour = new_date.getHours() <= 9 ? '0' + new_date.getHours() : new_date.getHours();
var date_min = new_date.getMinutes() <= 9 ? '0' + new_date.getMinutes() : new_date.getMinutes();
var date_sec = new_date.getSeconds() <= 9 ? '0' + new_date.getSeconds() : new_date.getSeconds();
var new_dateTime = new_date.getFullYear() + "年" + date_month + "月" + date_day + "日" + date_hour + "时" + date_min + "分" + date_sec + '秒';

module.exports = {
  // 构建产品时使用的配置
  build: {
    // 环境变量
    env: require("./prod.env"),
    /*  index: path.resolve(
      __dirname,
      "../dist/" + new_dateTime + "xinHuo" + "/index.html"
    ), // 编译输入的 index.html 文件
    assetsRoot: path.resolve(__dirname, "../dist/" + new_dateTime + "xinHuo"), // 编译输出的静态资源路径 */
    index: path.resolve(
      __dirname,
      "../dist/index.html"
    ), // 编译输入的 index.html 文件
    assetsRoot: path.resolve(__dirname, "../dist/"), // 编译输出的静态资源路径
    assetsSubDirectory: "static", // 编译输出的二级目录
    assetsPublicPath: "/", // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    productionSourceMap: true, // 是否开启 cssSourceMap
    productionGzip: false, // 是否开启 gzip压缩
    productionGzipExtensions: ["js", "css"], // 需要使用 gzip 压缩的文件扩展名
    // 是否展示webpack构建打包之后的分析报告
    bundleAnalyzerReport: process.env.npm_config_report
  },
  /*   build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }, */

  dev: {
    // 环境变量
    env: require("./dev.env"),
    // dev-server监听的端口
    port: process.env.PORT || 8080,
    // 是否自动打开浏览器
    autoOpenBrowser: true,
    // 静态资源文件夹
    assetsSubDirectory: "static",
    // 发布路径
    assetsPublicPath: "/",
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};

