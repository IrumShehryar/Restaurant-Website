// Menu page functionality
let cart = [];
let menuItems = [];

document.addEventListener('DOMContentLoaded', function() {
    loadMenu();
    setupFilters();
    setupCheckout();
});

async function loadMenu() {
    const menuGrid = document.getElementById('menu-grid');
    
    // Sample menu items (in real app, this would come from API)
    menuItems = [
        {
            _id: '1',
            name: 'Grilled Salmon',
            description: 'Fresh Atlantic salmon grilled to perfection with herbs and lemon',
            price: 24.99,
            category: 'main-course',
            image: '🐟',
            available: true
        },
        {
            _id: '2',
            name: 'Pasta Carbonara',
            description: 'Classic Italian pasta with bacon, eggs, and parmesan cheese',
            price: 18.99,
            category: 'main-course',
            image: '🍝',
            available: true
        },
        {
            _id: '3',
            name: 'Caesar Salad',
            description: 'Fresh romaine lettuce with Caesar dressing and parmesan',
            price: 12.99,
            category: 'appetizers',
            image: '🥗',
            available: true
        },
        {
            _id: '4',
            name: 'Bruschetta',
            description: 'Toasted bread with tomatoes, garlic, and basil',
            price: 9.99,
            category: 'appetizers',
            image: '🍞',
            available: true
        },
        {
            _id: '5',
            name: 'Chocolate Cake',
            description: 'Rich chocolate layer cake with ganache',
            price: 8.99,
            category: 'desserts',
            image: '🍰',
            available: true
        },
        {
            _id: '6',
            name: 'Tiramisu',
            description: 'Classic Italian dessert with coffee and mascarpone',
            price: 9.99,
            category: 'desserts',
            image: '🍮',
            available: true
        },
        {
            _id: '7',
            name: 'Fresh Juice',
            description: 'Freshly squeezed orange juice',
            price: 5.99,
            category: 'beverages',
            image: '🧃',
            available: true
        },
        {
            _id: '8',
            name: 'Coffee',
            description: 'Freshly brewed coffee',
            price: 3.99,
            category: 'beverages',
            image: '☕',
            available: true
        },
        {
            _id: '9',
            name: 'Steak',
            description: 'Prime ribeye steak cooked to your preference',
            price: 32.99,
            category: 'main-course',
            image: '🥩',
            available: true
        },
        {
            _id: '10',
            name: 'Chicken Wings',
            description: 'Crispy chicken wings with your choice of sauce',
            price: 14.99,
            category: 'appetizers',
            image: '🍗',
            available: true
        }
    ];

    displayMenuItems(menuItems);
}

function displayMenuItems(items) {
    const menuGrid = document.getElementById('menu-grid');
    
    if (items.length === 0) {
        menuGrid.innerHTML = '<p class="text-center">No items found.</p>';
        return;
    }

    menuGrid.innerHTML = items.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <div class="menu-item-image">${item.image || '🍽️'}</div>
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-price">$${item.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart('${item._id}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            if (category === 'all') {
                displayMenuItems(menuItems);
            } else {
                const filtered = menuItems.filter(item => item.category === category);
                displayMenuItems(filtered);
            }
        });
    });
}

function addToCart(itemId) {
    const item = menuItems.find(i => i._id === itemId);
    if (!item) return;
    
    const existingItem = cart.find(i => i._id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCart();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item._id !== itemId);
    updateCart();
}

function updateQuantity(itemId, change) {
    const item = cart.find(i => i._id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.innerHTML = '';
        checkoutBtn.style.display = 'none';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartContainer.innerHTML = cart.map(item => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 5px;">
            <div>
                <strong>${item.name}</strong>
                <div style="display: flex; gap: 0.5rem; align-items: center; margin-top: 0.5rem;">
                    <button onclick="updateQuantity('${item._id}', -1)" class="btn" style="padding: 5px 10px;">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item._id}', 1)" class="btn" style="padding: 5px 10px;">+</button>
                </div>
            </div>
            <div style="text-align: right;">
                <div>$${(item.price * item.quantity).toFixed(2)}</div>
                <button onclick="removeFromCart('${item._id}')" style="color: red; background: none; border: none; cursor: pointer; margin-top: 0.5rem;">Remove</button>
            </div>
        </div>
    `).join('');
    
    cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    checkoutBtn.style.display = 'block';
}

function setupCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const modal = document.getElementById('checkout-modal');
    const closeBtn = document.querySelector('.close');
    const checkoutForm = document.getElementById('checkout-form');
    
    checkoutBtn.addEventListener('click', function() {
        updateOrderSummary();
        modal.style.display = 'block';
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    checkoutForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            customer_name: document.getElementById('customer-name').value,
            customer_email: document.getElementById('customer-email').value,
            customer_phone: document.getElementById('customer-phone').value,
            delivery_address: document.getElementById('delivery-address').value,
            items: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
        
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Order placed successfully! Order ID: ' + data.id);
                cart = [];
                updateCart();
                modal.style.display = 'none';
                checkoutForm.reset();
            } else {
                alert('Error placing order: ' + data.error);
            }
        } catch (error) {
            alert('Error placing order. Please try again.');
            console.error('Error:', error);
        }
    });
}

function updateOrderSummary() {
    const summaryContainer = document.getElementById('order-summary');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    summaryContainer.innerHTML = `
        ${cart.map(item => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('')}
        <hr>
        <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 1rem;">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
}
