import { Column, Model, Table, DataType, HasMany, BelongsTo, ForeignKey, BelongsToMany, AllowNull } from 'sequelize-typescript'
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
    type: DataType.ENUM('cart', 'processing', 'shipped', 'delivered'),
    allowNull: false
  })
  status!: Status

  @BelongsTo(() => User)
  user!: User

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER
  })
  userId!: number
  @BelongsToMany(() => Product, () => OrdersProducts)
  products!: Product[]

  static addToCart(userId: number, productId: number) {
    return Order.findAll({
      where: {
        userId,
        status: Status.Cart
      }
    })
      .then(async orders => {
        let cart
        if (orders.length === 0) {
          console.log('cannot find order: creating one')
          cart = await Order.create({ userId, status: Status.Cart })
        } else {
          cart = orders.find(order => order.status === Status.Cart)
          if (!cart) {
            console.log('cannot find cart: creating one')
            cart = await Order.create({ userId, status: Status.Cart })
          }
        }
        return cart
      })
      .then(cart => OrdersProducts.create({ orderId: cart.id, productId: productId }))
      .catch((e: Error) => console.log(`Failed to add to cart. \n${e}`))
  }
}

export default Order
