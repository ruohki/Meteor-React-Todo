import React from 'react';

interface TodoProps {
  _id: string
  description: string
  completed: boolean
  createdAt: Date
  completedAt?: Date
  onComplete: (itemId: string, completed: boolean) => void
  onRemove: (itemId: string) => void
};

export const Todo: React.FC<TodoProps> = (props) => {
  return (
    <li>
      <input type="checkbox" checked={props.completed} onChange={e => props.onComplete(props._id, e.target.checked)} />
      <span>{props.description}</span>
      <span> - </span>
      {!props.completed ? (
        <span>Created: {props.createdAt.toString()}</span>
      ): (
        <>
          <span>Completed: {props.completedAt?.toString()}</span>
          <span> - </span>
          <button onClick={() => props.onRemove(props._id)}>Remove</button>
        </>
      )}
    </li>
  )
}