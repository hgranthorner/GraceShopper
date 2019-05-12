import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Category } from 'src/@types/redux-types'
import { fetchCategories, fetchProductsByCategory, fetchProducts } from '../../../store'

const mapStateToProps = ({ categories }: { categories: Array<Category> }) => ({
  categories
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchProductsByCategory: (id: number) => dispatch(fetchProductsByCategory(id)),
  fetchProducts: () => dispatch(fetchProducts())
})

const Sidebar = ({
  categories,
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory
}: {
  categories: Array<Category>
  fetchCategories: any
  fetchProducts: any
  fetchProductsByCategory: any
}) => {
  const [categoryId, setCategoryId] = useState(0)

  // fetch categories on mount
  useEffect(() => {
    fetchCategories()
  }, [])

  // fetch products when categoryId changes
  useEffect(() => {
    if (categoryId !== 0) fetchProductsByCategory(categoryId)
    else fetchProducts()
  }, [categoryId])

  return (
    <div>
      <ul className="list-group">
        {categories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(category => (
            <NavLink
              to={category.id === categoryId ? '/' : `/categories/${category.id}`}
              activeClassName="active"
              className="list-group-item list-group-item-action"
              style={{ cursor: 'pointer' }}
              key={category.id}
              onClick={category.id === categoryId ? () => setCategoryId(0) : () => setCategoryId(category.id)}
            >
              {category.name}
            </NavLink>
          ))}
      </ul>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
