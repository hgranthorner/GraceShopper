import * as faker from 'faker'

// console.log(faker.name.findName())

// referring to the directory automatically redirects to the directory's index file
import User from './models/user'
import Product from './models/product'
import Category from './models/category'
import conn from './db'

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

conn
  .sync({ force: true })
  .then(() => {
    return Promise.all([
      new User({ name: 'Bailie', age: 10 }).save(),
      new User({ name: 'Dan', age: 20 }).save(),
      new User({ name: 'Grant', age: 30 }).save(),
      [
        ...fakeUsers().map(user => {
          user.save()
        })
      ]
    ])
  })
  .then(() => {
    console.log('Completed seeding users.')
  })
  .then(() => {
    return Promise.all([
      new Category({
        name: 'Electronics',
        description: 'sweet zip zaps'
      }).save(),
      new Category({
        name: 'Household',
        description: 'clean that ish up'
      }).save(),
      new Category({ name: 'Cars', description: 'vroom vroom' }).save()
    ])
  })
  .then(() => {
    console.log('Completed seeding categories.')
  })
  .then(() => {
    return Promise.all([
      new Product({
        name: 'Phone',
        price: 5,
        description: 'ring ring',
        imageUrl: '',
        quantity: 1,
        categoryId: 1
      }).save(),
      new Product({
        name: 'TV',
        price: 10,
        description: 'zombify your brain for fun',
        imageUrl: '',
        quantity: 2,
        categoryId: 1
      }).save(),
      new Product({
        name: 'Headphones',
        price: 100,
        description: 'literally ignore the rest of the world',
        imageUrl: '',
        quantity: 3,
        categoryId: 1
      }).save(),
      new Product({
        name: 'Glad',
        price: 5,
        description: 'get glad',
        imageUrl: '',
        quantity: 1,
        categoryId: 2
      }).save(),
      new Product({
        name: 'Vacuum',
        price: 10,
        description: 'vroom',
        imageUrl: '',
        quantity: 2,
        categoryId: 2
      }).save(),
      new Product({
        name: 'Sponge',
        price: 100,
        description: 'squish squish',
        imageUrl: '',
        quantity: 3,
        categoryId: 2
      }).save(),
      new Product({
        name: 'Audi',
        price: 1000,
        description: 'fancy a$$ bish',
        imageUrl: '',
        quantity: 3,
        categoryId: 3
      }).save(),
      new Product({
        name: 'Toyota',
        price: 100,
        description: 'tryna drive uber',
        imageUrl: '',
        quantity: 3,
        categoryId: 3
      }).save(),
      new Product({
        name: 'Tesla',
        price: 100,
        description: 'I love Musk',
        imageUrl: '',
        quantity: 3,
        categoryId: 3
      }).save()
    ])
  })
  .then(() => {
    console.log('Completed seeding products.')
  })
  .catch((e: Error) => console.log(`Failed to seed. Here's why:\n${e}`))
