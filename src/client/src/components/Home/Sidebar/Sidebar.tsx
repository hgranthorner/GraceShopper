import React, { useState, useEffect } from 'react'
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
      <ul className="list-group">
        {categories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(category => (
            <li className="list-group-item" style={{ cursor: 'pointer' }} key={category.id} onClick={() => fetchProducts(category.id)}>
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
