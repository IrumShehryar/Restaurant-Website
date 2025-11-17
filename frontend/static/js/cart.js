// In-memory cart, always synced with localStorage
let cart = [];

// ----------------------------------------------
// Load and save cart from/to localStorage
// ----------------------------------------------
function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem("cart");
    cart = raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to parse cart from localStorage:", err);
    cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (err) {
    console.error("Failed to write cart to localStorage:", err);
  }
}

// ----------------------------------------------
// Floating Cart Button
// ----------------------------------------------
function showCartButton() {
  let cartBtn = document.getElementById("floating-cart-btn");

  if (!cartBtn) {
    cartBtn = document.createElement("div");
    cartBtn.id = "floating-cart-btn";
    cartBtn.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #00ff88;
      color: #0b0b0b;
      padding: 1rem 1.5rem;
      border-radius: 50px;
      font-weight: bold;
      cursor: pointer;
      z-index: 999;
      box-shadow: 0 4px 12px rgba(0, 255, 136, 0.4);
      transition: all 0.3s ease;
    `;

    cartBtn.addEventListener("click", () => {
      window.location.href = "/cart";
    });

    cartBtn.addEventListener("mouseover", () => {
      cartBtn.style.transform = "scale(1.05)";
      cartBtn.style.boxShadow = "0 6px 16px rgba(0, 255, 136, 0.6)";
    });

    cartBtn.addEventListener("mouseout", () => {
      cartBtn.style.transform = "scale(1)";
      cartBtn.style.boxShadow = "0 4px 12px rgba(0, 255, 136, 0.4)";
    });

    document.body.appendChild(cartBtn);
  }

  // Update text & count
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  cartBtn.textContent = `🛒 View Cart (${totalItems})`;
  cartBtn.style.display = "block";
}

// ----------------------------------------------
// Notification Popup
// ----------------------------------------------
function showNotification(message) {
  let notification = document.getElementById("notification");

  if (!notification) {
    notification = document.createElement("div");
    notification.id = "notification";
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 2rem;
      background: #00ff88;
      color: #0b0b0b;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-weight: bold;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 255, 136, 0.4);
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
  }

  notification.textContent = message;
  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 2000);
}

// Add notification keyframe animation
(function addAnimation() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to   { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
})();

// ----------------------------------------------
// Add to Cart (main function)
// ----------------------------------------------
export function addToCart(item) {
  const id = item._id || item.id;
  if (!id) {
    console.error("addToCart: item has no id/_id", item);
    return;
  }

  // Always load latest state
  loadCartFromStorage();

  // Check if exists
  const existing = cart.find((i) => (i._id || i.id) === id);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      ...item,
      quantity: 1,
    });
  }

  // Persist
  saveCartToStorage();

  // UI updates
  showCartButton();
  showNotification(`${item.name} added to cart!`);

  console.log("Cart updated:", cart);
}

// ----------------------------------------------
// Initialize on menu page
// ----------------------------------------------
export function initCartUI() {
  loadCartFromStorage();
  showCartButton(); // show button immediately if cart has items
  console.log("Cart initialized:", cart);
}