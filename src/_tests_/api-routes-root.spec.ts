const request = require('supertest')
import app from '../server/app'
import { sync } from '../server/db'
import { Sequelize } from 'sequelize-typescript'
import Category from '../server/models/category'
import Product from '../server/models/product'
import User from '../server/models/user'
let sequelize: Sequelize

describe('test the root api path', () => {
  beforeAll(() => {
    return sync({ force: true })
      .then(conn => {
        sequelize = conn
      })
      .then(() => {
        return Category.create({ name: 'foo', description: 'this is foo' })
      })
      .then(category => {
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
          User.create({ name: 'moe', password: '12345' })
        ])
      })
  })
  afterAll(() => {
    sequelize.close()
    console.log('Connection exited successfully!')
    return
  })

  test('we can GET users', () => {
    return request(app)
      .get('/api/users')
      .then((response: any) => {
        expect(response.statusCode).toBe(200)
        expect(response.body[0]).toHaveProperty('name')
        expect(response.body[0]).toHaveProperty('password')
        expect(response.body[0].name).toBe('moe')
        expect(response.body[0].password).toBe('12345')
      })
  })

  test('we can GET products', () => {
    return request(app)
      .get('/api/products')
      .then((response: any) => {
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(2)
      })
  })

  test('we can GET categories', () => {
    return request(app)
      .get('/api/categories')
      .then((response: any) => {
        expect(response.statusCode).toBe(200)
        expect(response.body[0]).toHaveProperty('name')
        expect(response.body[0]).toHaveProperty('description')
        expect(response.body[0].name).toBe('foo')
        expect(response.body[0].description).toBe('this is foo')
      })
  })
})
