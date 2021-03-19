import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { ADD_TODO, REMOVE_TODO, COMPLETE_TODO } from './identifier';
import { TodoCollection } from './todos';

Meteor.methods({
  [ADD_TODO]: function(description?: string): void {
    check(description, String);

    if (!this.userId) throw new Meteor.Error("You need to be authenticated.");
    if (description.length > 255) throw new Meteor.Error("The description you entered was to long. (Max 255 characters).");

    TodoCollection.insert({
      description,
      owner: this.userId,
      completed: false,
      createdAt: new Date
    });
  },
  [REMOVE_TODO]: function(todoId?: string): void {
    check(todoId, String);
    
    if (!this.userId) throw new Meteor.Error("You need to be authenticated.");

    const deleted = TodoCollection.remove({ _id: todoId, owner: this.userId });
    if (deleted <= 0) throw new Meteor.Error("A todo item with the specified id was not found.");
  },
  [COMPLETE_TODO]: function(todoId?: string, completed?: boolean): void {
    check(todoId, String);
    check(completed, Boolean);

    if (!this.userId) throw new Meteor.Error("You need to be authenticated.");

    const updated = TodoCollection.update({ _id: todoId, owner: this.userId }, { $set: { completed }});
    if (updated <= 0) throw new Meteor.Error("A todo item with the specified id was not found.");
  }
});