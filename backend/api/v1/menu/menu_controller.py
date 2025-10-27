from flask import jsonify
from .menu_model import list_all_menu_items , get_menu_by_id

def get_menu():
    items = list_all_menu_items()
    return jsonify(items),200

def get_menu_item_controller(item_id):
    try:
        item_id_int =  int(item_id)   
    except (ValueError, TypeError):
        return jsonify({"error": "malformed input"}), 400

    item = get_menu_by_id(item_id_int)
    if item:
       return jsonify(item), 200
    return jsonify({"error": "Item not found"}), 404

