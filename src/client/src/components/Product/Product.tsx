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
  console.log(product, match.params.id)
  return (
    <div className="d-flex justify-content-center">
      <p>Here goes the product-details.</p>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
