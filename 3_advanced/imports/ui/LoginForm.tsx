import { Meteor } from 'meteor/meteor';
import React from 'react';

export const LoginForm: React.FC = () => {
  const [ username, setUser ] = React.useState<string>("");
  const [ password, setPass ] = React.useState<string>("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        Meteor.loginWithPassword(username, password, (error) => {
          if (error) alert("Login failed.")
        })
      }}
    >
      <label>Username:</label>
      <input placeholder="Username" value={username} onChange={e => setUser(e.target.value)} />
      <label>Password:</label>
      <input type="password" placeholder="Password" value={password} onChange={e => setPass(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}