//1、loading动画
//2、删除目标文件夹
//3、执行webpack构建
//4、输出信息

// 检查NodeJS和npm的版本
require('./check-versions')()

process.env.NODE_ENV = 'production'
// ora，一个可以在终端显示spinner的插件
var ora = require('ora')
// rm，用于删除文件或文件夹的插件
var rm = require('rimraf')
var path = require('path')
// chalk，用于在控制台输出带颜色字体的插件
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfigProd = require('./webpack.prod.conf')

var god = [
  "                   _ooOoo_",
  "                  o8888888o",
  '                  88" . "88',
  "                  (| -_- |)",
  "                  O\\  =  /O",
  "               ____/`---'\\____",
  "             .'  \\\\|     |//  `.",
  "            /  \\\\|||  :  |||//  \\",
  "           /  _||||| -:- |||||-  \\",
  "           |   | \\\\\\  -  /// |   |",
  "           | \\_|  ''\\---/''  |   |",
  "           \\  .-\\__  `-`  ___/-. /",
  "         ___`. .'  /--.--\\  `. . __",
  '      ."" \'<  `.___\\_<|>_/___.\'  >\'"".',
  "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
  "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
  "      `-.____`-.___\\_____/___.-`____.-'",
  "                   `=---='",
  "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
  ""
].join("\n");
var goddess = [
"                         .::::.",
"                       .::::::::.",
"                      :::::::::::",
"                   ..:::::::::::'",
"                '::::::::::::'",
"                  .::::::::::",
"             '::::::::::::::..",
"                  ..::::::::::::.",
"                ``::::::::::::::::",
"                 ::::``:::::::::'        .:::.",
"                ::::'   ':::::'       .::::::::.",
"              .::::'      ::::     .:::::::'::::.",
"             .:::'       :::::  .:::::::::' ':::::.",
"            .::'        :::::.:::::::::'      ':::::.",
"           .::'         ::::::::::::::'         ``::::.",
"       ...:::           ::::::::::::'              ``::.",
"      ```` ':.          ':::::::::'                  ::::..",
"                         '.:::::'                    ':'````..",
""
].join("\n");

if(process.env.NODE_ENV === 'production'){
  var spinner = ora(chalk.green("正在为生产环境打包，耐心点，不然就死机给你看。。。"));
  
  // 开启loading动画
  spinner.start()
  // 首先将整个dist文件夹以及里面的内容删除，以免遗留旧的没用的文件
	// 删除完成后才开始webpack构建打包
  rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    // 执行webpack构建打包，完成之后在终端输出构建完成的相关信息或者输出报错信息并退出程序
    webpack(webpackConfigProd, function (err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
          colors: false, //让打包的时候有颜色
          modules: false, //去掉内置模块信息
          children: false, //去掉子模块
          chunks: false, //增加包信息（设置为 false 能允许较少的冗长输出）
          chunkModules: false // 去除包里内置模块的信息
        }) + "\n\n");
      
      console.log(chalk.yellow(goddess));
      console.log(chalk.cyan("         女神保佑       永无BUG\n\n"));
    })
  })
}


