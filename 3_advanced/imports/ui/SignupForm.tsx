import { Accounts } from 'meteor/accounts-base'
import React from 'react';

export const SignUpForm: React.FC = () => {
  const [ username, setUser ] = React.useState<string>("");
  const [ password1, setPass1 ] = React.useState<string>("");
  const [ password2, setPass2 ] = React.useState<string>("");

  const signupDisabled = password1.length == 0 || password1 !== password2 || username.length == 0

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        Accounts.createUser({
          username,
          password: password1
        }, (error) => {
          if (error) alert(error)
        })
      }}
    >
      <label>Username:</label>
      <input placeholder="Username" value={username} onChange={e => setUser(e.target.value)} />
      <label>Password:</label>
      <input type="password" placeholder="Password" value={password1} onChange={e => setPass1(e.target.value)} />
      <label>Password (repeat):</label>
      <input type="password" placeholder="Password" value={password2} onChange={e => setPass2(e.target.value)} />
      <button type="submit" disabled={signupDisabled}>Sign up</button>
    </form>
  )
}