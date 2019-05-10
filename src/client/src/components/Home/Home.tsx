import React from 'react'
import { Sidebar } from './Sidebar'
import { ProductList } from './ProductList'
import { User } from 'src/@types/redux-types'
import { connect } from 'react-redux'

const mapStateToProps = ({ user }: { user: User }) => {
  return { user }
}

function Home({ user }: { user: User }) {
  console.log('the logged in user is: ', user)
  return (
    <div className="d-flex justify-content-around">
      <Sidebar />
      <ProductList />
    </div>
  )
}

export default connect(
  mapStateToProps,
  null
)(Home)
