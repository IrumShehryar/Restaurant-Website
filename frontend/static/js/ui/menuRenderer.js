export function renderItemDetail(item) {
	// Return minimal, well-formed HTML for the modal content.
	// Keep it simple — styling can be added later.
	const allergens = Array.isArray(item.allergens) ? item.allergens.join(', ') : ''
	const dietary = item.dietary || ''
	const img = item.image ? `<img src="${item.image}" alt="${item.name}" />` : ''

	return `
<div class="menu-detail">
	<h2>${item.name}</h2>
	<p>${item.description}</p>
	<p>${img}</p>
	<p>${dietary}</p>
	<p>${allergens}</p>
	<p><strong>${item.price}€</strong></p>
	<button id="modal-close">Close</button>
</div>
`
}



