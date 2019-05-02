import Product from "../server/models/product";
import { sync } from "../server/db";
import { Sequelize } from "sequelize-typescript";
import { executionAsyncId } from "async_hooks";

let sequelize: Sequelize;

describe("our product model", () => {
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

  test("a product can be created", () => {
    return Product.create({ name: "foo" });
  });
});
