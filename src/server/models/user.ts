import { Column, Model, Table, DataType, NotEmpty } from 'sequelize-typescript'

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
}

export default User
