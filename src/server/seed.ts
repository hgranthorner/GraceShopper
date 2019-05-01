// referring to the directory automatically redirects to the directory's index file
import User from './models/user'
import Product from './models/product'
import Category from './models/category'
import conn from './db'
import { sync } from './db'

export default () => {
  return conn
    .sync({ force: true })
    .then(() => {
      const user = new User({ name: 'Bailie', age: 10 })
      return user.save()
    })
    .then(() => {
      console.log('Completed seeding.')
    })
    .catch((e: Error) => console.log(`Failed to seed. Here's why:\n${e}`))
}
