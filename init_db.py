"""
Sample data initialization script for the restaurant database.
Run this script after setting up MongoDB to populate the database with sample menu items.
"""

from pymongo import MongoClient
import os
from datetime import datetime

# MongoDB connection
MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/restaurant_db")
client = MongoClient(MONGO_URI)
db = client.restaurant_db

def init_menu():
    """Initialize menu collection with sample items"""
    print("Initializing menu items...")
    
    menu_items = [
        {
            'name': 'Grilled Salmon',
            'description': 'Fresh Atlantic salmon grilled to perfection with herbs and lemon',
            'price': 24.99,
            'category': 'main-course',
            'image': '🐟',
            'available': True
        },
        {
            'name': 'Pasta Carbonara',
            'description': 'Classic Italian pasta with bacon, eggs, and parmesan cheese',
            'price': 18.99,
            'category': 'main-course',
            'image': '🍝',
            'available': True
        },
        {
            'name': 'Ribeye Steak',
            'description': 'Prime ribeye steak cooked to your preference with garlic butter',
            'price': 32.99,
            'category': 'main-course',
            'image': '🥩',
            'available': True
        },
        {
            'name': 'Chicken Parmesan',
            'description': 'Breaded chicken breast with marinara sauce and melted cheese',
            'price': 19.99,
            'category': 'main-course',
            'image': '🍗',
            'available': True
        },
        {
            'name': 'Caesar Salad',
            'description': 'Fresh romaine lettuce with Caesar dressing and parmesan',
            'price': 12.99,
            'category': 'appetizers',
            'image': '🥗',
            'available': True
        },
        {
            'name': 'Bruschetta',
            'description': 'Toasted bread with tomatoes, garlic, and basil',
            'price': 9.99,
            'category': 'appetizers',
            'image': '🍞',
            'available': True
        },
        {
            'name': 'Chicken Wings',
            'description': 'Crispy chicken wings with your choice of sauce',
            'price': 14.99,
            'category': 'appetizers',
            'image': '🍗',
            'available': True
        },
        {
            'name': 'Mozzarella Sticks',
            'description': 'Golden fried mozzarella sticks with marinara sauce',
            'price': 10.99,
            'category': 'appetizers',
            'image': '🧀',
            'available': True
        },
        {
            'name': 'Chocolate Cake',
            'description': 'Rich chocolate layer cake with chocolate ganache',
            'price': 8.99,
            'category': 'desserts',
            'image': '🍰',
            'available': True
        },
        {
            'name': 'Tiramisu',
            'description': 'Classic Italian dessert with coffee and mascarpone',
            'price': 9.99,
            'category': 'desserts',
            'image': '🍮',
            'available': True
        },
        {
            'name': 'Cheesecake',
            'description': 'New York style cheesecake with berry compote',
            'price': 8.99,
            'category': 'desserts',
            'image': '🍰',
            'available': True
        },
        {
            'name': 'Ice Cream',
            'description': 'Three scoops of artisan ice cream',
            'price': 6.99,
            'category': 'desserts',
            'image': '🍨',
            'available': True
        },
        {
            'name': 'Fresh Orange Juice',
            'description': 'Freshly squeezed orange juice',
            'price': 5.99,
            'category': 'beverages',
            'image': '🧃',
            'available': True
        },
        {
            'name': 'Coffee',
            'description': 'Freshly brewed coffee',
            'price': 3.99,
            'category': 'beverages',
            'image': '☕',
            'available': True
        },
        {
            'name': 'Iced Tea',
            'description': 'Refreshing iced tea',
            'price': 3.99,
            'category': 'beverages',
            'image': '🥤',
            'available': True
        },
        {
            'name': 'Soft Drink',
            'description': 'Choice of cola, sprite, or other sodas',
            'price': 2.99,
            'category': 'beverages',
            'image': '🥤',
            'available': True
        }
    ]
    
    # Clear existing menu items
    db.menu.delete_many({})
    
    # Insert sample menu items
    result = db.menu.insert_many(menu_items)
    print(f"✓ Inserted {len(result.inserted_ids)} menu items")

def clear_all_data():
    """Clear all data from collections"""
    print("Clearing existing data...")
    db.menu.delete_many({})
    db.reservations.delete_many({})
    db.orders.delete_many({})
    db.contacts.delete_many({})
    print("✓ All data cleared")

def main():
    print("=" * 50)
    print("Restaurant Database Initialization")
    print("=" * 50)
    
    try:
        # Test connection
        client.server_info()
        print("✓ Connected to MongoDB")
        
        # Clear old data
        clear_all_data()
        
        # Initialize menu
        init_menu()
        
        print("\n" + "=" * 50)
        print("Database initialization complete!")
        print("=" * 50)
        
    except Exception as e:
        print(f"✗ Error: {e}")
        print("\nMake sure MongoDB is running and accessible.")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
