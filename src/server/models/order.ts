import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript'
import Product from './product'
import User from './user'

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

  @BelongsTo(() => User)
  user!: User

  @HasMany(() => Product)
  products!: Product[]

  static AddToCart = (product: Product, userId: number) => {
    return Order.findAll({ where: { userId } }).then(
      async (orders: Order[]) => {
        let cart
        if (orders.length === 0) {
          cart = await Order.create({ userId, isCart: true })
        } else {
          cart = orders.find(order => order.isCart)
          if (!cart) {
            cart = await Order.create({ userId, isCart: true })
          }
        }
      }
    )
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
