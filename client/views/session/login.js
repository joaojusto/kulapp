Template.login.events({
  'click .submit': function(event) {
    event.preventDefault();

    var user = $('#username').val();
    var password = $('#password').val();

    Meteor.loginWithPassword(user, password, function(error) {
      if (error) return;

      Router.go('home');
    });
  }
});
