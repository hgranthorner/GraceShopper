import React, { useState } from 'react'
import { login } from '../../store/thunks'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleSubmit(ev: any) {
      const thunk = login({
        name: ev.target.userName.value,
        password: ev.target.password.value
      })
      dispatch(thunk)
    }
  }
}

const Login = ({ handleSubmit }: { handleSubmit: any }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
  null,
  mapDispatchToProps
)(Login)
