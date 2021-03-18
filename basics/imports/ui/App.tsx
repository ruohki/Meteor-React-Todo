import React from 'react';

import { Tracker } from 'meteor/tracker'
import { TodoCollection, Todo as ITodo } from '../api/todos';
import { CreateTodo } from './CreateTodo';
import { Todo } from './Todo';

export const App: React.FC = () => {
  const [ todos, setTodos ] = React.useState<Array<ITodo>>([]);

  React.useEffect(() => {
    const tracker = Tracker.autorun(() => {
      setTodos(TodoCollection.find().fetch());
    })  
    return () => {
      tracker.stop();
    }
  }, [])
  
  return (
    <div>
      <h1>Welcome to Meteor Todo!</h1>
      <CreateTodo createTodo={description => TodoCollection.insert({ description, createdAt: new Date, completed: false })} />
      <ul>
        {todos.map(todo => (
          <Todo
            key={todo._id}
            {...todo}
            onComplete={completed => TodoCollection.update({ _id: todo._id}, { $set: { completed, completedAt: completed ? new Date : new Date(0) }})}
            onRemove={() => TodoCollection.remove({ _id: todo._id })}
          />
        ))}
      </ul>
    </div>
  );
  }