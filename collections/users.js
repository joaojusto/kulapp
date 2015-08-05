seed();

Meteor.users.allow({
  remove: function() {
    return true ;
  }
});

function seed() {
  var users = Meteor.users.find().fetch();

  if (!users.length) {
    Accounts.createUser({
      username: 'ilha',
      email: 'ilha@kuljovem.com',
      password: 'bardailha',
      profile: {
        name: 'Bar da Ilha'
      }
    });
  }
}
