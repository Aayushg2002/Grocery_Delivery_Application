// Array to hold cart items
let cart = [];

// Add item to cart
function addToCart(itemName, itemPrice) {
  const existingItem = cart.find(item => item.name === itemName);
  
  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.total += itemPrice;
  } else {
    cart.push({ name: itemName, price: itemPrice, quantity: 1, total: itemPrice });
  }

  updateCart();
}

// Update cart display
function updateCart() {
  const cartTableBody = document.getElementById("cart-table").getElementsByTagName("tbody")[0];
  cartTableBody.innerHTML = ""; // Clear the table

  cart.forEach((item, index) => {
    const row = cartTableBody.insertRow();
    row.innerHTML = `
      <td>${item.name}</td>
      <td>Rs ${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>Rs ${item.total.toFixed(2)}</td>
      <td><button onclick="removeFromCart(${index})">Remove</button></td>
    `;
  });

  updateTotalPrice();
}

// Calculate and update total price
function updateTotalPrice() {
  const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Simulate placing an order
function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let orderSummary = "Order Summary:\n";
  cart.forEach(item => {
    orderSummary += `Rs {item.quantity} x Rs {item.name} - Rs ${item.total.toFixed(2)}\n`;
  });
  
  orderSummary += `\nTotal Price: Rs ${document.getElementById("total-price").textContent}`;
  alert(orderSummary);

  // Clear cart after placing order
  cart = [];
  updateCart();
}
