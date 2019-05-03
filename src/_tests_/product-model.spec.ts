import Product from '../server/models/product'
import { sync } from '../server/db'
import { Sequelize } from 'sequelize-typescript'
import { executionAsyncId } from 'async_hooks'
import Category from '../server/models/category'

let sequelize: Sequelize

describe('our product model', () => {
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

  test('a product can be created', () => {
    return Product.create({
      name: 'foo',
      price: 3.25,
      description: 'this is foo',
      categoryId: 1
    }).then(product => expect(product.name).toBe('foo'))
  })

  test('a product cannot have an empty string as a name', () => {
    return Product.create({
      name: 'foo',
      price: 3.25,
      description: 'this is foo'
    })
      .then(() => {
        throw new Error('product name cannot be empty')
      })
      .catch(ex => expect(ex.message).not.toBe('product name cannot be empty'))
  })

  test('a product has an associated category', () => {
    return Category.create({ name: 'bar', description: 'this is bar' }).then(
      category => {
        return Product.create({
          name: 'quog',
          price: 2.25,
          description: 'this is quog',
          categoryId: category.id
        }).then(product => expect(product.categoryId).toBe(1))
      }
    )
  })
})
