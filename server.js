var express     = require('express')
var log4js      = require('log4js')
var mongoose    = require('mongoose')
var bodyParser  = require('body-parser')
var port        = require('./config/config').port
var dbUrl       = require('./config/config').mongo.url
var logger      = log4js.getLogger('Server')

// routes
var userRouter  = require('./routes/routes')
var prodRouter  = require('./routes/productRoutes')

logger.level    = 'debug'

var app         = express()

app.use(userRouter)
app.use(prodRouter)

mongoose.connect(dbUrl, function(err) {
    if(err)
        logger.fatal('Failed to connect to the database.')
    else
        logger.info('Connection to mongo db established.')
})

app.use(express.static(__dirname + '/public'))

app.listen(port, function() {
    logger.info('Listening on port: ' + port)
})