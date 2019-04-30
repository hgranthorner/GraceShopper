import { Sequelize } from "sequelize-typescript";

// @ts-ignore
const conn = new Sequelize({
  database: process.env.DATABASE_NAME || 'graceshopper_test',
  dialect: 'postgres',
  logging: process.env.DATABASE_LOGGING || false,
  modelPaths: [`${__dirname}/models`],
});

type Sync = () => Promise<Sequelize>;
const sync: Sync = () => {
  return new Promise((res, rej) => {
    conn
      .sync()
      .then(() => {
        res(conn);
      })
      .catch((e: Error) => {
        rej(e);
      })
  })
};

export {
  conn,
  sync,
};
