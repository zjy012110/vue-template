/*
 * @Description:
 * @Date: 2020-06-18 14:49:30
 * @LastEditTime: 2020-07-10 10:14:22
 * @FilePath: \hbs_project\static\config\dev.env.js
 */

'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  OPEN_PROXY: true // 是否开启代理, 重置后需重启vue-cli
})
