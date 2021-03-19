import React from 'react';

interface CreateTodoProps {
  createTodo: (description: string) => void
};

export const CreateTodo: React.FC<CreateTodoProps> = (props) => {
  const [ description, setDescription ] = React.useState<string>("");

  return ( 
    <form
      className="createTodo"
      onSubmit={e => {
        e.preventDefault();
        if (description.length > 0) {
          props.createTodo(description);
          setDescription("");
        }
      }}
    >
      <label>Description:</label>
      <input value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Add Todo</button>
    </form>
  )
}