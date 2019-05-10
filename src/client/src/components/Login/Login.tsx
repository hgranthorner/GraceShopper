import React, { useState } from 'react'
import { login } from '../../store/thunks'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleSubmit(userName: string, password: string) {
      const thunk = login({
        name: userName,
        password: password
      })
      dispatch(thunk).then(() => console.log('logged in!'))
    }
  }
}

const Login = ({
  handleSubmit,
  history
}: {
  handleSubmit: any
  history: any
}) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const submitUser = (ev: any) => {
    ev.preventDefault()
    handleSubmit(userName, password)
    history.push('/')
  }

  return (
    <div className="mt-5">
      {error ? <div>There has been an error</div> : ''}
      <form onSubmit={submitUser} className="align-self-center">
        <div className="d-flex justify-content-center">
          <label>
            User Name:
            <input
              type="text"
              value={userName}
              onChange={ev => setUserName(ev.target.value)}
            />
          </label>
        </div>
        <div className="d-flex justify-content-center">
          <label>
            Password:
            <input
              type="text"
              value={password}
              onChange={ev => setPassword(ev.target.value)}
            />
          </label>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(Login)
