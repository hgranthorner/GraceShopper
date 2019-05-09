import { Sequelize } from 'sequelize-typescript'

const dbName = process.env.DATABASE_URL || 'postgres://localhost:5432/graceshopper'

console.log(`Here's my db name! RIGHT HERE!\n${dbName}`)

const conn = new Sequelize(dbName, {
  logging: false,
  modelPaths: [`${__dirname}/models`]
})

interface SeqOptsObj {
  force?: boolean
}

type Sync = (optsObj?: SeqOptsObj) => Promise<Sequelize>
const sync: Sync = (optsObj = {}) => {
  return new Promise((res, rej) => {
    conn
      .sync(optsObj)
      .then(() => {
        res(conn)
      })
      .catch((e: Error) => {
        rej(e)
      })
  })
}

export default conn
export { sync }
