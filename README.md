### 纯净的webpack4的vue开发/生产环境项目  
仅配置了开发的启动和打包，后续的功能开发自行导入相关依赖    

#### install 下载依赖  
`npm install`  

#### dev  
`npm run dev`  
config/index.js 下修改target变量更改开发环境代理请求地址  
static/config/index.js更改api接口请求地址  
请求接口时使用全局变量`window.SITE_CONFIG.baseUrl` + url进行拼接  

```  
// 代理列表, 是否开启代理通过[./dev.env.js]配置
    proxyTable: devEnv.OPEN_PROXY === false ? {} : {
      '/proxyApi': {
        target: 'http://www.baidu.com:8800',
        changeOrigin: true,
        pathRewrite: {
          '^/proxyApi': '/'
        }
      }
    },
```  

#### build  
使用static/config/index-${evn}.js 对应打包配置文件下的 baseUrl请求地址  
**prod(生产环境打包)**  
`npm run build`  
**dev(开发环境打包)**  
`npm run build --dev`  
**test(测试环境打包)**  
`npm run build --test`  

**打包后的项目结构**  
```  
├─index.html  
│  
├─(版本号)  
│     └─static  
│          ├─css  
│          │   └─3.css  
│          │   └─app.css  
│          │      
│          ├─img  
│          │   └─favicon.ico  
│          │      
│          └─js  
│             ├─3.js  
│             ├─4.js  
│             ├─app.js  
│             ├─manifest.js  
│             └─vendor.js  
│              
└─config  
      └─index.js  
```  
**版本支持**  
node < 11  
*当前打包工具gulpfile引入版本为3.9，最高只支持node11，使用更高的node版本需自行升级gulpfile并重写gulpfile.js*
