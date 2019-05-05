import express = require('express')
import User from '../models/user'
import Product from '../models/product'
import Category from '../models/category'

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
      .then(user => res.send(user))
      .catch(next)
  }
)

export default route
