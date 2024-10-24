// Declare global variables for the cart and total cost
let cart = [];
const productPrice = ; // Set the product price
let totalCost = 0;

// Function to add items to the cart
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);

    if (isNaN(quantity) || quantity < 1) {
        alert("Please enter a valid quantity.");
        return;
    }

    // Update cart with new quantity
    cart.push(quantity);

    // Calculate total cost
    totalCost += quantity * productPrice;

    // Update cart display
    updateCart();
}

// Function to clear the cart
function clearCart() {
    cart = [];
    totalCost = 0;
    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartDiv = document.getElementById('cart');
    const totalCostDiv = document.getElementById('total-cost');

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Cart is empty.</p>';
        totalCostDiv.innerHTML = 'Total: $0.00';
    } else {
        let cartContent = '<ul class="list-group">';
        let totalItems = 0;
        
        cart.forEach((quantity, index) => {
            cartContent += `<li class="list-group-item">Item ${index + 1}: Quantity - ${quantity}</li>`;
            totalItems += quantity;
        });
        cartContent += '</ul>';

        cartDiv.innerHTML = cartContent;
        totalCostDiv.innerHTML = `Total: $${totalCost.toFixed(2)}`;
    }
}
