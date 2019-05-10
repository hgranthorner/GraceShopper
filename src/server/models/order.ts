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

enum Status {
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
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
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
  products!: Product[];
  // To access the through-table instance (instanceOf BookAuthor in the upper example) type safely:
  // the type need to be set up manually.
  // products:Array<Product & {OrdersProducts:OrdersProducts}>;
}

export default Order
