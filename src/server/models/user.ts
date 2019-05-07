import { Column, Model, Table, DataType, NotEmpty, HasMany, ForeignKey } from 'sequelize-typescript'
import Order from './order'

@Table({
  timestamps: true,
  tableName: 'users'
})
class User extends Model<User> {
  @NotEmpty
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: ''
  })
  name!: string

  @NotEmpty
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: 0
  })
  password!: string

  @HasMany(() => Order)
  orders!: Order[]
}

export default User
