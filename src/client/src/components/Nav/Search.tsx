import React, { useState } from 'react'
import { updateSearchTerm } from '../../store'
import { connect } from 'react-redux'

const mapStateToProps = ({ searchTerm }: { searchTerm: string }) => ({ searchTerm })

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateSearchTerm: (searchTerm: string) => dispatch(updateSearchTerm(searchTerm))
  }
}

const Search = ({ searchTerm, updateSearchTerm }: { searchTerm: string; updateSearchTerm: any }) => {
  return (
    <div className={'input-group'}>
      <input
        placeholder="Search Results"
        className="form-control"
        value={searchTerm}
        onChange={evt => updateSearchTerm(evt.target.value)}
      />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
