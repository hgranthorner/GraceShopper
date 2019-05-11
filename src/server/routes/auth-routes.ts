import express = require('express')
import User from '../models/user'
import Order from '../models/order'
import Product from '../models/product'
const router = express.Router()

router.put('/login', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  User.findOne({
    where: {
      name: req.body.name,
      password: req.body.password
    }
  })
    .then(async user => {
      try {
        if (!user) {
          res.sendStatus(401)
        }
        if (req.session!.order) {
          const userId: number = user!.id
          const order = req.session!.order
          await Order.addToCart(userId, order[0].id)
          await (async function loop() {
            for (let i = 1; i < order.length; i++) {
              await Order.addToCart(userId, order[i].id)
            }
          })()
          delete req.session!.order
        }
        res.send(user)
      } catch (e) {
        console.log('deleting order from req.session')
        delete req.session!.order
        console.log(e)
        next()
      }
    })
    .catch(next)
})

export default router
