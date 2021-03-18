import { Mongo } from 'meteor/mongo';

export interface Todo {
  _id?: string;
  description: string;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export const TodoCollection = new Mongo.Collection<Todo>('todos');

TodoCollection.allow({
  insert: () => false,
  remove: () => false,
  update: () => false,
});