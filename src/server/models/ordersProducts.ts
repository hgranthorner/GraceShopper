import {
    Column,
    Model,
    Table,
    ForeignKey,
    DataType
} from 'sequelize-typescript'
import Product from './product'
import Order from './order'

@Table({
    timestamps: true,
    tableName: 'orders_products'
})
class OrdersProducts extends Model<OrdersProducts> {
    @ForeignKey(() => Product)
    @Column
    productId!: number

    @ForeignKey(() => Order)
    @Column
    orderId!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quantity!: number
}

export default OrdersProducts
