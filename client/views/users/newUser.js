Template.newUser.events({
  'click .save': function(event) {
    event.preventDefault();

    var user = $('#username').val();
    var password = $('#password').val();

    Accounts.createUser({
      username: user,
      email: 'user@kuljovem.com',
      password: password,
      profile: {
        name: user
      }
    });
  }
});
