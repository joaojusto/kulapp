Template.products.helpers({
  products: function() {
    return Products.find().fetch();
  }
});
