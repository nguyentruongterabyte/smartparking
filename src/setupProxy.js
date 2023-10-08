const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080', // Thay đổi thành URL của máy chủ API của bạn
      changeOrigin: true,
    }),
  );
};
