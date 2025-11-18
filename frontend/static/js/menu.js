// Page controller for the menu page.
// Responsibilities:
// - load the menu list from the service
// - render menu cards
// - respond to card events (open detail modal)

import { getAllMenu, getMenuById } from "./services/menuService.js";
import { createMenuCard } from "./components/menuCard.js";
import { renderItemDetail } from './ui/menuRenderer.js';
import { createModal } from './components/modal.js';
import { initCartUI } from "./cart.js";
/**
 * Load the menu list into the #menuList container.
 * 
 * Steps:
 *  1) Show a loading state
 *  2) Fetch items from menu service
 *  3) Render cards efficiently using DocumentFragment
 *  4) Handle empty results and errors gracefully
 *
 * @async
 * @function loadMenu
 * @returns {Promise<void>}
 * @throws {Error} If menu service fails to load items
 * 
 * @example
 * // Called on page load
 * await loadMenu();
 */
async function loadMenu() {
  const el = document.getElementById("menuList");
  if (!el) return;

  el.textContent = "Loading...";

  try {
    const items = await getAllMenu();

    // pick today's weekday name
    const todayName = new Date().toLocaleString(undefined, { weekday: 'long' }).toLowerCase();

    // find items that list today in their days_of_week array
    const today = items.filter(i => Array.isArray(i.days_of_week) && i.days_of_week.includes(todayName));

    // choose highlight: today's first, or featured, or first item
    const highlight = today[0] || items.find(i => i.featured) || items[0];

    const highlightRoot = document.getElementById('highlight-root');
    if (highlightRoot) {
      // Build a 3-column highlight grid: main highlight + two supporting slots
      const grid = document.createElement('div');
      grid.className = 'highlight-grid';

      // helper to create a highlight slot element
      const makeSlot = (it) => {
        const slot = document.createElement('div');
        slot.className = 'highlight-item';
        if (it) {
          // reuse the existing menu card to preserve buttons/events
          const card = createMenuCard(it);
          // small visual tweak marker for highlight cards
          card.classList.add('highlight-card-inner');
          slot.appendChild(card);
        } else {
          // placeholder slot
          slot.innerHTML = `
            <div class="placeholder-thumb"></div>
            <div class="highlight-body">
              <span class="highlight-title">Coming Soon</span>
            </div>
          `;
        }
        return slot;
      };

      // pick two supporting items: prefer dessert and drink categories, otherwise use other items
      const pickByCategory = (catNames, excludeIds=[]) => {
        return items.find(i => i && i.category && !excludeIds.includes(i.id) && catNames.some(c => i.category.toLowerCase().includes(c)));
      };

      const exclude = new Set();
      if (highlight) exclude.add(highlight.id || highlight._id);

      const dessert = pickByCategory(['dessert'], Array.from(exclude));
      if (dessert) exclude.add(dessert.id || dessert._id);

      const drink = pickByCategory(['drink','beverage','cocktail','drinkable'], Array.from(exclude));
      if (drink) exclude.add(drink.id || drink._id);

      // fallback: find any items not already used
      const pickFallback = (excludeIds=[]) => items.find(i => i && !excludeIds.includes(i.id) && !excludeIds.includes(i._id));

      const slotMain = makeSlot(highlight || items[0]);
      slotMain.classList.add('highlight-main');
      const slotDessert = makeSlot(dessert || pickFallback(Array.from(exclude)));
      // ensure unique second fallback
      const usedIds = new Set();
      [slotMain, slotDessert].forEach(s => { const c = s.querySelector('[data-id]'); if (c) usedIds.add(c.dataset.id); });
      const otherCandidate = items.find(i => i && !usedIds.has(String(i.id)) && !usedIds.has(String(i._id)));
      const slotOther = makeSlot(otherCandidate);

      grid.appendChild(slotMain);
      grid.appendChild(slotDessert);
      grid.appendChild(slotOther);

      // clear previous highlight contents and append grid
      highlightRoot.innerHTML = '';
      highlightRoot.appendChild(grid);
    }

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
 * Fetch a single menu item by ID and display it in the modal.
 * 
 * This function:
 * - Fetches item details from the menu service
 * - Renders the item in detail format
 * - Opens the modal with the rendered content
 * - Closes when user clicks the close button
 *
 * @async
 * @function showDetail
 * @param {number} id - The menu item ID to load and display
 * @returns {Promise<void>}
 * @throws {Error} If item fetch fails (logged to console)
 * 
 * @example
 * // Show menu item #5
 * await showDetail(5);
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
/**
 * Initialize the menu page when the DOM is ready.
 * 
 * Sets up:
 * - Initial menu list loading
 * - Event listener for custom 'show-detail' events from menu cards
 * 
 * @listens DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
  loadMenu();
  initCartUI();

  const menuListEl = document.getElementById('menuList');
  if (menuListEl) {
    // Listen for custom 'show-detail' events dispatched by cards.
    menuListEl.addEventListener('show-detail', (e) => {
    const id = e.detail?.id;
      // FIX: Removed Number(id) conversion that was causing NaN
      // ISSUE: MongoDB ObjectIds are strings (e.g., "691211b751476ba3fc35b9f5"), 
      // converting to Number results in NaN. Pass the string ID directly to the API.
      if (id != null) showDetail(id);
    });
  }

  // Fallback listener on document to catch events dispatched there if bubbling fails
  document.addEventListener('show-detail', (e) => {
    // If menuListEl contains the original target, the above listener will handle it — skip to avoid duplicates
    const id = e.detail?.id;
    if (menuListEl && e.target && menuListEl.contains(e.target)) return;
    if (id != null) showDetail(id);
  });
});
