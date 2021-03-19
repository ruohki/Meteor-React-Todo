import React from 'react';

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'

export const useMeteorUser = () => {
  return useTracker<{
    user: Meteor.User | null,
    userId: string | null,
    isLoggingIn: boolean,
    isLoggedIn: boolean
  }>(() => ({
    user: Meteor.user(),
    userId: Meteor.userId(),
    isLoggedIn: !!Meteor.userId() && !Meteor.loggingIn() && !Meteor.loggingOut(),
    isLoggingIn: Meteor.loggingIn()
  }));
}