module.exports = {
  dev: {
    /* === 系统默认提供，权限系统开发需更改 === */
    'dev-api': {
      target: 'http://127.0.0.1:9966/mock/',  // 接口域名
      changeOrigin: true,           // 是否跨域
      pathRewrite: {
        '^/dev-api': '/'
      }
    },
    /* === 商品模块 === */
    '/api/commodity': {
      target: 'http://localhost:8003/',  // 接口域名
      changeOrigin: true,           // 是否跨域
      pathRewrite: {
        '^/api/commodity': '/'
      }
    },
    /* === 活动模块 === */
    '/api/activity': {
      target: 'http://localhost:8009/',  // 接口域名
      changeOrigin: true,           // 是否跨域
      pathRewrite: {
        '^/api/activity': '/'
      }
    },
    /* === 系统模块 === */
    '/api/system': {
      target: 'http://localhost:8010/',  // 接口域名
      changeOrigin: true,           // 是否跨域
      pathRewrite: {
        '^/api/system': '/'
      }
    }
  }
}
