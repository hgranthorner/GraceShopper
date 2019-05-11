import express = require('express')
import User from '../models/user'
import Product from '../models/product'
import Category from '../models/category'
import Order from '../models/order'

const route = express.Router()

// get all users
route.get(
  '/users',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    User.findAll()
      .then(users => res.send(users))
      .catch(next)
  }
)
// get all products
route.get(
  '/products',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Product.findAll()
      .then(products => res.send(products))
      .catch(next)
  }
)
// get a single product
route.get(
  '/products/:id',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(product => res.send(product))
      .catch(next)
  }
)
// get all categories
route.get(
  '/categories',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Category.findAll()
      .then(categories => res.send(categories))
      .catch(next)
  }
)
// get products associated with a category by id
route.get(
  '/categories/:id/products',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Category.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product
        }
      ]
    })
      .then(category => res.send(category))
      .catch(next)
  }
)
// get products with a search term
route.get(
  '/products/search/:search',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Product.findAll() //
      .then((products: Array<Product>) => {
        const search = req.params.search.toUpperCase()
        const returnProds = products.filter(product =>
          product.name.toUpperCase().includes(search)
        )
        res.send(returnProds)
      })
      .catch(next)
  }
)

// get orders associated with a user by id
route.get(
  '/users/:id/orders',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
  }
)
// get a single order associated with a user
route.get(
  '/users/:userId/orders/:orderId',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    User.findOne({
      where: {
        id: req.params.userId
      },
      include: [
        {
          model: Order,
          where: {
            id: req.params.orderId
          }
        }
      ]
    })
      .then(user => res.send(user))
      .catch(next)
  }
)
// get a single product associated with a single order associated with a single user
route.get(
  '/users/:userId/orders/:orderId/products/:productId',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    User.findOne({
      where: {
        id: req.params.userId
      },
      include: [
        {
          model: Order,
          where: {
            id: req.params.orderId
          },
          include: [
            {
              model: Product,
              where: {
                id: req.params.productId
              }
            }
          ]
        }
      ]
    })
      .then(user => res.send(user))
      .catch(next)
  }
)

route.post(
  '/orders',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.session!.order) {
      req.session!.order = []
    }
    req.session!.order.push(req.body)
    res.sendStatus(200)
    next()
  }
)

route.post('/users/:id/orders', async (req, res, next) => {
  const order = await Order.addToCart(req.params.id, req.body.id)
  res.send(order)
})

export default route
