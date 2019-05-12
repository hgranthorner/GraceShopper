import express = require('express')
import User from '../../models/user'
import Order from '../../models/product'
const route = express.Router()

// get orders associated with a user by id
route.get('/:id/orders', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Order
      }
    ]
  })
    .then(user => res.send(user))
    .catch(next)
})

export default route
