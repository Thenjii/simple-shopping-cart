let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

function addToCart(event) {
   const productElement = event.target.closest('.column');
    const productName = productElement.querySelector('h6').innerText;
    const quantityInput = productElement.querySelector('.quantity-input');
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productElement.getAttribute('data-price')); // Get price from data-price attribute

    const totalPrice = price * quantity;

    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
        cart[existingProductIndex].totalPrice += totalPrice;
    } else {
       const product = {
            name: productName,
            quantity: quantity,
            price: price,
            totalPrice: totalPrice
        };
        cart.push(product);
    }

    localStorage.setItem
    ('shoppingCart', JSON.stringify(cart));

    alert(`${quantity} ${productName} added to cart!`);
}

//cart
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');

    cartContainer.innerHTML = ''; 
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - Price: $${item.price.toFixed(2)} - Quantity: ${item.quantity} - Subtotal: $${item.totalPrice.toFixed(2)}</p>
        `;
        cartContainer.appendChild(cartItem);

        total += item.totalPrice; 
    });

    totalContainer.innerHTML = `<h4>Total: $${total.toFixed(2)}</h4>`;
}