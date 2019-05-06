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
  // use below line to format price to include commas.
  // (12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
  return (
    <div className="row">
      {product.name}
      <h6>${product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} {product.quantity.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').slice(0, -2)} available</h6>
      <img alt={'A picture of the product'} src={product.imageUrl} className="col"></img>
      <p>{product.description}</p>

    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
