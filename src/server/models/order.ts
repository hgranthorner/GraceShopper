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
    type: DataType.BOOLEAN
  })
  isCart!: boolean

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  userId!: number

  @BelongsTo(() => User)
  user!: User

  @HasMany(() => Product)
  products!: Product[]
}

export default Order
