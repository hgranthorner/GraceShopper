const request = require('supertest')
import app from '../server/app'
import { sync } from '../server/db'
import { Sequelize } from 'sequelize-typescript'
import Category from '../server/models/category'
import Product from '../server/models/product'
import User from '../server/models/user'
import Order, { Status } from '../server/models/order'
let sequelize: Sequelize

describe('test the root api path', () => {
  beforeAll(() => {
    return sync({ force: true })
      .then(conn => {
        sequelize = conn
      })
      .then(() => {
        return Promise.all([
          Category.create({ name: 'foo', description: 'this is foo' }),
          User.create({ name: 'moe', password: '12345' }),
          User.create({ name: 'larry', password: 'abcde' })
        ])
      })
      .then(([category, moe, larry]) => {
        return Promise.all([
          Product.create({
            name: 'bar',
            price: 2,
            description: 'this is bar',
            categoryId: category.id
          }),
          Product.create({
            name: 'bazz',
            price: 2,
            description: 'this is bazz',
            categoryId: category.id
          }),
          Order.create({ userId: moe.id, status: Status.Delivered }),
          Order.create({ userId: moe.id, status: Status.Cart })
        ])
      })
      .then(([bar, bazz, order]) => {
        bar.save()
        bazz.save()
      })
  })
  afterAll(() => {
    sequelize.close()
    console.log('Connection exited successfully!')
    return
  })

  test('GET products associated with a category', () => {
    return request(app)
      .get(`/api/categories/${1}/products`)
      .then((response: any) => {
        expect(response.body).toHaveProperty('products')
        expect(response.body.products).toHaveLength(2)
      })
  })

  test('GET all orders associated with a user', () => {
    return request(app)
      .get(`/api/users/${1}/orders`)
      .then((response: any) => {
        expect(response.body).toHaveLength(2)
        expect(response.body[0].userId).toBe(1)
      })
  })

  test('GET a single order associated with a user', () => {
    return request(app)
      .get(`/api/users/${1}/orders/${1}`)
      .then((response: any) => {
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('status')
      })
  })
})
