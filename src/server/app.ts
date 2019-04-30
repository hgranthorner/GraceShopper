// Typically, you should be able to use "import ... from ..." syntax
// However, built in modules (like path) and modules that are built with older version in mind (express)
// need special syntaxes for import, like you see below.

import express = require('express')
import * as path from 'path'
const app: express.Application = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')))

app.get('/boo', (req, res, next) => {
  res.send('Heres a sample route')
})

export default app
