import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
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
  const [categoryId, setCategoryId] = useState(0)

  // fetch categories on mount
  useEffect(() => {
    fetchCategories()
  }, [])

  // fetch products when categoryId changes
  useEffect(() => {
    fetchProducts(categoryId)
  }, [categoryId])

  return (
    <div>
      <ul className="list-group">
        {categories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(category => (
            <NavLink
              to={`/categories/${category.id}`}
              activeClassName="active"
              className="list-group-item list-group-item-action"
              style={{ cursor: 'pointer' }}
              key={category.id}
              onClick={() => setCategoryId(category.id)}
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
