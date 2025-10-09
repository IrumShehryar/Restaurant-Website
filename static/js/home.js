// Load popular dishes on home page
document.addEventListener('DOMContentLoaded', function() {
    loadPopularDishes();
});

async function loadPopularDishes() {
    const container = document.getElementById('popular-dishes');
    
    // Sample popular dishes (in real app, this would come from API)
    const popularDishes = [
        {
            _id: '1',
            name: 'Grilled Salmon',
            description: 'Fresh Atlantic salmon with herbs',
            price: 24.99,
            category: 'main-course',
            image: '🐟'
        },
        {
            _id: '2',
            name: 'Pasta Carbonara',
            description: 'Classic Italian pasta with bacon',
            price: 18.99,
            category: 'main-course',
            image: '🍝'
        },
        {
            _id: '3',
            name: 'Caesar Salad',
            description: 'Fresh romaine with parmesan',
            price: 12.99,
            category: 'appetizers',
            image: '🥗'
        },
        {
            _id: '4',
            name: 'Chocolate Cake',
            description: 'Rich chocolate layer cake',
            price: 8.99,
            category: 'desserts',
            image: '🍰'
        }
    ];

    if (popularDishes.length === 0) {
        container.innerHTML = '<p class="text-center">No dishes available at the moment.</p>';
        return;
    }

    container.innerHTML = popularDishes.map(dish => `
        <div class="dish-card">
            <div class="dish-image">${dish.image || '🍽️'}</div>
            <div class="dish-content">
                <h3>${dish.name}</h3>
                <p>${dish.description}</p>
                <div class="dish-price">$${dish.price.toFixed(2)}</div>
            </div>
        </div>
    `).join('');
}
