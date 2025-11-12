// menu.js
// ---------------------------------------------
// Menu Page Controller (mock data version)
// ---------------------------------------------
// Loads sample menu data, renders it in a 3-column
// responsive grid, and shows a modal with details
// when an item is clicked.
// ---------------------------------------------

/**
 * STEP 1: (Later) import your real data services
 * Uncomment these once your API is ready.
 */
// import { getAllMenu, getMenuById } from "./services/menuService.js";

/**
 * STEP 2: Mock sample data for development
 */
const sampleMenuData = [
  {
    _id: "1",
    name: "Grilled Salmon with Lemon Butter",
    description:
      "Freshly grilled salmon fillet served with lemon butter sauce and seasonal veggies.",
    price: 18.5,
    image_url: "/static/assets/sample_salmon.jpg",
  },
  {
    _id: "2",
    name: "Classic Flamehouse Burger",
    description:
      "Juicy beef patty, cheddar cheese, crispy bacon, and our house special sauce.",
    price: 14.0,
    image_url: "/static/assets/sample_burger.jpg",
  },
  {
    _id: "3",
    name: "Spicy Chicken Wings",
    description:
      "Crispy wings tossed in a spicy glaze, served with ranch dressing.",
    price: 10.5,
    image_url: "/static/assets/sample_wings.jpg",
  },
  {
    _id: "4",
    name: "Mushroom Risotto",
    description:
      "Creamy Arborio rice with sautéed mushrooms, parmesan, and herbs.",
    price: 13.5,
    image_url: "/static/assets/sample_risotto.jpg",
  },
  {
    _id: "5",
    name: "BBQ Ribs",
    description:
      "Tender pork ribs glazed with smoky BBQ sauce, served with coleslaw.",
    price: 19.0,
    image_url: "/static/assets/sample_ribs.jpg",
  },
  {
    _id: "6",
    name: "Caesar Salad",
    description:
      "Crisp romaine lettuce, parmesan shavings, garlic croutons, and creamy dressing.",
    price: 9.0,
    image_url: "/static/assets/sample_salad.jpg",
  },
];

/**
 * Create a menu card element
 * @param {Object} item - menu item object
 * @returns {HTMLElement} card element
 */
function createMenuCard(item) {
  const card = document.createElement("div");
  card.classList.add("menu-card");

  card.innerHTML = `
    <img src="${item.image_url}" alt="${item.name}" />
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <p><strong>€${item.price.toFixed(2)}</strong></p>
    <div class="menu-actions">
      <button class="btn-add" data-id="${item._id}">Add to Cart</button>
    </div>
  `;

  card.querySelector(".btn-add").addEventListener("click", (e) => {
    e.stopPropagation();
    addToCart(item);
  });

  card.addEventListener("click", () => showDetail(item));
  return card;
}

/**
 * Add item to cart (localStorage)
 * @param {Object} item - menu item
 */
function addToCart(item) {
  // Get existing cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if item already in cart
  const existingItem = cart.find(i => i._id === item._id);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    item.quantity = 1;
    cart.push(item);
  }
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Show/update cart button
  showCartButton();
  
  // Show success message
  showNotification(`${item.name} added to cart!`);
}

/**
 * Show floating cart button at bottom
 */
function showCartButton() {
  let cartBtn = document.getElementById('floating-cart-btn');
  
  if (!cartBtn) {
    cartBtn = document.createElement('div');
    cartBtn.id = 'floating-cart-btn';
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
    cartBtn.addEventListener('click', () => {
      window.location.href = '/cart';
    });
    cartBtn.addEventListener('mouseover', () => {
      cartBtn.style.transform = 'scale(1.05)';
      cartBtn.style.boxShadow = '0 6px 16px rgba(0, 255, 136, 0.6)';
    });
    cartBtn.addEventListener('mouseout', () => {
      cartBtn.style.transform = 'scale(1)';
      cartBtn.style.boxShadow = '0 4px 12px rgba(0, 255, 136, 0.4)';
    });
    document.body.appendChild(cartBtn);
  }
  
  // Update cart count
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  cartBtn.textContent = `🛒 View Cart (${totalItems})`;
  cartBtn.style.display = 'block';
}

/**
 * Show notification
 */
function showNotification(message) {
  let notification = document.getElementById('notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'notification';
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
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 2000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(style);

/**
 * Display modal popup with item details
 * @param {Object} item - menu item
 */
function showDetail(item) {
  // Overlay
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  // Modal content
  const modal = document.createElement("div");
  modal.classList.add("modal-content");
  modal.innerHTML = `
    <span class="modal-close">&times;</span>
    <img src="${item.image_url}" alt="${item.name}" style="width:100%; border-radius:8px; margin-bottom:12px;">
    <h2>${item.name}</h2>
    <p>${item.description}</p>
    <p><strong>Price: €${item.price.toFixed(2)}</strong></p>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close actions
  modal.querySelector(".modal-close").addEventListener("click", () => {
    document.body.removeChild(overlay);
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  });
}

/**
 * Load and render menu items
 */
async function loadMenu() {
  const container = document.getElementById("menuList");
  if (!container) return;

  container.textContent = "Loading menu...";

  try {
    // Later replace this with:
    // const items = await getAllMenu();
    const items = sampleMenuData;

    container.innerHTML = "";

    if (Array.isArray(items) && items.length > 0) {
      const fragment = document.createDocumentFragment();
      items.forEach((item) => fragment.appendChild(createMenuCard(item)));
      container.appendChild(fragment);
    } else {
      container.textContent = "No menu items available.";
    }
  } catch (err) {
    console.error("Failed to load menu:", err);
    container.textContent = "Error loading menu.";
  }
}

// Initialize page when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadMenu();
});
