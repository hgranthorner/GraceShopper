import Category from "../server/models/category";
import Product from "../server/models/product";
import { sync } from "../server/db";
import { Sequelize } from "sequelize-typescript";
import { executionAsyncId } from "async_hooks";
import { promises } from "fs";

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

  test("a category model creates a category", () => {
    return Category.create({ name: "foo", description: "this is foo" }).then(
      product => expect(product.name).toBe("foo")
    );
  });

  test("a category can have an associtated product", () => {
    return Category.create({ name: "foo", description: "this is foo" })
      .then(category => {
        return Product.create({
          name: "bar",
          price: 1.5,
          description: "this is bar",
          categoryId: category.id
        });
      })
      .then(product => expect(product.categoryId).toEqual(2));
  });

  test("a category can have many associated products", () => {
    return Product.create({
      name: "bar",
      price: 2.5,
      description: "this is bar",
      categoryId: 2
    }).then(() => {
      return Category.findOne({
        where: {
          id: 2
        },
        include: [
          {
            model: Product
          }
        ]
      }).then(category => expect(category!.product).toHaveLength(2));
    });
  });
});
