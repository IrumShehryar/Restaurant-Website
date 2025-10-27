/**
 * Build and return a single "menu card" element for a given item.
 * The card shows the item's name, category, price, and action buttons.
 * It also emits a custom "show-detail" event when the Details button is clicked.
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

  // Return the fully constructed card so the caller can append it to the list.
  return el;
}
