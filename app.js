require('dotenv').config()


const express = require('express')
const cors = require('cors')
// const userRouter = require('./routers/user')
// const itemRouter =require('./routers/item')
// const cartRouter = require('./routers/cart')
const mongoose = require('mongoose')
// require('./db/mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))
// const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())

const userRouter = require('./routers/user')
const itemRouter = require('./routers/item')
const cartRouter = require('./routers/cart')

app.use('/users',userRouter)
app.use('/items',itemRouter)
app.use('/cart',cartRouter)

app.listen(process.env.PORT||3000, () => console.log('Server running'))