// menu.js
// Controller for the Menu page.
// -----------------------------------------
// Responsibilities:
//  - Load menu items from the backend
//  - Render them in a responsive 3-column grid
//  - Handle clicks to open detail modal
// -----------------------------------------

import { getAllMenu, getMenuById } from "./services/menuService.js";
import { createMenuCard } from "./components/menuCard.js";
import { renderItemDetail } from "./ui/menuRenderer.js";
import { createModal } from "./components/modal.js";

/**
 * Load and render all menu items into the #menuList grid.
 */
async function loadMenu() {
  const container = document.getElementById("menuList");
  if (!container) return;

  container.textContent = "Loading menu...";

  try {
    const items = await getAllMenu();
    container.innerHTML = "";

    if (Array.isArray(items) && items.length > 0) {
      const fragment = document.createDocumentFragment();

      items.forEach((item) => {
        const card = createMenuCard(item);
        card.classList.add("menu-card");
        fragment.appendChild(card);
      });

      container.appendChild(fragment);
    } else {
      container.textContent = "No menu items available at the moment.";
    }
  } catch (error) {
    console.error("Error loading menu:", error);
    container.textContent = "Failed to load menu. Please try again later.";
  }
}

// Create a modal instance for showing details
const modal = createModal();

/**
 * Fetch and display details for a single menu item in the modal.
 * @param {string} id - The ID of the menu item to fetch.
 */
async function showDetail(id) {
  try {
    const item = await getMenuById(id);
    if (!item) {
      console.warn("Item not found:", id);
      return;
    }

    modal.setContent(renderItemDetail(item));
    modal.open();
  } catch (error) {
    console.error("Error showing item detail:", error);
  }
}

/**
 * Initialize page when DOM is ready.
 */
document.addEventListener("DOMContentLoaded", () => {
  loadMenu();

  const container = document.getElementById("menuList");
  if (!container) return;

  // Listen for custom 'show-detail' event dispatched from menu cards
  container.addEventListener("show-detail", (event) => {
    const id = event.detail?.id;
    if (id) showDetail(id);
  });
});
