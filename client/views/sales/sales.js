var cart = new ReactiveVar();

function addToCart(newItem) {
  var cartArray = cart.get();

  var existingItem = findSameItem(cartArray, newItem.productId);

  if (existingItem)
    existingItem.quantity += newItem.quantity;
  else
    cartArray.push(newItem);

  cart.set(cartArray);
}

function findSameItem(cart, id) {
  return _.findWhere(cart, {productId: id});
}

function cartItemTotal(cartItem) {
  return (cartItem.price * cartItem.quantity).toFixed(2);
}

function cartTotal(cart) {
  var total = 0;

  cart.forEach(function(cartItem) {
    total += cartItem.price * cartItem.quantity;
  });

  return total.toFixed(2);
}

function finalizeCart(cart) {
  cart.forEach(createSale);
  clearCart();
}

function createSale(cartItem) {
  cartItem.total = cartItemTotal(cartItem);
  console.log(cartItem);
  Sales.insert(cartItem);
}

function clearCart() {
  cart.set([]);
}

Template.sales.created = clearCart;

Template.sales.helpers({
  cartItems: function() {
    return cart.get();
  },

  products: function() {
    return Products.find().fetch();
  },

  cartItemTotal: function() {
    return cartItemTotal(this);
  },

  cartTotal: function() {
    return cartTotal(cart.get());
  }
});

Template.sales.events({
  'click .product': function(event) {
    event.preventDefault();

    var cartItem = {
      name: this.name,
      price: this.price,
      userId: Meteor.userId(),
      productId: this._id,
      quantity: 1,
      createdAt: new Date()
    };

    addToCart(cartItem);
  },

  'click .finalize': function(event) {
    event.preventDefault();

    finalizeCart(cart.get());
  }
});
