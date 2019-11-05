const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express();
const PORT = process.env.PORT || 8080;
// Route requires
const user = require('./routes/user')


app.use(morgan('dev'))
app.use(
    express.urlencoded({
        extended: false
    })
)
app.use(express.json())

app.use(
    session({
        secret: 'brown-chicken',
        store: new MongoStore({ mongooseConnection: dbConnection}),
        resave: false,
        saveUninitialized: false
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/user', user)

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
    
})
