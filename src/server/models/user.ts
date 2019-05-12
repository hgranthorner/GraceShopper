import {
  Column,
  Model,
  Table,
  DataType,
  NotEmpty,
  HasMany,
  ForeignKey
} from 'sequelize-typescript'
import Order, { Status } from './order'

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

  static createUser = async ({
    name,
    password
  }: {
    name: string
    password: string
  }) => {
    const user = await User.findOne({
      where: {
        name
      }
    })

    if (!user) {
      return User.create({ name, password })
    } else {
      throw new Error(`Username ${user.name} already exists!`)
    }
  }
}

export default User
