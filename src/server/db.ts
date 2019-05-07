import { Sequelize } from 'sequelize-typescript'

const dbName = process.env.DATABASE_URL || 'graceshopper'

// @ts-ignore
const conn = new Sequelize(dbName, {
  dialect: 'postgres',
  logging: process.env.DATABASE_LOGGING || false,
  modelPaths: [`${__dirname}/models`],
  dialectOptions: {
    ssl: true
  }
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
