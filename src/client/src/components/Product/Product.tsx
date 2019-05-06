import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProduct } from '../../store'
import { Product } from 'src/@types/redux-types'

const mapStateToProps = ({ product }: { product: Product }) => {
  return { product }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchProduct: (productId: number) => dispatch(fetchProduct(productId))
})

const Product = ({ product, fetchProduct, match }: { product: Product; fetchProduct: any; match: any }) => {
  useEffect(() => {
    fetchProduct(match.params.id)
  })
  return (
    <div className="d-flex justify-content-center">
      {product.name}
      <h6>${product.price}, {product.quantity} available</h6>
      <img alt={'A picture of the product'} src={product.imageUrl} className="col"></img>
      <p>{product.description}</p>

    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
