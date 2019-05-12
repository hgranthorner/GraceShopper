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
    return Order.findOne({
      where: {
        userId,
        status: Status.Cart
      }
    })
      .then(async orderCart => {
        let cart
        if (!orderCart) {
          console.log(`cannot find cart for userId ${userId}: creating one`)
          cart = await Order.create({ userId, status: Status.Cart })
        } else cart = orderCart
        // else {
        //   cart = orders.find(order => order.status === Status.Cart)
        //   if (!cart) {
        //     console.log(`cannot find cart for userId : creating one`)
        //     cart = await Order.create({ userId, status: Status.Cart })
        //   }
        // }
        return cart
      })
      // 4. find existing ordersProduct instance and increase quantity by quantity.
      // 5. if no existing ordersProduct instance, create instance.
      .then(cart => {
        // cart = order with status cart
        return OrdersProducts.findAll({
          where: {
            orderId: cart.id,
            status: Status.Cart
          }
        })
          .then(async (userOrderCart) => {
            // userOrderCart is the orderProducts for the user's cart.
            // If the productId exists, add quantity, else create product with that qty.
            let foundProductFromCart = userOrderCart.find(orderProdLineItem => orderProdLineItem.productId === productId)
            if (!foundProductFromCart) {
              // product does not exist in cart. add product to order
              return await OrdersProducts.create({ orderId: cart.id, productId: productId, quantity: quantity })
            } else {
              // product exists in cart. increase quantity
              return await foundProductFromCart.update({ quantity: foundProductFromCart.quantity + quantity })
            }
          })
          .then(() => cart.id)
      })
      .catch((e: Error) => console.log(`Failed to add to cart. \n${e}`))
  }

  // Removes a product from cart. if optional paramter removeAll=true, then it removes all quantity of this item from the cart
  static decreaseProductQuantityFromCart(userId: number, productId: number, removeAll: boolean = false) {
    // find user's cart
    return Order.findOne({
      where: {
        userId: userId,
        status: Status.Cart
      }
    })
      .then(cart => {
        if (!cart) throw new Error(`User ${userId} has no cart. Should not empty a nonexistant cart.`)
        return OrdersProducts.findOne({
          where: {
            orderId: cart.id,
            productId: productId
          }
        })
          .then(async (orderProductLineItem) => {
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
        })
          .then(cartItems => {
            return cartItems.map(cartItem => cartItem.destroy())
          })
      })
      .catch(er => console.log(`Failed to empty cart.\n${er}`))
  }
}

export default Order