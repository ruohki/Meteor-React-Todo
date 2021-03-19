import React from 'react';
import { Meteor } from 'meteor/meteor';

import { CreateTodo } from './CreateTodo';

import { ADD_TODO } from '../api/identifier';
import { useMeteorUser } from './hooks/useMeteorUser';
import { Todos } from './Todos';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignupForm';

export const App: React.FC = () => {
  const { isLoggedIn, user } = useMeteorUser();
  
  const addItem = React.useCallback((description: string) => {
    if (description.length > 255) return;
    Meteor.call(ADD_TODO, description);
  }, []);

  return (
    <div>
      <h1>Welcome to Meteor Todo!</h1>
      {isLoggedIn ? (
        <>
          <p>Hello {user?.username}. Here are your todos! <button onClick={() => Meteor.logout()}>Logout</button></p>
          <hr />
          <CreateTodo createTodo={addItem} />
          <Todos />
        </>
      ) : (
        <>
          <p>You are not logged in. Please login or signup.</p>
          <LoginForm />
          <SignUpForm />
        </>
      )}
    </div>
  );
};