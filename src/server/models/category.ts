import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript'
import Product from './product'

@Table({
  timestamps: true,
  tableName: 'categories'
})
class Category extends Model<Category> {
  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  name!: string

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description!: string

  @HasMany(() => Product)
  product!: Product
}

export default Category
