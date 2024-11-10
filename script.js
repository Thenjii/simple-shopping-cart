let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Large Willow Earings',
        tag: 'largeWillowEarings',
        price: 50,
        inCart: 0,
    },
    {
        name: 'Flat Herringbone Set',
        tag: 'flatHerringboneSet',
        price: 100,
        inCart: 0,
    },
    {
        name: 'Bold Square Earings',
        tag: 'boldSquareEarings',
        price: 40,
        inCart:0,
    },
    {
        name: 'Ear Stack Set',
        tag: 'earStackSet',
        price: 65,
        inCart: 0,
    },
    {
        name: 'Spine Necklace',
        tag: 'spineNecklace',
        price: 80,
        inCart: 0,
    },
    {
        name: 'Ring Stack Set',
        tag: 'rRingStackSet',
        price: 40,
        inCart: 0,
    },
    {
        name: 'Chunky Ovals Earings',
        tag: 'chunkyOvalsEaring',
        price: 55,
        inCart: 0,
    },
    {
        name: 'Abstract Round Earings',
        tag: 'abstractRoundEarings',
        price: 45,
        inCart: 0,
    },
]

//add items
for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

//inside cart
function setItems(product){
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems !=null) {

        if(cartItems[product.tag] ==undefined){
            cartItems ={
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;    
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify
        (cartItems));
}

onLoadCartNumbers();