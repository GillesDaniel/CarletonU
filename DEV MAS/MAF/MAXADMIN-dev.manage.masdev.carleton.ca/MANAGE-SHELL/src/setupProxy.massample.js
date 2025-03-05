// istanbul ignore file

// https://github.com/chimurai/http-proxy-middleware
//const proxy = require('http-proxy-middleware');

const {
  createProxyMiddleware,
  responseInterceptor,
} = require("http-proxy-middleware");

const masProxy = require("./setupProxy.mas");

// var onProxyRes = function(proxyRes, req, res) {
//   // add new header to response
//   proxyRes.headers['x-added'] = 'foobar';

//   // remove header from response
//   delete proxyRes.headers['x-removed'];
// };

var onProxyRes = responseInterceptor(
  async (responseBuffer, proxyRes, req, res) => {
    let response = responseBuffer.toString("utf8");
    response = response.replace(/:9081/g, ":3001");
    //console.log('****')
    return response;
  }
);

// var onProxyRes = function (proxyRes, req, res) {
//   var body = [];
//   proxyRes.on('data', function (chunk) {
//     console.log('***** adding chunks', (chunk instanceof Buffer))
//     body.push(chunk);
//   });

//   proxyRes.on('end', function () {
//     body = Buffer.concat(body).toString('utf8');
//     //console.log(req);
//     res.send(body.replace(/9081/g, '3000'));
//     res.end();
//   });
// }

module.exports = function (app) {
  console.log("**** settting up proxy", process.env.REACT_APP_XXXXX);
  ///console.log("XXXXXX", process.env.XXXXX);
  // app.use(createProxyMiddleware('/maximo/ui/', {
  //   target: 'http://localhost:9081',
  //   headers: {
  //     MAXAUTH: 'd2lsc29uOndpbHNvbg=='
  //   },
  //   changeOrigin: true,
  //   selfHandleResponse: true,
  //   onProxyRes: onProxyRes
  // }));

  app.use(
    createProxyMiddleware("/maximo/**", {
      target: "http://localhost:9081",
      headers: {
        MAXAUTH: "d2lsc29uOndpbHNvbg==",
      },
      changeOrigin: true,
    })
  );
  masProxy(app);
};
