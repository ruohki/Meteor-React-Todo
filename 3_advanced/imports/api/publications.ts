import { Meteor } from 'meteor/meteor';
import { TODO_SUBSCRIPTION } from './identifier';
import { TodoCollection } from './todos';

Meteor.publish(TODO_SUBSCRIPTION, function() {
  if (!this.userId) throw new Meteor.Error("You need to be authenticated.");
  return TodoCollection.find({ owner: this.userId });
});