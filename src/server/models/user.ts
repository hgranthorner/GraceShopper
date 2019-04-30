import {Column, Model, Table} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "user"
})
class User extends Model<User> {
  @Column({
    allowNull: false,
    defaultValue: '',
  })
  name!: string;

  @Column({
    allowNull: false,
    defaultValue: 0,
  })
  age!: number;
}

export default User;
