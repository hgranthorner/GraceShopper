import React, { useState } from 'react'
import { login } from '../../store/thunks'
import { connect } from 'react-redux'
import { User } from 'src/@types/redux-types'

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleSubmit(userName: string, password: string) {
      const thunk = login({
        name: userName,
        password: password
      })
      dispatch(thunk)
        .then(() => console.log('logged in!'))
        .catch(() => console.log('there has been an error'))
    }
  }
}

const mapStateToProps = ({ user }: { user: User }) => {
  return { user }
}

const Login = ({ user, handleSubmit }: { user: User; handleSubmit: any }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const submitUser = (ev: any) => {
    ev.preventDefault()
    handleSubmit(userName, password)
  }
  return (
    <div>
      {error ? <div>There has been an error</div> : ''}
      <form onSubmit={submitUser}>
        <div>
          <label>
            User Name:
            <input
              type="text"
              value={userName}
              onChange={ev => setUserName(ev.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="text"
              value={password}
              onChange={ev => setPassword(ev.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
