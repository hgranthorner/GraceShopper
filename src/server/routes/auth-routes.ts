import express = require('express')
import User from '../models/user'
import Order from '../models/order'
import Product from '../models/product'
const router = express.Router()

router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.session!.user) {
    res.send(req.session!.user)
  } else {
    res.sendStatus(204)
  }
})

router.delete('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.session!.user) {
    delete req.session!.user
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})

router.put('/login', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  User.findOne({
    where: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(async user => {
    try {
      if (!user) {
        res.sendStatus(401)
      }
      if (req.session!.order) {
        const userId: number = user!.id
        if (req.session!.order) {
          const order = req.session!.order
          await Order.addToCart(userId, order[0].id)
          await (async function loop() {
            for (let i = 1; i < order.length; i++) {
              await Order.addToCart(userId, order[i].id, order[i].OrdersProducts.quantity)
            }
          })()
          delete req.session!.order
        }
      }
      req.session!.user = user
      res.send(user)
    } catch (e) {
      delete req.session!.order
      console.log(e)
      next(e)
    }
  })
})

router.put('/users/:userId', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  User.update({ password: req.body.password }, { where: { id: req.params.userId } })
    .then(async () => {
      const user = await User.findOne({ where: { id: req.params.userId } })
      res.send(user)
    })
    .catch(next)
})

export default router
