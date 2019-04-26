const html = require('choo/html')

module.exports = {
  button,
  submit
}

function button (label, onclick) {
  return html`
    <button onclick=${onclick}>
      ${label}
    </button>
  `
}

function submit (label, onclick) {
  return html`
    <input type="submit" onclick=${onclick} value=${label}>
  `
}
