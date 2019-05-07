import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Category } from 'src/@types/redux-types'
import { fetchCategories, fetchProductsByCategory } from '../../../store'
import ToggleProductView from './ToggleProductView'

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

  const [toggle, setToggle] = useState(false)
  const [categoryId, setCategoryId] = useState(0)
  const viewProductList = (categoryId: number) => {
    setToggle(!toggle)
    setCategoryId(categoryId)
  }
  return (
    <div>
      <ul className="list-group">
        {categories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(category => (
            <li
              className="list-group-item"
              style={{ cursor: 'pointer' }}
              key={category.id}
              onClick={() => viewProductList(category.id)}
            >
              {category.name}
            </li>
          ))}
        {toggle === false ? <ToggleProductView categoryId={categoryId} /> : ''}
      </ul>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
