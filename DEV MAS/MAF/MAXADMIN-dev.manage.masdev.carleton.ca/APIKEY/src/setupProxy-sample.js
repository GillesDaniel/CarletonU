/*
 * Licensed Materials - Property of IBM
 *
 * 5737-M66
 *
 * (C) Copyright IBM Corp. 2020 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */


// istanbul ignore file
// https://github.com/chimurai/http-proxy-middleware
const proxy = require('http-proxy-middleware');

// change user variable to change users, options are marcia or wilson for now
const user = 'maxadmin'

const creds = {
  wilson: 'd2lsc29uOndpbHNvbg==',
  maxadmin: 'bWF4YWRtaW46bWF4YWRtaW4='
}

const userCreds = creds[user]

module.exports = function(app) {
  app.use(
    proxy.createProxyMiddleware('/maximo/**', {
      target: 'http://localhost:7001',
      headers: {
        MAXAUTH: userCreds
      },
      changeOrigin: true	  
    })
  );
};


// module.exports = function(app) {
//   app.use(
//     proxy.createProxyMiddleware('/maximo/**', {
//       target: 'http://health-team21.fyre.ibm.com:9084',
//  //     pathRewrite: {'^/maximo/oslc': '/maximo_123/oslc'},
//       headers: {
//         MAXAUTH: 'amVubjpqZW5u'
//       },
//       changeOrigin: true	
//     })
//   );
// };    


// module.exports = function(app) {
//     app.use(
//       proxy.createProxyMiddleware('/maximo/oslc/**', {
//         changeOrigin: true,
//         secure: false,
//         target: 'https://masws.health.ivt09rel86.ivt.suite.maximo.com',
//         pathRewrite: {'^/maximo/oslc': '/maximo/api'},
//         // istanbul ignore next
//         onProxyReq: function(proxyReq, req, res) {
//             proxyReq.setHeader('apikey', '7n1okjdknc3e5nhptlmalj7vj5j1ak5ljppehd2t')
//         }
//     })
//   );
// };