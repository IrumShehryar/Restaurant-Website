# backend/api/v1/menu/menu_model.py

# backend/api/v1/menu/menu_model.py

# Mock data (16 items) for Revontulet Flamehouse
menu_items = [
    {
        "id": 1,
        "name": "Aurora Bites",
        "description": "Crispy potato bites tossed in northern spice, served with cool dill sauce.",
        "price": 5.50,
        "category": "starter",
        "image": "https://via.placeholder.com/480x320?text=Aurora+Bites",
        "dietary": ["vegetarian"],
        "allergens": ["milk"],
        "available_days": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    },
    {
        "id": 2,
        "name": "Nordic Salmon Skewers",
        "description": "Grilled salmon skewers with lemon-herb glaze and a side of dill mayo.",
        "price": 9.75,
        "category": "starter",
        "image": "https://via.placeholder.com/480x320?text=Nordic+Salmon+Skewers",
        "dietary": [],
        "allergens": ["fish"],
        "available_days": ["Friday","Saturday","Sunday"]
    },
    {
        "id": 3,
        "name": "Smoked Trout Salad",
        "description": "Mixed leaves, smoked trout flakes, pickled cucumber and horseradish cream.",
        "price": 8.95,
        "category": "starter",
        "image": "https://via.placeholder.com/480x320?text=Smoked+Trout+Salad",
        "dietary": [],
        "allergens": ["fish","dairy"],
        "available_days": ["Friday","Saturday"]
    },
    {
        "id": 4,
        "name": "Reindeer Stew",
        "description": "Slow-cooked reindeer with root vegetables and lingonberry jus.",
        "price": 14.50,
        "category": "main",
        "image": "https://via.placeholder.com/480x320?text=Reindeer+Stew",
        "dietary": [],
        "allergens": [],
        "available_days": ["Monday","Tuesday","Wednesday","Thursday","Friday"]
    },
    {
        "id": 5,
        "name": "Arctic Garden Bowl",
        "description": "Warm grain bowl with roasted squash, kale, chickpeas and tahini dressing.",
        "price": 12.00,
        "category": "main",
        "image": "https://via.placeholder.com/480x320?text=Arctic+Garden+Bowl",
        "dietary": ["vegan","gluten-free"],
        "allergens": ["sesame"],
        "available_days": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    },
    {
        "id": 6,
        "name": "Firewood Salmon",
        "description": "Oak-smoked salmon fillet, buttered new potatoes and seasonal greens.",
        "price": 16.50,
        "category": "main",
        "image": "https://via.placeholder.com/480x320?text=Firewood+Salmon",
        "dietary": [],
        "allergens": ["fish","dairy"],
        "available_days": ["Saturday","Sunday"]
    },
    {
        "id": 7,
        "name": "Midnight Burger",
        "description": "Grass-fed beef patty, melted cheese, caramelized onions and truffle mayo. Served with fries.",
        "price": 13.25,
        "category": "main",
        "image": "https://via.placeholder.com/480x320?text=Midnight+Burger",
        "dietary": [],
        "allergens": ["gluten","dairy","eggs"],
        "available_days": ["Monday","Tuesday","Wednesday","Thursday","Friday"]
    },
    {
        "id": 8,
        "name": "Fjord Falafel Wrap",
        "description": "Crispy falafel, pickled slaw and herb yogurt in a soft wrap.",
        "price": 9.00,
        "category": "main",
        "image": "https://via.placeholder.com/480x320?text=Fjord+Falafel+Wrap",
        "dietary": ["vegetarian"],
        "allergens": ["gluten","sesame","dairy"],
        "available_days": ["Wednesday","Thursday","Friday","Saturday"]
    },
    {
        "id": 9,
        "name": "Glazed Lingon Pancakes",
        "description": "Light pancakes topped with lingonberry compote and whipped cream.",
        "price": 6.25,
        "category": "dessert",
        "image": "https://via.placeholder.com/480x320?text=Glazed+Lingon+Pancakes",
        "dietary": ["vegetarian"],
        "allergens": ["gluten","eggs","dairy"],
        "available_days": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    },
    {
        "id": 10,
        "name": "Northern Lights Cheesecake",
        "description": "Velvety cheesecake with a citrus glaze and berry dust.",
        "price": 6.75,
        "category": "dessert",
        "image": "https://via.placeholder.com/480x320?text=Northern+Lights+Cheesecake",
        "dietary": ["vegetarian"],
        "allergens": ["dairy","eggs","gluten"],
        "available_days": ["Friday","Saturday","Sunday"]
    },
    {
        "id": 11,
        "name": "Crispy Fries",
        "description": "Hand-cut fries tossed with sea salt.",
        "price": 3.50,
        "category": "side",
        "image": "https://via.placeholder.com/480x320?text=Crispy+Fries",
        "dietary": ["vegan"],
        "allergens": [],
        "available_days": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    },
    {
        "id": 12,
        "name": "Midnight Berry Parfait",
        "description": "Layers of yogurt, granola and midnight berries.",
        "price": 5.95,
        "category": "dessert",
        "image": "https://via.placeholder.com/480x320?text=Midnight+Berry+Parfait",
        "dietary": ["vegetarian"],
        "allergens": ["nuts","dairy","gluten"],
        "available_days": ["Friday","Saturday"]
    },
    {
        "id": 13,
        "name": "Cloudberry Spritz",
        "description": "Refreshing cloudberry soda with a hint of lemon.",
        "price": 3.50,
        "category": "drink",
        "image": "https://via.placeholder.com/480x320?text=Cloudberry+Spritz",
        "dietary": ["vegan"],
        "allergens": [],
        "available_days": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    },
    {
        "id": 14,
        "name": "Birch Latte",
        "description": "Warm birch-infused latte (decaf option available).",
        "price": 3.00,
        "category": "drink",
        "image": "https://via.placeholder.com/480x320?text=Birch+Latte",
        "dietary": ["vegetarian"],
        "allergens": ["dairy"],
        "available_days": ["Monday","Tuesday","Wednesday","Thursday","Friday"]
    },
    {
        "id": 15,
        "name": "Sparkling Sea Tonic",
        "description": "Herbal sparkling tonic with sea-salt rim and citrus twist.",
        "price": 4.25,
        "category": "drink",
        "image": "https://via.placeholder.com/480x320?text=Sparkling+Sea+Tonic",
        "dietary": ["vegan"],
        "allergens": [],
        "available_days": ["Monday","Tuesday","Wednesday","Thursday","Friday"]
    },
    {
        "id": 16,
        "name": "Chef's Northern Special",
        "description": "Rotating chef special — ask for today's creation.",
        "price": 17.50,
        "category": "special",
        "image": "https://via.placeholder.com/480x320?text=Chefs+Northern+Special",
        "dietary": [],
        "allergens": [],
        "available_days": ["Saturday"]
    }
]


def list_all_menu_items():
    """Return all menu items (mock)."""
    return menu_items


def get_menu_by_id(item_id):
    """Return single menu item by id or None."""
    for item in menu_items:
        if item["id"] == (item_id):
            return item
    return None
