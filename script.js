let count = 0;

// CraftKart ke Products Data
const productsData = [
    "Handmade Vase",
    "Wooden Lamp",
    "Wall Decoration",
    "Clay Pot",
    "Birthday Item",
    "Crochet Bag",
    "Special Gift"
];

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchInput && searchResults) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        searchResults.innerHTML = ''; // Pehle wale results clear karein

        if (query === '') {
            return;
        }

        // Matching products filter karein
        const filtered = productsData.filter(item => 
            item.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            searchResults.innerHTML = '<div class="search-item">Koi product nahi mila</div>';
            return;
        }

        // Matching items list me add karein
        filtered.forEach(item => {
            const div = document.createElement('div');
            div.className = 'search-item';
            div.textContent = item;
            
            // Click karne par input me name aa jaye
            div.addEventListener('click', () => {
                searchInput.value = item;
                searchResults.innerHTML = '';
            });

            searchResults.appendChild(div);
        });
    });

    // Baahar click karne par dropdown band ho jaye
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            searchResults.innerHTML = '';
        }
    });
}
const products = {

    decor: [
        {
            name: "Handmade Flower Vase",
            price: "499",
            image: "images/handmade flower vase.jpeg"
        },
        {
            name: "Decorative Wall Hanging",
            price: "699",
            image: "images/wall hanging.jpeg"
        },
        {
            name: "Handmade Showpiece",
            price: "399",
            image: "images/showpiece.jpeg"
        }
    ],

    wallart: [
        {
            name: "Beautiful Wall Painting",
            price: "899",
            image: "images/wall painting.jpeg"
        },
        {
            name: "Handmade Canvas Art",
            price: "799",
            image: "images/canvas art.jpeg"
        },
        {
            name: "Modern Wall Decor",
            price: "599",
            image: "images/wall decor.jpeg"
        }
    ],

    jewellery: [
        {
            name: "Handmade Bracelet",
            price: "299",
            image: "images/bracelet.jpeg"
        },
        {
            name: "Handmade Earrings",
            price: "249",
            image: "images/earrings.jpeg"
        },
        {
            name: "Beautiful Necklace",
            price: "499",
            image: "images/necklace.jpeg"
        }
    ],

    gifts: [
        {
            name: "Handmade Gift Box",
            price: "599",
            image: "images/handmade gift.jpeg"
        },
        {
            name: "Special Handmade Gift",
            price: "699",
            image: "images/special gift.jpeg"
        },
        {
            name: "Birthday Gift Item",
            price: "449",
            image: "images/birthday item.jpeg"
        }
    ],

    candles: [
        {
            name: "Aromatic Handmade Candle",
            price: "299",
            image: "images/handmade candle.jpeg"
        },
        {
            name: "Flower Candle",
            price: "349",
            image: "images/flower candle.jpeg"
        },
        {
            name: "Decorative Candle",
            price: "399",
            image: "images/decorative candle.jpeg"
        }
    ],

    crochet: [
        {
            name: "Crochet Flower",
            price: "249",
            image: "images/crochet flower.jpeg"
        },
        {
            name: "Crochet Teddy",
            price: "599",
            image: "images/crochet teddy.jpeg"
        },
        {
            name: "Crochet Bag",
            price: "799",
            image: "images/crochet bag.jpeg"
        }
    ]
};


function showCategory(category) {

    const container = document.getElementById("product-container");
    const title = document.getElementById("category-title");

   if (category === "home") {

    container.classList.remove("category-background");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    return;
}

    if (category === "contact") {
        title.innerText = "Contact Us";

        container.innerHTML = `
            <div class="contact-box">
                <h3>Get In Touch 💌</h3>
                <p>Email: handmadecraft@gmail.com</p>
                <p>Phone: +91 9876543210</p>
                <p>We would love to hear from you!</p>
            </div>
        `;

        document.getElementById("products-section")
            .scrollIntoView({ behavior: "smooth" });

        return;
    }

    const categoryProducts = products[category];

    title.innerText = category.toUpperCase();

    container.innerHTML = "";
    container.classList.add("category-background");
    const categoryImages = {

    decor: [
        "images/handmade flower vase.jpeg",
        "images/wall hanging.jpeg",
        "images/showpiece.jpeg"
    ],

    wallart: [
        "images/wall painting.jpeg",
        "images/canvas art.jpeg",
        "images/wall decor.jpeg"
    ],

    jewellery: [
        "images/bracelet.jpeg",
        "images/earrings.jpeg",
        "images/necklace.jpeg"
    ],

    gifts: [
        "images/handmade gift.jpeg",
        "images/special gift.jpeg",
        "images/birthday item.jpeg"
    ],

    candles: [
        "images/handmade candle.jpeg",
        "images/flower candle.jpeg",
        "images/decorative candle.jpeg"
    ],

    crochet: [
        "images/crochet flower.jpeg",
        "images/crochet teddy.jpeg",
        "images/crochet bag.jpeg"
    ]
};

    categoryProducts.forEach((product, index) => {
    container.innerHTML += `
        <div class="product-card">
            <img src="${categoryImages[category][index]}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p class="price">${product.price}</p>

           

            <button class="cart-btn"
                onclick='addToCart(${JSON.stringify(product)})'>
                Add to Cart
            </button>
            <button class="buy-btn"
            onclick='buyNow(${JSON.stringify(product)})'>
            Buy Now
        </button>
        </div>
    `;
});

    document.getElementById("products-section")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function buyProduct(productName) {

    alert(
        "You selected: " + productName
    );

}

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");

    if (category) {
        showCategory(category);
    }

});
// ===============================
// CRAFTKART CART SYSTEM
// ===============================

// Get cart from browser storage
function getCart() {
    return JSON.parse(localStorage.getItem("craftkartCart")) || [];
}


// Save cart
function saveCart(cart) {
    localStorage.setItem(
        "craftkartCart",
        JSON.stringify(cart)
    );
}


function addToCart(product) {

    let cart = getCart();

    let productId = product.id || product.name;

    let existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });

    }

    saveCart(cart);

    updateCartCount();

    alert(product.name + " added to cart!");
}


function buyNow(product) {

    localStorage.setItem(
        "buyProduct",
        product.name
    );

    localStorage.setItem(
        "buyPrice",
        product.price
    );

    localStorage.setItem(
        "buyImage",
        product.image
    );

    localStorage.setItem(
        "buyQuantity",
        "1"
    );

    window.location.href =
        "checkout.html";
}

// Update cart number
function updateCartCount() {

    let cart = getCart();

    let count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    let cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = count;
    }
}


// Display cart products
function displayCart() {

    let cartContainer = document.getElementById("cart-items");

    if (!cartContainer) return;

    let cart = getCart();

    cartContainer.innerHTML = "";

    // Cart empty
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h2>Your Cart is Empty 🛒</h2>
                <p>Add some handmade products.</p>
            </div>
        `;

        let totalElement = document.getElementById("cart-total");

        if (totalElement) {
            totalElement.textContent = "0";
        }

        return;
    }

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-info">

                    <h3>${item.name}</h3>

                    <p>Price: ₹${item.price}</p>

                    <p>
                        Quantity:

                        <button onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <strong>${item.quantity}</strong>

                        <button onclick="changeQuantity(${index}, 1)">
                            +
                        </button>
                    </p>

                    <button onclick="removeFromCart(${index})">
                        Remove
                    </button>

                    <button
                        class="buy-now"
                        onclick="buyCartProduct(${index})">
                        Proceed to Buy
                    </button>

                </div>

            </div>
        `;
    });

    let totalElement = document.getElementById("cart-total");

    if (totalElement) {
        totalElement.textContent = total;
    }
}
function checkout() {

    let cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Poora cart checkout ke liye save
    localStorage.setItem(
        "checkoutCart",
        JSON.stringify(cart)
    );

    window.location.href = "checkout.html";
}
// Increase / decrease quantity
function changeQuantity(index, change) {

    let cart = getCart();

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
    displayCart();
    updateCartCount();
}


// Remove product
function removeFromCart(index) {

    let cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);
    displayCart();
    updateCartCount();
}


// Proceed to Buy for individual cart product
function buyCartProduct(index) {

    let cart = getCart();

    let product = cart[index];

    localStorage.setItem("buyProduct", product.name);
    localStorage.setItem("buyPrice", product.price);
    localStorage.setItem("buyImage", product.image);

    window.location.href = "checkout.html";
}


// Run when page loads
document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();
    displayCart();

});
// Logout
function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";
}