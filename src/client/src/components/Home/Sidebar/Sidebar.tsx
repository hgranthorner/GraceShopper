import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Category } from 'src/@types/redux-types'
import { fetchCategories, fetchProductsByCategory } from '../../../store'

const mapStateToProps = ({ categories }: { categories: Array<Category> }) => ({
  categories
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchProducts: (id: number) => dispatch(fetchProductsByCategory(id))
})

const Sidebar = ({
  categories,
  fetchCategories,
  fetchProducts
}: {
  categories: Array<Category>
  fetchCategories: any
  fetchProducts: any
}) => {
  useEffect(() => {
    fetchCategories()
  }, [])
  return (
    <div>
      <ul>
        {categories.map(category => (
          <li key={category.id} onClick={() => fetchProducts(category.id)}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
