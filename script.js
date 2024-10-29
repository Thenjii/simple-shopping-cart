// Initialize an empty cart array or load existing cart from localStorage
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// Function to add items to the cart
function addToCart(event) {
    // Get product details
    const productElement = event.target.closest('.column');
    const productName = productElement.querySelector('h6').innerText;
    const quantityInput = productElement.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productElement.getAttribute('data-price')); // Get price from data-price attribute

    // Calculate total price for this item
    const totalPrice = price * quantity;

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        // If the product exists, update the quantity and subtotal
        cart[existingProductIndex].quantity += quantity;
        cart[existingProductIndex].totalPrice += totalPrice;
    } else {
        // If the product doesn't exist, add it to the cart
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

    alert(`${quantity} ${productName} added to cart!`);
}

// Function to display the cart items and calculate the total price
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');

    cartContainer.innerHTML = ''; // Clear previous items
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - Price: $${item.price.toFixed(2)} - Quantity: ${item.quantity} - Subtotal: $${item.totalPrice.toFixed(2)}</p>
        `;
        cartContainer.appendChild(cartItem);

        total += item.totalPrice; // Add to the total
    });

    // Display the total price
    totalContainer.innerHTML = `<h4>Total: $${total.toFixed(2)}</h4>`;
}

// You can call displayCartItems() on the cart page to load items from localStorage
