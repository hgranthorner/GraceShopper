import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Product } from 'src/@types/redux-types'
import { fetchProductsByCategory } from '../../../store'

const mapStateToProps = ({ products }: { products: Array<Product> }) => {
  return { products }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchProducts: (id: number) => dispatch(fetchProductsByCategory(id))
})

const ToggleProductView = ({
  categoryId,
  products,
  fetchProducts
}: {
  categoryId: number
  products: Array<Product>
  fetchProducts: any
}) => {
  useEffect(() => {
    fetchProducts(categoryId)
  }, [])

  return (
    <div>
      <ul>
        {products.map(product => (
          <li>{product.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleProductView)
