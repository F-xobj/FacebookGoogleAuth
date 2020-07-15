const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const configuration = require('./configuration/index')

mongoose
  .connect(configuration.MONGOOSE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connect'))
  .catch((err) => console.log('err', err))

const MDB = mongoose.connection
MDB.on('error', console.error.bind(console, 'MongoDB connection error:'))
const app = express()
app.use(cors())

//Middleware

app.use(morgan('dev'))
app.use(bodyParser.json())

//Routes
app.use('/users', require('./routes/users'))
//start server

const port = process.env.PORT || 3001
app.listen(port, (req, err) => {
  console.log(`Server run at port ${port}`)
})
