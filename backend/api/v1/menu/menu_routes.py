"""Flask Blueprint exposing the menu JSON API.

Routes:
- GET /api/v1/menu/         -> returns list of menu items
- GET /api/v1/menu/<item_id> -> returns single item or 404

This module keeps route definitions tiny by delegating logic to the
controller helpers in ``menu_controller.py`` which return (response,
status) tuples.
"""

from flask import Blueprint
from .menu_controller import get_menu,get_menu_item_controller, create_menu_item_controller, update_menu_item_controller,delete_menu_item_controller


menu_bp = Blueprint("menu", __name__, url_prefix="/api/v1/menu")


@menu_bp.route("/", methods=["GET"])
def get_all_menu_route():
    """
    @api {get} /menu Get All Menu Items
    @apiName GetAllMenu
    @apiGroup Menu
    @apiVersion 1.0.0
    
    @apiSuccess {Object[]} items List of menu items
    @apiSuccess {String} items._id MongoDB ObjectId
    @apiSuccess {String} items.id Item ID (string)
    @apiSuccess {String} items.name Item name
    @apiSuccess {Number} items.price Item price
    @apiSuccess {String} items.category Item category (starter|main|dessert|side|drink|special)
    @apiSuccess {String} items.description Item description
    @apiSuccess {String[]} items.dietary Dietary labels (vegetarian|vegan|gluten-free|dairy-free)
    @apiSuccess {String[]} items.allergens Allergens list
    @apiSuccess {String[]} items.days_of_week Days available
    @apiSuccess {Boolean} items.active Is item active
    
    @apiSuccessExample Success-Response:
        HTTP/1.1 200 OK
        [
            {
                "_id": {"$oid": "691211b751476ba3fc35b9f5"},
                "id": "691211b751476ba3fc35b9f5",
                "name": "Aurora Bites",
                "price": 5.50,
                "category": "starter",
                "description": "Crispy potato bites...",
                "dietary": ["vegetarian"],
                "allergens": ["milk"],
                "days_of_week": ["Monday", "Tuesday", ...],
                "active": true
            }
        ]
    """
    return get_menu()


@menu_bp.route("/<item_id>", methods=["GET"])
def get_menu_item_route(item_id):
    """
    @api {get} /menu/:id Get Single Menu Item
    @apiName GetMenuItem
    @apiGroup Menu
    @apiVersion 1.0.0
    
    @apiParam {String} id Menu item MongoDB ObjectId
    
    @apiSuccess {Object} item Menu item object
    @apiSuccess {String} item._id MongoDB ObjectId
    @apiSuccess {String} item.id Item ID (string)
    @apiSuccess {String} item.name Item name
    @apiSuccess {Number} item.price Item price
    
    @apiSuccessExample Success-Response:
        HTTP/1.1 200 OK
        {
            "_id": {"$oid": "691211b751476ba3fc35b9f5"},
            "id": "691211b751476ba3fc35b9f5",
            "name": "Aurora Bites",
            "price": 5.50
        }
    
    @apiError ItemNotFound Item not found
    @apiErrorExample Error-Response:
        HTTP/1.1 400 Bad Request
        {"error": "Item not found"}
    """
    return get_menu_item_controller(item_id)

@menu_bp.route("/",methods = ["POST"])
def create_menu():
    """
    @api {post} /menu Create New Menu Item
    @apiName CreateMenuItem
    @apiGroup Menu
    @apiVersion 1.0.0
    
    @apiBody {String} name Item name (required)
    @apiBody {String} description Item description
    @apiBody {Number} price Item price (required)
    @apiBody {String} category Item category (required)
    @apiBody {String} image Image URL
    @apiBody {String[]} dietary Dietary labels
    @apiBody {String[]} allergens Allergens
    @apiBody {String[]} days_of_week Days available
    @apiBody {Boolean} active Is active (default: true)
    
    @apiExample {json} Request-Example:
        {
            "name": "Aurora Bites",
            "description": "Crispy potato bites...",
            "price": 5.50,
            "category": "starter"
        }
    
    @apiSuccess {Object} item Created item
    
    @apiSuccessExample Success-Response:
        HTTP/1.1 200 OK
        {
            "_id": {"$oid": "691211b751476ba3fc35b9f5"},
            "name": "Aurora Bites",
            "price": 5.50
        }
    """
    return create_menu_item_controller()

@menu_bp.route("/<item_id>", methods =["PUT"])
def update_menu(item_id):
    """
    @api {put} /menu/:id Update Menu Item
    @apiName UpdateMenuItem
    @apiGroup Menu
    @apiVersion 1.0.0
    
    @apiParam {String} id Menu item MongoDB ObjectId
    
    @apiBody {String} [name] Item name
    @apiBody {Number} [price] Item price
    @apiBody {String[]} [allergens] Allergens
    
    @apiExample {json} Request-Example:
        {
            "price": 7.99,
            "name": "Updated Name"
        }
    
    @apiSuccess {Object} item Updated item
    
    @apiSuccessExample Success-Response:
        HTTP/1.1 200 OK
        {
            "_id": {"$oid": "691211b751476ba3fc35b9f5"},
            "name": "Updated Name",
            "price": 7.99
        }
    
    @apiError ItemNotFound Item not found
    @apiErrorExample Error-Response:
        HTTP/1.1 404 Not Found
        {"error": "Item not found"}
    """
    return update_menu_item_controller(item_id)

@menu_bp.route("/<item_id>", methods = ["DELETE"])
def delete_menu(item_id):
    """
    @api {delete} /menu/:id Delete Menu Item
    @apiName DeleteMenuItem
    @apiGroup Menu
    @apiVersion 1.0.0
    
    @apiParam {String} id Menu item MongoDB ObjectId
    
    @apiSuccess {String} message Success message
    
    @apiSuccessExample Success-Response:
        HTTP/1.1 200 OK
        {"message": "Item deleted successfully"}
    
    @apiError ItemNotFound Item not found
    @apiErrorExample Error-Response:
        HTTP/1.1 404 Not Found
        {"error": "Item not found"}
    """
    return delete_menu_item_controller(item_id)