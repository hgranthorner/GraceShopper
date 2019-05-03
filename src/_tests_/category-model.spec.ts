import Category from '../server/models/category'
import Product from '../server/models/product'
import { sync } from '../server/db'
import { Sequelize } from 'sequelize-typescript'
import { executionAsyncId } from 'async_hooks'
import { promises } from 'fs'

let sequelize: Sequelize

describe('our category model', () => {
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

  test('a category model creates a category', () => {
    return Category.create({ name: 'foo', description: 'this is foo' }).then(
      product => expect(product.name).toBe('foo')
    )
  })

  test('a category can have an associtated product', () => {
    return Category.create({ name: 'foo', description: 'this is foo' })
      .then(category => {
        return Product.create({
          name: 'bar',
          price: 1.5,
          description: 'this is bar',
          categoryId: category.id
        })
      })
      .then(product => expect(product.categoryId).toEqual(2))
  })

  test('a category can have many associated products', () => {
    return Category.create({ name: 'foo', description: 'this is foo' })
      .then(category => {
        return Promise.all([
          Product.create({
            name: 'bar',
            price: 3.25,
            description: 'this is bar',
            categoryId: category.id
          }),
          Product.create({
            name: 'bazz',
            price: 1.35,
            description: 'this is bazz',
            categoryId: category.id
          })
        ])
      })
      .then(([bar, bazz]) => expect(bar.categoryId).toEqual(bazz.categoryId))
  })
})
