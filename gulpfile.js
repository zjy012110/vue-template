const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const path = require('path')
const del = require('del')
let distPath = path.resolve('./dist')
let version = '' // 版本号
let versionPath = '' // 版本号路径
let env = ''; // 运行环境

// 创建版本号(年月日时分)
(function () {
  let d = new Date()
  let yy = d.getFullYear().toString().slice(2)
  let MM = d.getMonth() + 1 >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)
  let DD = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()
  let h = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours()
  let mm = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes()
  version = yy + MM + DD + h + mm
  versionPath = distPath + '/' + version
})()

// 编译
gulp.task('build', $.shell.task(['node --max_old_space_size=4096 build/build.js']))

// 创建版本号目录
gulp.task('create:versionCatalog', () => {
  return gulp.src(`${distPath}/static/**/*`)
    .pipe(gulp.dest(`${versionPath}/static/`))
})

// 替换${versionPath}/static/js/manifest.js window.SITE_CONFIG.cdnUrl占位变量
gulp.task('replace:cdnUrl', () => {
  return gulp.src(`${versionPath}/static/js/manifest.js`)
    .pipe($.replace(new RegExp(`"${require('./config').build.assetsPublicPath}"`, 'g'), 'window.SITE_CONFIG.cdnUrl + "/"'))
    .pipe(gulp.dest(`${versionPath}/static/js/`))
})

// 替换${versionPath}/static/config/index-${env}.js window.SITE_CONFIG['version']配置变量
gulp.task('replace:version', () => {
  return gulp.src(`${versionPath}/static/config/index-${env}.js`)
    .pipe($.replace(/window.SITE_CONFIG.version = '.*'/g, `window.SITE_CONFIG.version = '${version}'`))
    .pipe(gulp.dest(`${versionPath}/static/config/`))
})

// 合并${versionPath}/static/config/[index-${env}, init].js 至 ${distPath}/config/index.js
gulp.task('concat:config', () => {
  return gulp.src([`${versionPath}/static/config/index-${env}.js`, `${versionPath}/static/config/init.js`])
    .pipe($.concat('index.js'))
    .pipe(gulp.dest(`${distPath}/config/`))
})

// 清空
gulp.task('clean', () => {
  return del([versionPath])
})

// 清除, 编译 / 处理项目中产生的文件
gulp.task('cleanUpFilesAfterBuild', () => {
  return del([`${distPath}/static`, `${versionPath}/static/config`, `${distPath}/*.js`])
})

gulp.task('default', gulp.series('clean', (done) => {
  env = process.env.npm_config_dev ? 'dev' : process.env.npm_config_test ? 'test' : 'prod'
  done()
}, gulp.series('build', 'create:versionCatalog', 'replace:cdnUrl', 'replace:version', 'concat:config', 'cleanUpFilesAfterBuild')))
