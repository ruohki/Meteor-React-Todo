import React from 'react';

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { TodoCollection, Todo as ITodo } from '../api/todos';
import { COMPLETE_TODO, REMOVE_TODO, TODO_SUBSCRIPTION } from '../api/identifier';
import { Todo } from './Todo';

export const Todos: React.FC = () => {
  const { isReady, todos } = useTracker<{ isReady: boolean, todos: ITodo[] }>(() => {
    const sub = Meteor.subscribe(TODO_SUBSCRIPTION);
    const todos = TodoCollection.find({}, { sort: {  completed: 1, createdAt: -1 }}).fetch();
    return {
      isReady: sub.ready(),
      todos
    }
  });

  

  const removeItem = React.useCallback((itemId: string) => Meteor.call(REMOVE_TODO, itemId), []);
  const completeItem = React.useCallback((itemId: string, completed: boolean) => Meteor.call(COMPLETE_TODO, itemId, completed), []);
  
  return isReady ? (
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
  )
}