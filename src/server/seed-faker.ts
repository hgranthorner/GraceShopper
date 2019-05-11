import * as faker from 'faker'

// console.log(faker.name.findName())

// referring to the directory automatically redirects to the directory's index file
import User from './models/user'
import Product from './models/product'
import Category from './models/category'
import conn from './db'
import Order, { Status } from './models/order';

// creates fake users default quantity of 20.
type fakeUsers = (count: number) => Array<Promise<User>>
const fakeUsers = (count: number = 20) => {
  const result: User[] = []
  for (let i = 0; i < count; ++i) {
    result.push(
      new User({
        name: faker.internet.userName(),
        password: faker.internet.password()
      })
    )
  }
  return result
}

// creates fake Products. default quantity of 20 and randomly distributed into categories.
type fakeProducts = (
  count: number,
  categories: number
) => Array<Promise<Product>>
const fakeProducts = (count: number = 20, categories: number = 1) => {
  const result: Product[] = []
  for (let i = 0; i < count; ++i) {
    result.push(
      new Product({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.lorem.sentence(5).concat(),
        imageUrl: faker.image
          .image()
          .concat('/', Math.floor(Math.random() * 10).toString()),
        quantity: Math.floor(Math.random() * 10000),
        categoryId: Math.floor(Math.random() * categories) + 1
      })
    )
  }
  return result
}

// Creates fake categories, defaults to 5
type fakeCategories = (count: number) => Array<Promise<Category>>
const fakeCategories = (count: number = 5) => {
  const result: Category[] = []
  for (let i = 0; i < count; ++i) {
    result.push(
      new Category({
        name: faker.commerce.department(),
        description: faker.lorem.sentence(5)
      })
    )
  }
  return result
}

const categoriesLength = 5

conn
  .sync({ force: true })
  .then(() => {
    return Promise.all([
      ...fakeUsers().map(user => {
        user.save()
      })
    ])
  })
  // 
  .then(() => {
    return User.findByPk(1).then(user => {
      if (user) return (user.createCart())
    })
  })
  // 
  .then(() => {
    console.log('Completed seeding users.')
  })
  .then(() => {
    return Promise.all([
      [
        ...fakeCategories(categoriesLength).map(category => {
          category.save()
        })
      ]
    ])
  })
  .then((categories: any) => {
    console.log('Completed seeding categories.')
    return categories
  })
  .then((categories: any) => {
    return Promise.all([
      [
        ...fakeProducts(20, categoriesLength).map(product => {
          product.save()
        })
      ]
    ])
  })
  .then(() => {
    console.log('Completed seeding products.')
  })
  // .then(() => {
  //   return Order.create({ userId: 2, status: Status.Delivered })
  // })
  .catch((e: Error) => console.log(`Failed to seed. Here's why:\n${e}`))
