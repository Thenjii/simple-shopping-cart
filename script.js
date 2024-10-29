// Initialize an empty cart array or load existing cart from localStorage
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// Function to add items to the cart
function addToCart() {
    // Get product details (you might want to use better identifiers like product IDs in a real project)
    const productElement = event.target.closest('.column'); // Get the closest product container
    const productName = productElement.querySelector('h6').innerText; // Get the product name
    const quantityInput = productElement.querySelector('input[type="number"]'); // Get the quantity input field
    const quantity = parseInt(quantityInput.value); // Convert the quantity to an integer

        // Calculate total price for this item
    const totalPrice = price * quantity;    
    
    // Check if product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        // If product exists, update the quantity
        cart[existingProductIndex].quantity += quantity;
        cart[existingProductIndex].totalPrice += totalPrice;
    } else {
        // If product doesn't exist, add it to the cart
        const product = {
            name: productName,
            quantity: quantity,
            price: price,
            totalPrice: totalPrice
        };
        cart.push(product);
    }

    // Save the cart to localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(cart));

    // Alert or console log a success message
    alert(`${quantity} ${productName} added to cart!`);
}

// Function to display the cart items on the cart page (you can call this on a separate cart page)
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const cartContainer = document.getElementById('cart-items'); // Assuming you have an element with id 'cart-items' to display items
    const totalContainer = document.getElementById('cart-total');

    cartContainer.innerHTML = ''; // Clear previous items
    let total = 0;

    // Loop through each item in the cart and display it
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `<p>${item.name} - Quantity: ${item.quantity}</p>`;
        cartContainer.appendChild(cartItem);
    
        cartContainer.appendChild(cartItem);

        total += item.totalPrice; // Add to the total
    });

    // Display the total price
    totalContainer.innerHTML = `<h4>Total: $${total.toFixed(2)}</h4>`;
}

// You can call displayCartItems() on the cart page to load items from localStorage