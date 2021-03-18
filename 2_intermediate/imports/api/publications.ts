import { Meteor } from 'meteor/meteor';
import { TODO_SUBSCRIPTION } from './identifier';
import { TodoCollection } from './todos';

Meteor.publish(TODO_SUBSCRIPTION, function() {
  return TodoCollection.find();
});