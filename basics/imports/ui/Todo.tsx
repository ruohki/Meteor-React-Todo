import React from 'react';

interface TodoProps {
  description: string
  completed: boolean
  createdAt: Date
  completedAt?: Date
  onComplete: (completed: boolean) => void
  onRemove: () => void
}

export const Todo: React.FC<TodoProps> = (props) => {
  return (
    <li>
      <input type="checkbox" checked={props.completed} onChange={e => props.onComplete(e.target.checked)} />
      <span>{props.description}</span>
      <span> - </span>
      {!props.completed ? (
        <span>Created: {props.createdAt.toString()}</span>
      ): (
        <>
          <span>Completed: {props.completedAt?.toString()}</span>
          <span> - </span>
          <button onClick={() => props.onRemove()}>Remove</button>
        </>
      )}
    </li>
  )
}