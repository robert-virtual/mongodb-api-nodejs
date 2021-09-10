require('dotenv').config()
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const cors = require('cors')
const express = require('express')
const app = express()


// middlewares
app.use(express.json())
app.use(cors())

// routes
app.use('/api/users',usersRouter)
app.use('/api/posts',postsRouter)


app.set('port',process.env.PORT || 5000)


app.listen(app.get('port'),()=>{
    console.log(`server running http://localhost:${app.get('port')}...`)
})