import React from 'react';

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TodoCollection, Todo as ITodo } from '../api/todos';
import { CreateTodo } from './CreateTodo';
import { Todo } from './Todo';
import { ADD_TODO, COMPLETE_TODO, REMOVE_TODO, TODO_SUBSCRIPTION } from '../api/identifier';

export const App: React.FC = () => {
  const { isReady, todos } = useTracker<{ isReady: boolean, todos: ITodo[] }>(() => {
    const sub = Meteor.subscribe(TODO_SUBSCRIPTION);
    const todos = TodoCollection.find({}, { sort: {  completed: 1, createdAt: -1 }}).fetch();
    return {
      isReady: sub.ready(),
      todos
    }
  });

  const addItem = React.useCallback((description: string) => {
    if (description.length > 255) return;
    Meteor.call(ADD_TODO, description);
  }, []);

  const removeItem = React.useCallback((itemId: string) => Meteor.call(REMOVE_TODO, itemId), []);
  const completeItem = React.useCallback((itemId: string, completed: boolean) => Meteor.call(COMPLETE_TODO, itemId, completed), []);
  
  return (
    <div>
      <h1>Welcome to Meteor Todo!</h1>
      <CreateTodo createTodo={addItem} />
      {isReady ? (
        <ul>
          {todos.map(todo => (
            <Todo
              key={todo._id}
              _id={todo._id!}
              {...todo}
              onComplete={completeItem}
              onRemove={removeItem}
            />
          ))}
        </ul>
      ) : (
        <p>Loading todo's...</p>
      )}
    </div>
  );
};