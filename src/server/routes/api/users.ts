import express = require('express')
import User from '../../models/user'
import Order from '../../models/order'
import OrdersProducts from '../../models/ordersProducts'
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

route.post('/:userId/orders', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('post route hit')
  // Check if a user is logged in.
  console.log(req.params.userId)
  if (req.params.userId === '-1') {
    console.log('no user logged in')
    // No user. We have ourselves a guest. Guest
    // will add items to cart and the data will
    //be stored on the session.

    // Check if the session already contains
    // an order.
    if (!req.session!.order) {
      // If there is no order on the session, initialize one.
      // Subsequent selected products will be stored here.
      req.session!.order = []
    }
    req.session!.order.push(req.body)
    console.log(req.session!.order)
    res.status(200).send(`${req.session!.order.length}`)
  } else {
    console.log('found a user')
    // We have a logged in user, and a selected product.
    const userId = req.params.userId
    console.log(userId)
    const product = req.body
    // Find the associated order that exists as an open cart,
    // and add to that cart.
    Order.addToCart(userId, product.id)
      .then(cartId => OrdersProducts.findAll({ where: { orderId: cartId } }))
      .then(orderProducts => res.status(200).send(`${orderProducts.length}`))
      .catch(next)
  }
})

export default route
