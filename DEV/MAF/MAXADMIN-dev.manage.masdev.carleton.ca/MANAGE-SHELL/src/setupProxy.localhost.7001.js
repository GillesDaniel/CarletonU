
// istanbul ignore file
    
// https://github.com/chimurai/http-proxy-middleware    
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/maximo/**', {
      target: 'http://localhost:7001',
      headers: {
        MAXAUTH: 'd2lsc29uOndpbHNvbg=='
      },
      changeOrigin: true
    }));
};    
    