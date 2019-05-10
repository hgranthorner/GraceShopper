import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany
} from 'sequelize-typescript'
import Category from './category'
import Order from './order'
import OrdersProducts from './ordersProducts'

@Table({
  timestamps: true,
  tableName: 'products'
})
class Product extends Model<Product> {
  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  name!: string

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  price!: number

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string

  @Column({
    type: DataType.TEXT
  })
  imageUrl!: string

  @Column({
    type: DataType.INTEGER
  })
  quantity!: number

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  categoryId!: number

  @BelongsTo(() => Category)
  category!: Category
<<<<<<< HEAD

  @BelongsToMany(() => Order, () => OrdersProducts)
  orders!: Order[];
=======
>>>>>>> 733c1f30bc82988afd394b652f104c0ab55e1e67
}

export default Product
