//开发环境
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://qa.service.firedai.com"'
})
//http://192.168.10.163
//http://qa.service.firedai.com