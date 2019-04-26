// import choo
var choo = require('choo')

// initialize choo
var app = choo()

const beeperStore = require('./stores/beeper')
const mainView = require('./views/main')

app.use(beeperStore)

app.route('/', mainView)

app.mount('body')
