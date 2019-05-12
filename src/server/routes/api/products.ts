import express = require('express')
import Product from '../../models/product'
const route = express.Router()

// get all products
route.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next)
})
// get a single product
route.get('/:id', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Product.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(product => res.send(product))
    .catch(next)
})
// get products with a search term
route.get('/search/:search', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Product.findAll() //
    .then((products: Array<Product>) => {
      const search = req.params.search.toUpperCase()
      const returnProds = products.filter(product => product.name.toUpperCase().includes(search))
      res.send(returnProds)
    })
    .catch(next)
})

export default route
