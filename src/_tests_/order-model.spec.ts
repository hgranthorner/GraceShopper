import Order from '../server/models/order'
import Product from '../server/models/product'
import User from '../server/models/user'
import { sync } from '../server/db'
import { Sequelize } from 'sequelize/types'
import Category from '../server/models/category'

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
        return Order.create({ userId: user.id })
      })
      .then(order => expect(order.id).toEqual(1))
  })
  // test('an order can have associated products', async () => {
  //   const category = await Category.create({
  //     name: 'quog',
  //     description: 'this is quog'
  //   })
  //   const user = await User.create({ name: 'larry', password: '12345' })
  //   const order = await Order.create({ userId: user.id })
  //   const products = await Promise.all([
  //     Product.create({
  //       name: 'foo',
  //       price: 2,
  //       description: 'this is foo',
  //       categoryId: category.id,
  //       orderId: order.id
  //     }),
  //     Product.create({
  //       name: 'bar',
  //       price: 2,
  //       description: 'this is bar',
  //       categoryId: category.id,
  //       orderId: order.id
  //     })
  //   ])

  //   return Order.findOne({
  //     where: {
  //       id: order.id
  //     },
  //     include: [
  //       {
  //         model: Product
  //       }
  //     ]
  //   }).then(order => expect(order!.products).toHaveLength(2))
  // })
})
