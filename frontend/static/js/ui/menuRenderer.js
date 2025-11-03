/**
 * Render item detail for the modal.
 *
 * Returns a small HTML snippet (string) used as the modal content. The
 * returned fragment includes a button with id="modal-close" which the
 * modal factory automatically wires to close the modal when clicked.
 *
 * @param {Object} item - Menu item object from the API.
 * @returns {string} HTML string representing the item details.
 */
export function renderItemDetail(item) {
	// Return minimal, well-formed HTML for the modal content.
	// Keep it simple — styling can be added later.
	const allergens = Array.isArray(item.allergens) ? item.allergens.join(', ') : ''
	const dietary = Array.isArray(item.dietary) ? item.dietary.join(', ') : (item.dietary || '')
	const img = item.image ? `<img src="${item.image}" alt="${item.name}" />` : ''

	return `
<div class="menu-detail">
	<h2>${item.name}</h2>
	<p>${item.description}</p>
	<p>${img}</p>
	<p>Diet: ${dietary}</p>
	<p>Allergens: ${allergens}</p>
	<p><strong>${item.price}€</strong></p>
	<button id="modal-close">Close</button>
</div>
`
}



