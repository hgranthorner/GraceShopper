import { Sequelize } from 'sequelize-typescript'

const dbName = process.env.DATABASE_URL || 'graceshopper'

console.log(`Here's my db name! RIGHT HERE!\n${dbName}`)
// @ts-ignore
const conn = new Sequelize(dbName)

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
