import React, { useState } from 'react'
import { updateSearchTerm, searchProducts, fetchProducts } from '../../store'
import { connect } from 'react-redux'
import { reset } from 'continuation-local-storage'

const mapStateToProps = ({ searchTerm }: { searchTerm: string }) => ({ searchTerm })

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSearchTerm: (searchTerm: string) => dispatch(updateSearchTerm(searchTerm)),
    search: () => dispatch(searchProducts()),
    resetSearch: () => dispatch(fetchProducts())
  }
}

const Search = ({
  searchTerm,
  updateSearchTerm,
  search,
  resetSearch
}: {
  searchTerm: string
  updateSearchTerm: any
  search: any
  resetSearch: any
}) => {
  return (
    <div className={'input-group'}>
      <input
        placeholder="Search Results"
        className="form-control"
        value={searchTerm}
        onChange={evt => updateSearchTerm(evt.target.value)}
      />
      <button className="btn btn-info" onClick={search}>
        SEARCH
      </button>
      <button className="btn btn-danger" onClick={resetSearch}>
        RESET
      </button>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
