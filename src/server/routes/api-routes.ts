import express = require('express')
import User from '../models/user'
import Product from '../models/product'
import Category from '../models/category'

const route = express.Router()

route.get('/users', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next)
})

route.get('/products', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next)
})

route.get('/categories', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Category.findAll()
    .then(categories => res.send(categories))
    .catch(next)
})

export default route
