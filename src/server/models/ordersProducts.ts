import {
    Column,
    Model,
    Table,
    ForeignKey,
} from 'sequelize-typescript'
import Product from './product'
import Order from './order';

@Table({
    timestamps: true,
    tableName: 'ordersProducts'
})
class OrdersProducts extends Model<OrdersProducts> {
    @ForeignKey(() => Product)
    @Column
    productId!: number;

    @ForeignKey(() => Order)
    @Column
    orderId!: number;
}

export default OrdersProducts
