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

  static addToCart(userId: number, productId: number, quantity: number = 1) {
    console.log(`Add to Cart: User|Product|Qty: ${userId}|${productId}|${quantity}`)
    // 1. no orders: make a first cart
    // 2. there are orders, but no cart: make a cart
    // 3. there is a cart, find one

    return Order.findAll({
      where: {
        userId,
        status: Status.Cart
      }
    })
      .then(async orders => {
        let cart
        if (orders.length === 0) {
          console.log(`cannot find order for userId ${userId}: creating one`)
          cart = await Order.create({ userId, status: Status.Cart })
        } else {
          cart = orders.find(order => order.status === Status.Cart)
          if (!cart) {
            console.log(`cannot find cart for userId : creating one`)
            cart = await Order.create({ userId, status: Status.Cart })
          }
        }
        return cart
      })
      // 4. find existing ordersProduct instance and increase quantity by quantity.
      // 5. if no existing ordersProduct instance, create instance.
      .then(cart => OrdersProducts.create({ orderId: cart.id, productId: productId, quantity: quantity }))
      .catch((e: Error) => console.log(`Failed to add to cart. \n${e}`))
  }

  static emptyCart(userId: number) {
    // removes all items from a user's cart.
    // finds a user's cart. removes all associated orderProduct 
    return Order.findOne({
      where: {
        userId: userId,
        status: Status.Cart
      }
    })
      .then(cart => {
        if (!cart) return new Error('User has no cart. Should not empty a nonexistant cart')
        console.log('cart:', cart.get())
        OrdersProducts.findAll({
          where: {
            orderId: cart.id
          }
        })
          .then((cartItems) => {
            cartItems.map(cartItem => {
              cartItem.destroy()
            })
          })
      })
      .catch(er => console.error(`Failed to empty cart. Error:\n${er}`))

  }

}

export default Order
