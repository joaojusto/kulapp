Router.configure({
  layoutTemplate: 'layout'
});

beforeHooks = {
  loggedIn: function() {
  if (!Meteor.userId())
    this.render('login');
  else
    this.next();
  }
};

Router.onBeforeAction(beforeHooks.loggedIn);

Router.map(function() {
  this.route('home', {
    path: '/'
  });

  this.route('login', {
    path: '/login'
  });

  this.route('users', {
    path: '/users'
  });

  this.route('products', {
    path: '/products'
  });

  this.route('sales', {
    path: '/sales'
  });

  this.route('overview', {
    path: '/overview'
  });
});
