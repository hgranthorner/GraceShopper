import Order, { Status } from '../server/models/order'
import Product, { ProductWithQuantity } from '../server/models/product'
import User from '../server/models/user'
import { sync } from '../server/db'
import { Sequelize } from 'sequelize/types'
import Category from '../server/models/category'
import OrdersProducts from '../server/models/ordersProducts'

let sequelize: Sequelize

describe('our order model', () => {
  beforeAll(() => {
    return sync({ force: true }).then(conn => {
      sequelize = conn
    })
  })
  afterAll(() => {
    sequelize.close()
    console.log('Exited connection successfully!')
    return
  })

  test('an order can be created', () => {
    return User.create({ name: 'moe', password: '12345' })
      .then(user => {
        return Order.create({ userId: user.id, status: Status.Cart })
      })
      .then(order => expect(order.id).toEqual(1))
  })
  test('an order can have products', () => {
    return Category.create({ name: 'salad', description: 'yum' })
      .then(category => Product.create({ name: 'egg', price: 1, quantity: 1, description: 'a ', categoryId: category.id }))
      .then(async product => {
        const order = await Order.create({ userId: 1, status: Status.Cart })
        await OrdersProducts.create({ orderId: order.id, productId: product.id, quantity: 1 })
        return order
      })
      .then(order => Order.findAll({ include: [Product] }))
      .then(orders => {
        expect(orders[0]).toHaveProperty('products')
        // const product: ProductWithQuantity = orders[0].products[0]
        // expect(product.OrdersProducts.quantity).toBe(1)
      })
  })
})
