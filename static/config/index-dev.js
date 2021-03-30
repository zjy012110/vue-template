/*
 * @Description: 测试环境地址
 * @Date: 2020-06-18 14:49:30
 * @LastEditTime: 2021-03-30 10:40:08
 * @FilePath: \vue-template\static\config\index-dev.js
 */
/**
 * 测试环境
 */
; (function () {
  window.SITE_CONFIG = {}

  // api接口请求地址
  window.SITE_CONFIG.baseUrl = ''
  window.SITE_CONFIG.contextPath = ''
  window.SITE_CONFIG.devContextPath = ''

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG.domain = './' // 域名
  window.SITE_CONFIG.mainDomain = '' // token共享主域名
  window.SITE_CONFIG.version = '' // 版本号(年月日时分)
  window.SITE_CONFIG.cdnUrl = window.SITE_CONFIG.domain + window.SITE_CONFIG.version

  // businessType 业务系统类型： CRM
  window.SITE_CONFIG.businessType = 'PLATFORM'
})()
