Template.product.events({
  'click .delete': function(event) {
    event.preventDefault();

    Products.remove(this._id);
  }
});
