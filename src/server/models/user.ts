import { Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({
  timestamps: true,
  tableName: 'users'
})
class User extends Model<User> {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    defaultValue: ''
  })
  name!: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
  age!: number
}

export default User
