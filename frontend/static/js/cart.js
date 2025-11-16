// frontend/static/js/cart.js

/**
 * Temporary placeholder for cart logic.
 * Right now it just logs to the console so we can see it's wired correctly later.
 */
let cart = [];

function loadCartFromStorage() { /* */ }

function saveCartToStorage() { /* */ }

export function addToCart(item) {
    console.log("addToCart() from cart.js called with item:", item);
    saveCartToStorage();
    alert(`Added "${item.name}" to cart (total items: ${cart.length})`);
}

export function initCartUI() {
  loadCartFromStorage();
  console.log("Cart initialized on menu page:", cart);
}