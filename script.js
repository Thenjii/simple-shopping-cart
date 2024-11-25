let carts = document.querySelectorAll('.add-cart');
let products = [
    { name: 'Large Willow Earrings', tag: 'largeWillowEarings', price: 50, inCart: 0 },
    { name: 'Flat Herringbone Set', tag: 'flatHerringboneSet', price: 100, inCart: 0 },
    { name: 'Bold Square Earrings', tag: 'boldSquareEarings', price: 40, inCart: 0 },
    { name: 'Ear Stack Set', tag: 'earStackSet', price: 65, inCart: 0 },
    { name: 'Spine Necklace', tag: 'spineNecklace', price: 80, inCart: 0 },
    { name: 'Ring Stack Set', tag: 'ringStackSet', price: 40, inCart: 0 }, 
    { name: 'Chunky Ovals Earrings', tag: 'chunkyOvalsEaring', price: 55, inCart: 0 },
    { name: 'Abstract Round Earrings', tag: 'abstractRoundEarings', price: 45, inCart: 0 },
];

// Add items 
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems) {
        if (!cartItems[product.tag]) {
            cartItems = {
                ...cartItems,
                [product.tag]: product,
            };
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product,
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

// total cost
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);

    if (cartCost) {
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    let productContainer = document.querySelector('.products');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).forEach(item => {
            productContainer.innerHTML += `
                <div class="product">
                    <ion-icon name="close-circle-outline"></ion-icon>
                    <img src="./images/${item.tag}.jpg" alt="${item.name}">
                    <span>${item.name}</span>
                </div>
                <div class="price">$${item.price}.00</div>
                <div class="quantity">
                    <ion-icon name="arrow-back-circle-outline"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon name="arrow-forward-circle-outline"></ion-icon>
                </div>
                <div class="total">$${item.inCart * item.price}.00</div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="cartTotalTitle">Cart Total</h4>
                <h4 class="basketTotal">$${cartCost}</h4>
            </div>
        `;
    }
}

// Initialize
onLoadCartNumbers();
displayCart();
