/**
 * Menu card component
 *
 * Creates a DOM element representing a menu item. The card is intentionally
 * small — it holds the visible data and manages only the local UI (button
 * wiring). It emits a CustomEvent named "show-detail" when the Details
 * button is clicked so the page controller can respond.
 *
 * @param {Object} item - Menu item object from the API.
 * @param {number} item.id
 * @param {string} item.name
 * @param {string} item.category
 * @param {number} item.price
 * @returns {HTMLElement} A DOM node representing the card.
 */
export function createMenuCard(item) {
  // Create the root container for the card: <div class="menu-card">
  const el = document.createElement('div');
  el.className = 'menu-card';

  // Store the item id on the element as a data-* attribute so controllers can read it later.
  // Access in JS via el.dataset.id
  
  el.dataset.id = item.id;

  // Insert the card's inner structure.
  // NOTE: innerHTML is convenient, but if item fields may contain untrusted content,
  // prefer creating nodes and setting textContent to avoid injection.
  el.innerHTML = `
    <div class="menu-info">
      <!-- Title for the menu item -->
      <b class="menu-card__title">${item.name}</b>

      <!-- Meta line: category • price -->
      <div class="menu-card__meta">${item.category} • ${item.price}€</div>
    </div>

    <div class="menu-actions">
      <!-- "Details" button. Visible label is "Details".
           aria-label gives a more specific accessible name for screen readers,
           e.g., "Show details for Margherita Pizza". -->
      <button
        class="btn-detail"
        aria-label="Show details for ${item.name}">
        Details
      </button>

      <!-- "Add" button. We also put the id here for quick access via dataset. -->
      <button class="btn-add" data-id="${item.id}">Add</button>
    </div>
  `;

  // Find the Details button inside this card.
  const btn = el.querySelector('.btn-detail');

  // Guard in case markup changes and the selector fails.
  if (btn) {
    // Attach a click handler only to this card's Details button.
    btn.addEventListener('click', () => {
      // Emit a CustomEvent from the card element itself.
      // Name: "show-detail" — the controller can listen for this on a parent container.
      // bubbles: true allows the event to travel up the DOM (event bubbling),
      // so a single parent listener can handle all cards (event delegation).
      // detail carries the payload the controller needs (the item id).
      el.dispatchEvent(new CustomEvent('show-detail', {
        bubbles: true,
        detail: { id: item.id },
      }));
    });
  }

  // FIX: Added missing closing brace for btnAdd addEventListener block
  // ISSUE: Previous code had syntax error where closing brace was on same line as function,
  // preventing the return statement from executing. Now properly structured.
  const btnAdd = el.querySelector('.btn-add');
  // Guard in case markup changes and the selector fails.
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      // FIX: Added fallback to item._id in case item.id is missing
      // ISSUE: Some items might have _id instead of id field
      const itemId = item.id || item._id;
      if (itemId) {
        window.location.href=`/cart?item=${encodeURIComponent(itemId)}`
      } else {
        // DEBUG: Log error if both id and _id are missing
        console.error('Item ID is missing', item);
      }
    })
  }

  // Return the fully constructed card so the caller can append it to the list.
  return el;
}

