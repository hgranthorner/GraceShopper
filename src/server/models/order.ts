import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  BelongsToMany
} from 'sequelize-typescript'
import Product from './product'
import User from './user'
import OrdersProducts from './ordersProducts'

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

  @BelongsTo(() => User)
  user!: User

  @BelongsToMany(() => Product, () => OrdersProducts)
  products!: Product[];
  // products:Array<Product & {OrdersProducts:OrdersProducts}>;
}

export default Order
