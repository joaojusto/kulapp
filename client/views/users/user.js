Template.user.events({
  'click .delete': function(event) {
    event.preventDefault();

    Meteor.users.remove(this._id);
  }
});

Template.user.helpers({
  notCurrentUser: function() {
    return this._id !== Meteor.userId();
  }
});
