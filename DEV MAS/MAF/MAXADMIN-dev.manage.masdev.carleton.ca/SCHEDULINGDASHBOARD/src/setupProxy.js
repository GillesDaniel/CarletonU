
// istanbul ignore file

// https://github.com/chimurai/http-proxy-middleware
const proxy = require('http-proxy-middleware');

const rewriteFn = function (path, req) {
  
  path = path.replace('/oslc/', '/api/');
        path = path.replace('/api/api/', '/api/');
        path = path.includes('?')? path + '&apikey=nbkasu56dlmiakct054p98eh894f8mjlo5hrjv9k' : path + '?apikey=nbkasu56dlmiakct054p98eh894f8mjlo5hrjv9k';
  return path;
};
    

module.exports = function(app) {
  app.use(proxy.createProxyMiddleware('/maximo/**', {
      target: 'https://dev.manage.masdev.carleton.ca:443',
      changeOrigin: true,
      pathRewrite: rewriteFn
      
    }));
};
    