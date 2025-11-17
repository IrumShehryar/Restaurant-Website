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
	// resolve image source: keep absolute/full URLs, otherwise prefix the assets folder
	// encode filenames so spaces, apostrophes, etc. won't break the URL
	const imgSrc = item.image
		? (item.image.startsWith('/') || item.image.startsWith('http')
			? item.image
			: `/static/assets/${encodeURIComponent(item.image)}`)
		: null;
	// add a local fallback (hero-image.jpeg) when external image fails to load
	const img = imgSrc
		? `<img src="${imgSrc}" alt="${item.name}" onerror="this.onerror=null;this.src='/static/assets/hero-image.jpeg'" />`
		: ''
console.log('renderItemDetail item.image ->', item.image);
console.log('renderItemDetail resolved imgSrc ->', imgSrc);
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



