import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../../../store'
import { Product } from 'src/@types/redux-types'
import ProductItem from './ProductItem'

const mapStateToProps = ({ products }: { products: Array<Product> }) => {
  return { products }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchProducts: () => dispatch(fetchProducts())
})

const ProductList = ({
  products,
  fetchProducts
}: {
  products: Array<Product>
  fetchProducts: any
}) => {
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      <ul>
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
