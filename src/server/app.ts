// Typically, you should be able to use "import ... from ..." syntax
// However, built in modules (like path) and modules that are built with older version in mind (express)
// need special syntaxes for import, like you see below.

import express = require('express')
import * as path from 'path'
import { apiRoutes, authRoutes } from './routes'
const session = require('express-session')
const app: express.Application = express()

app.use(express.json())
app.use(
  express.static(path.join(__dirname, '..', '..', 'src', 'client', 'dist'))
)
app.use(
  session({
    secret: 'this is not a very secure secret...',
    resave: false,
    saveUninitialized: false
  })
)
app.use('/api', apiRoutes)
app.use('/auth', authRoutes)

app.get('/boo', (req, res, next) => {
  res.send('Heres a sample route')
})

export default app
