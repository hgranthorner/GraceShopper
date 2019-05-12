import express = require('express')
import Category from '../../models/category'
const route = express.Router()

// get all categories
route.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Category.findAll()
    .then(categories => res.send(categories))
    .catch(next)
})
// get products associated with a category by id
route.get('/:id/products', (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
})

export default route
