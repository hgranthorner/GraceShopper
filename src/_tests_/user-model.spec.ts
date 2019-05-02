import User from "../server/models/user";
import { sync } from "../server/db";
import { Sequelize } from "sequelize-typescript";
import { executionAsyncId } from "async_hooks";

let sequelize: Sequelize;

describe("our user models", () => {
  beforeAll(() => {
    return sync().then(conn => {
      sequelize = conn;
    });
  });
  afterAll(() => {
    sequelize.close();
    console.log("Exited connection successfully!");
    return;
  });

  test("user model creates a user", () => {
    return User.create({ name: "moe", password: "12345" }).then(user =>
      expect(user.name).toBe("moe")
    );
  });

  test("a user cannot have an empty string as a name", () => {
    return User.create({ name: "", password: "12345" })
      .then(() => {
        throw new Error("name must be a string");
      })
      .catch(ex => expect(ex.message).not.toBe("name must be a string"));
  });

  test("a user cannot have a name defined as null", () => {
    return User.create({ name: null, password: "12345" })
      .then(() => {
        throw new Error("name cannot be null");
      })
      .catch(ex => expect(ex.message).not.toBe("name cannot be null"));
  });
});
