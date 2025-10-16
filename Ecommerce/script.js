// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        image: "images/headphones.jpg",
        category: "electronics",
        description: "High-quality wireless headphones with noise cancellation"
    },
    {
        id: 2,
        name: "Smartphone XYZ",
        price: 699.99,
        image: "images/phone.jpg",
        category: "electronics",
        description: "Latest smartphone with advanced features"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 129.99,
        image: "images/shoes.jpg",
        category: "fashion",
        description: "Comfortable running shoes for athletes"
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 49.99,
        image: "images/backpack.jpg",
        category: "accessories",
        description: "Durable backpack for laptops and gadgets"
    },
    {
        id: 5,
        name: "Coffee Maker",
        price: 89.99,
        image: "images/coffee-maker.jpg",
        category: "home",
        description: "Automatic coffee maker for your home"
    },
    {
        id: 6,
        name: "Fitness Tracker",
        price: 59.99,
        image: "images/fitness-tracker.jpg",
        category: "electronics",
        description: "Track your fitness goals with this smart device"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the app
function initApp() {
    updateCartCount();
    loadFeaturedProducts();
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    const featuredProducts = products.slice(0, 4); // Show first 4 products as featured
    
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.src='https://via.placeholder.com/250x200?text=Product+Image'">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Product added to cart!');
}

// Update cart count in header
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Search functionality
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm.trim()) {
        // For now, just alert - we'll implement proper search later
        alert(`Searching for: ${searchTerm}`);
        // In a real app, you would filter and display products
    }
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', initApp);
// User session management
function checkUserSession() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginLink = document.getElementById('login-link');
    
    if (user && user.loggedIn) {
        if (loginLink) {
            loginLink.textContent = `Welcome, ${user.email.split('@')[0]}`;
            loginLink.href = 'javascript:void(0)';
            loginLink.onclick = logout;
        }
    }
}

function logout() {
    localStorage.removeItem('user');
    alert('Logged out successfully!');
    window.location.href = 'index.html';
}

// Update the initApp function to include session check
function initApp() {
    updateCartCount();
    loadFeaturedProducts();
    checkUserSession();
}