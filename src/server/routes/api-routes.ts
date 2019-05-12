import express = require('express')
import * as routes from './api'

const route = express.Router()

route.use('/products', routes.productRoutes)
route.use('/users', routes.userRoutes)
route.use('/categories', routes.categoryRoutes)
route.use('/orders', routes.orderRoutes)

export default route
