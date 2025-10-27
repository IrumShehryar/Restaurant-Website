// Page controller for the menu page.
//
// Responsibilities:
// - load the menu list from the service
// - render menu cards
// - respond to card events (open detail modal)

import { getAllMenu, getMenuById } from "./services/menuService.js";
import { createMenuCard } from "./components/menuCard.js";
import { renderItemDetail } from './ui/menuRenderer.js';
import { createModal } from './components/Modal.js';

/**
 * Load the menu list into the #menuList container.
 * Steps:
 *  1) Show a loading state
 *  2) Fetch items
 *  3) Render cards efficiently using a DocumentFragment
 *  4) Handle empty results and errors
 *
 * @returns {Promise<void>}
 */
async function loadMenu() {
  const el = document.getElementById("menuList");
  if (!el) return;

  el.textContent = "Loading...";

  try {
    const items = await getAllMenu();
    el.innerHTML = "";

    if (Array.isArray(items) && items.length) {
      const frag = document.createDocumentFragment();
      items.forEach((i) => {
        const card = createMenuCard(i);
        frag.appendChild(card);
      });
      el.appendChild(frag);
    } else {
      el.textContent = "No items in the menu";
    }
  } catch (err) {
    el.textContent = "Failed to load the menu";
    console.error(err);
  }
}

const modal = createModal();

/**
 * Fetch a single item by id and show it in the modal.
 *
 * @param {number} id - The menu item id to load.
 */
async function showDetail(id) {
  try {
    const item = await getMenuById(id);
    modal.setContent(renderItemDetail(item));
    modal.open();
    // The modal factory also wires the element with id="modal-close" if present
    // However some renderers may not include it; the factory already handles wiring.
  } catch (err) {
    console.error("Show detail error:", err);
  }
}

// Initialize when DOM is available. Attach event listeners after #menuList exists
document.addEventListener("DOMContentLoaded", () => {
  loadMenu();

  const menuListEl = document.getElementById('menuList');
  if (menuListEl) {
    // Listen for custom 'show-detail' events dispatched by cards.
    menuListEl.addEventListener('show-detail', (e) => {
      const id = e.detail?.id;
      if (id != null) showDetail(Number(id));
    });
  }
});
