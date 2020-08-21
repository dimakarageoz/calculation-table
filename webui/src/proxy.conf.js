const host = process.env.PROXY_HOST || 'localhost';
const port = process.env.PROXY_PORT || 8080;

const PROXY_CONFIG = {
  "/api/*": {
    "target": `http://${host}:${port}`,
    "secure": false,
    "logLevel": "debug"
  }
};

module.exports = PROXY_CONFIG;
