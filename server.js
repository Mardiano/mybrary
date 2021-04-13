if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//Mongoose itu kek pake default accesssing data dari db, jadi bisa aja jadi ngga
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewURLParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error("Connected to Mongoose"))

//jadi kek param 1 itu buat path routernya, yang satunya tu buat fungsi handlingnya
app.use('/', indexRouter)

//Jadi kek default port 3000
app.listen(process.env.PORT || 3000)