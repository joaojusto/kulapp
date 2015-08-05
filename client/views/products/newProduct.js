Template.newProduct.events({
  'click .save': function(event) {
    event.preventDefault();

    var name = $('#name').val();
    var price = $('#price').val();

    Products.insert({name: name, price: price});
  }
});
