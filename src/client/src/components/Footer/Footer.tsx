import React from 'react'
import { connect } from 'react-redux'
import { User } from 'src/@types/redux-types'
import { logout } from '../../store'

const mapStateToProps = ({ user }: { user: User }) => ({
  user
})

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(logout())
})

const Footer = ({ user, logout }: { user: User; logout: any }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="d-flex justify-content-center bg-light">
          <p>Registered trademark of Boos, Inc.</p>
          {user.id !== -1 ? (
            <button className="btn btn-danger" onClick={logout} type="button">
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </footer>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
