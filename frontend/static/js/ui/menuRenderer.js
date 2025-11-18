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

	// Ingredients: support either an array of strings or array of objects {name, description}
	let ingredientsHTML = '';
	if (Array.isArray(item.ingredients) && item.ingredients.length) {
		const listItems = item.ingredients.map(ing => {
			if (!ing) return '';
			if (typeof ing === 'string') return `<li>${ing}</li>`;
			// assume object with name and optional description
			const name = ing.name || '';
			const desc = ing.description ? `: ${ing.description}` : '';
			return `<li><strong>${name}</strong>${desc}</li>`;
		}).join('');
		ingredientsHTML = `\n\t\t<div class="menu-detail__ingredients">\n\t\t\t<h4>Ingredients</h4>\n\t\t\t<ul>${listItems}</ul>\n\t\t</div>`;
	}
	return `
<div class="menu-detail">
	<div class="menu-detail__body">
		<h2>${item.name}</h2>
		<p class="menu-detail__desc">${item.description}</p>
		<p class="menu-detail__meta menu-detail__meta--dietary">Diet: ${dietary || 'None'}</p>
		<p class="menu-detail__meta menu-detail__meta--allergens">Allergens: ${allergens || 'None'}</p>
		${ingredientsHTML}
		<p class="menu-detail__price"><strong>${item.price}€</strong></p>
		<button id="modal-close">Close</button>
	</div>
	<div class="menu-detail__img">${img}</div>
</div>
`
}



