const express = require('express')
const { join } = require('path')
require('dotenv').config()

const app = express()
const PORT = 3001
const assets = join(__dirname, 'build')

// Serve static files from ./build
app.use(express.static(assets))

// Top level route
app.get('/', (request, response) => {
  console.log('Servin it up!')
  response.sendFile(join(__dirname, '/views/index.html'))
})

// Server listener
app.listen(PORT, (err) => {
  if (err) {
    return console.log('Something bad happened', err)
  }
  console.log(`server is listening on ${PORT}`)
})