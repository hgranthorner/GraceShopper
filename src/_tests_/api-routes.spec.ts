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
          return Promise.all([
              Category.create({ name: 'foo', description: 'this is foo' }),
              User.create({ name: 'moe', password: '12345' })
          ])
        })
        .then(([ category, user ]) => {
          return Promise.all([
            Product.create({
              name: 'bar',
              price: 2,
              description: 'this is bar',
              categoryId: category.id,
              userId: user.id
            }),
            Product.create({
              name: 'bazz',
              price: 2,
              description: 'this is bazz',
              categoryId: category.id,
              userId: user.id
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