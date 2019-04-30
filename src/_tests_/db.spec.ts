import User from "../server/models/user";
import { sync } from '../server/db';
import { Sequelize } from "sequelize-typescript";

let sequelize: Sequelize;

describe("our models", () => {
  beforeAll(() => {
    return sync().then(conn => {
      sequelize = conn;
    })
  });
  afterAll(() => {
    return sequelize.close().then(() => {
      console.log('Exited connection successfully!');
    })
  });

  test("user model creates a user", () => {
    return User.create({ name: "moe" }).then(user =>
      expect(user.name).toBe("moe")
    );
  });
});
