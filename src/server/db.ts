import { Sequelize } from 'sequelize-typescript'

// @ts-ignore
const conn = new Sequelize({
  database: process.env.DATABASE_URL || 'graceshopper',
  dialect: 'postgres',
  logging: process.env.DATABASE_LOGGING || false,
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
