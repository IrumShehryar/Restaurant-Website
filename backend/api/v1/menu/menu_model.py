"""Mock menu model for the API.

This module provides in-memory mock data for development and two
small helper functions used by the controllers:

- list_all_menu_items() -> list[dict]
- get_menu_by_id(item_id: int) -> dict|None

The dataset is intentionally small and self-contained so the project can
run without a database during development and testing.
"""
from mongoengine import Document , StringField, FloatField, ListField, BooleanField
from bson import ObjectId
# Mock data (16 items) for Revontulet Flamehouse

class MenuItem(Document):
    
    name =  StringField (required = True)
    description= StringField()
    price = FloatField()
    category = StringField(required = True, choices = ["starter","main","dessert","side","drink","special"])
    image = StringField()
    dietary = ListField(StringField(choices =["vegetarian","vegan","gluten-free","dairy-free","pescatarian"]))
    allergens = ListField(StringField())
    # Simple ingredients list (strings). Kept optional for backward compatibility.
    ingredients = ListField(StringField())
    days_of_week = ListField(StringField())
    active = BooleanField()
    
    
"""
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

"""
def list_all_menu_items():
    """
    Retrieve all menu items from the MongoDB database.
    
    This function queries the MenuItem collection and returns all documents.
    Called by the controller to fetch the complete menu.
    
    Returns:
        QuerySet: MongoEngine QuerySet containing all MenuItem objects.
                  Each item is a MongoDB document with fields: name, price, 
                  category, description, dietary, allergens, days_of_week, active.
    
    Example:
        items = list_all_menu_items()
        for item in items:
            print(item.name, item.price)
    """
    return MenuItem.objects()


def get_menu_by_id(item_id):
    """
    Find a single menu item by its MongoDB ObjectId.
    
    Converts the string item_id to a MongoDB ObjectId, then searches the
    database. Returns None if the item is not found or if the conversion fails.
    
    Args:
        item_id (str): The MongoDB ObjectId as a string (e.g., "691211b751476ba3fc35b9f5")
    
    Returns:
        MenuItem | None: The MenuItem object if found, otherwise None.
    
    Example:
        item = get_menu_by_id("691211b751476ba3fc35b9f5")
        if item:
            print(item.name)
        else:
            print("Item not found")
    """
    try:
        return MenuItem.objects.get(id = ObjectId(item_id))
    except:
        return None
  
def add_menu_item(item_data):
    """
    Create and save a new menu item to the database.
    
    Extracts fields from the incoming request data using .get() to provide
    defaults if keys are missing. Creates a new MenuItem object and saves it
    to MongoDB.
    
    Args:
        item_data (dict): JSON data from the HTTP request containing:
                         - name (str, required): Item name
                         - description (str): Item description
                         - price (float): Item price
                         - category (str): One of ["starter", "main", "dessert", "side", "drink", "special"]
                         - image (str): URL to item image
                         - dietary (list): List of dietary labels (e.g., ["vegetarian", "vegan"])
                         - allergens (list): List of allergens (e.g., ["gluten", "dairy"])
                         - days_of_week (list): Days this item is available
                         - active (bool): Whether item is currently active (default: True)
    
    Returns:
        MenuItem: The newly created MenuItem object with MongoDB _id assigned.
    
    Example:
        data = {
            "name": "Aurora Bites",
            "price": 5.50,
            "category": "starter",
            "dietary": ["vegetarian"],
            "allergens": ["milk"]
        }
        new_item = add_menu_item(data)
        print(new_item.id)  # MongoDB ObjectId
    """
    new_item = MenuItem(
        name = item_data.get('name'),
        description = item_data.get('description'),
        price = item_data.get('price'),
        category = item_data.get('category'),
        image = item_data.get('image'),
        dietary = item_data.get('dietary',[]),
        allergens = item_data.get('allergens',[]),
        ingredients = item_data.get('ingredients', []),
        days_of_week = item_data.get('days_of_week',[]),
        active = item_data.get('active',True)
        
    )
    new_item.save()
    return new_item

def update_menu_item(item_id,item_data):
    """
    Update an existing menu item with new data.
    
    Finds the item by ID and updates only the fields provided in item_data.
    Uses MongoEngine's .update(**item_data) which performs a partial update
    (only specified fields are changed, others remain unchanged).
    
    Args:
        item_id (str): The MongoDB ObjectId as a string
        item_data (dict): Dictionary of fields to update (e.g., {"price": 12.99})
    
    Returns:
        MenuItem: The updated MenuItem object.
    
    Raises:
        DoesNotExist: If no item with that ID exists (caught by controller).
    
    Example:
        update_data = {"price": 12.99, "name": "Updated Name"}
        updated_item = update_menu_item("691211b751476ba3fc35b9f5", update_data)
    """
    # FIX: Added ObjectId() conversion for item_id
    # ISSUE: String ID must be converted to MongoDB ObjectId for database query
    item = MenuItem.objects.get(id=ObjectId(item_id))
    item.update(**item_data)
    # FIX: Re-fetch the updated item before returning
    # ISSUE: .update() doesn't return the updated document, so we fetch it again
    # to ensure the response contains the latest data
    return MenuItem.objects.get(id=ObjectId(item_id))

def delete_menu_item(item_id):
    """
    Delete a menu item from the database.
    
    Finds the item by ID and removes it from MongoDB completely.
    
    Args:
        item_id (str): The MongoDB ObjectId as a string
    
    Returns:
        dict: A success message dictionary {"message": "Item deleted successfully"}
    
    Raises:
        DoesNotExist: If no item with that ID exists (caught by controller).
    
    Example:
        result = delete_menu_item("691211b751476ba3fc35b9f5")
        print(result)  # {"message": "Item deleted successfully"}
    """
    # FIX: Added ObjectId() conversion for item_id
    # ISSUE: String ID must be converted to MongoDB ObjectId for database query
    MenuItem.objects.get(id=ObjectId(item_id)).delete()
    return{"message": "Item deleted successfully"}