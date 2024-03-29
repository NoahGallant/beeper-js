const csp = require('helmet-csp')

module.exports = csp({
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'"],
    connectSrc: [
      (req, res) => {
        const xfpHeader = req.headers['x-forwarded-proto']
        if (!xfpHeader || !xfpHeader.match(/^https/)) {
          return 'ws://' + req.headers['host']
        } else {
          return 'wss://' + req.headers['host']
        }
      }
    ],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    styleSrc: ["'self'", "'unsafe-inline'"]
  }
})
