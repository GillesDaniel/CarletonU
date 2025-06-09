const { existsSync } = require("fs");
const path = require("path");

const maximoURL = "http://localhost:9081/maximo/oslc/";
const maxauth = "d2lsc29uOndpbHNvbg==";

// Used when using the -c capture option to proxy and capture network requests
const getProxyAPIs = () => {
  const APIS = {
    "/oslc/": {
      target: maximoURL,
      headers: {
        MAXAUTH: maxauth,
      },
      changeOrigin: true,
    },
    "/maximo/oslc/": {
      target: maximoURL,
      headers: {
        MAXAUTH: maxauth,
      },
      changeOrigin: true,
    },
  };

  return APIS;
};

const configureApp = (app, express) => {
  const fspath = path.resolve("./cypress/maximo/ui/");
  console.log(
    "Setting static maximo resources for ",
    fspath,
    existsSync(fspath)
  );

  app.use("/maximo/ui", express.static(fspath));
};

module.exports = { getProxyAPIs: getProxyAPIs, configureApp: configureApp };
