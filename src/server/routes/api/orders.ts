import express = require('express')
import Order from '../../models/order'
const route = express.Router()

route.post('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.session!.order) {
    req.session!.order = []
  }
  req.session!.order.push(req.body)
  res.sendStatus(200)
  next()
})

export default route
