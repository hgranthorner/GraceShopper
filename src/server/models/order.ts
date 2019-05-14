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
    return Order.findOne({
      where: {
        userId,
        status: Status.Cart
      }
    })
      .then(async orderCart => {
        let cart
        if (!orderCart) {
          cart = await Order.create({ userId, status: Status.Cart })
        } else cart = orderCart
        return cart
      })
      .then(cart => {
        return OrdersProducts.findAll({
          where: {
            orderId: cart.id
          }
        })
          .then(async userOrderCart => {
            let foundProductFromCart = userOrderCart.find(orderProdLineItem => orderProdLineItem.productId === Number(productId))
            if (!foundProductFromCart) {
              return await OrdersProducts.create({ orderId: cart.id, productId: productId, quantity: quantity })
            } else {
              return await foundProductFromCart.update({ quantity: foundProductFromCart.quantity + quantity })
            }
          })
          .then(() => {
            return cart.id
          })
      })
      .catch((e: Error) => console.log(`Failed to add to cart. \n${e}`))
  }

  // Decreases a product quanttiy from cart. if optional paramter removeAll=true, then it removes all quantity of this item from the cart
  static decreaseProductQuantityFromCart(userId: number, productId: number, removeAll: boolean = false) {
    // find user's cart
    return Order.findOne({
      where: {
        userId: userId,
        status: Status.Cart
      }
    }).then(cart => {
      if (!cart) throw new Error(`User ${userId} has no cart. Should not empty a nonexistant cart.`)
      return OrdersProducts.findOne({
        where: {
          orderId: cart.id,
          productId: productId
        }
      })
        .then(async orderProductLineItem => {
          if (!orderProductLineItem) throw new Error(`Product ${productId} does not exist in cart.`)
          if (orderProductLineItem.quantity === 1 || removeAll) return await orderProductLineItem.destroy()
          return await orderProductLineItem.update({ quantity: orderProductLineItem.quantity - 1 })
        })
        .catch(er => console.log(`Failed to ${removeAll ? 'delete' : 'decrement'} product ${productId} from ${userId}'s cart.`))
    })
  }

  static emptyCart(userId: number) {
    // removes all items from a user's cart.
    // finds a user's cart. removes all associated orderProduct
    // delete the order with status cart
    return Order.findOne({
      where: {
        userId: userId,
        status: Status.Cart
      }
    })
      .then(cart => {
        if (!cart) throw new Error(`User ${userId} has no cart. Should not empty a nonexistant cart`)
        return OrdersProducts.findAll({
          where: {
            orderId: cart.id
          }
        }).then(cartItems => {
          return cartItems.map(cartItem => cartItem.destroy())
        })
          .then(() => cart.destroy())
      })
      .catch(er => console.log(`Failed to empty cart.\n${er}`))
  }
  static checkoutCart(userId: number) {
    return Order.findOne({ where: { userId, status: Status.Cart } })
      .then(order => {
        if (order) order.update({ status: Status.Processing })
        else throw new Error('Could not find cart for checkout.')
      })
      .catch((e: Error) => console.log(`Failed to checkout.\n${e}`))
  }
}

export default Order
