import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  AllowNull
} from 'sequelize-typescript'
import Product from './product'
import User from './user'
import OrdersProducts from './ordersProducts'

export enum Status {
  Cart = 'cart',
  Processing = 'processing',
  Shipped = 'shipped',
  Delivered = 'delivered'
}

@Table({
  timestamps: true,
  tableName: 'orders'
})
class Order extends Model<Order> {
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  isCart!: boolean

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  userId!: number

  @Column({
    type: DataType.ENUM('cart', 'processing', 'shipped', 'delivered'),
    allowNull: false
  })
  status!: Status

  @BelongsTo(() => User)
  user!: User

  @BelongsToMany(() => Product, () => OrdersProducts)
  products!: Product[]
  // To access the through-table instance (instanceOf BookAuthor in the upper example) type safely:
  // the type need to be set up manually.
  // products:Array<Product & {OrdersProducts:OrdersProducts}>;

  static addToCart(userId: number, productId: number) {
    // 1. no orders: make a first cart
    // 2. there are orders, but no cart: make a cart
    // 3. there is a cart, find one
    Order.findAll({
      where: {
        userId: userId,
        status: Status.Cart
      }
    })
      .then(async orders => {
        let cart
        if (orders.length === 0) {
          cart = await Order.create({ userId, status: Status.Cart })
        } else {
          cart = orders.find(order => order.status === Status.Cart)
          if (!cart) {
            cart = await Order.create({ userId, status: Status.Cart })
          }
        }
        return cart
      })
      .then(cart =>
        OrdersProducts.create({ orderId: cart.id, productId: productId })
      )
      .catch((e: Error) => console.log(`Failed to add to cart. \n${e}`))
  }
}

export default Order

// there should only be 1 (at most) order with status = "Cart"
// add items to session object
// login: check if there is already an order with status === "cart"
// if true
//    user already has cart =>
//      find cart, add items to cart
//    user does not have an active cart =>
//      create a new order with status === "cart", add to that cart
