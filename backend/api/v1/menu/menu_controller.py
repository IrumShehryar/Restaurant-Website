"""Controller helpers for the menu JSON API.

These functions are thin wrappers around the model and format API-style
JSON responses with proper HTTP status codes. They are invoked by the
Flask route functions in ``menu_routes.py``.
"""

from flask import jsonify
from .menu_model import list_all_menu_items, get_menu_by_id


def get_menu():
    """Return a JSON response with the full menu list.

    Returns:
        tuple: (Response, status_code) — JSON array of items and HTTP 200.
    """
    items = list_all_menu_items()
    return jsonify(items), 200


def get_menu_item_controller(item_id):
    """Return JSON for a single menu item.

    This function validates that ``item_id`` can be converted to an int and
    returns the appropriate HTTP status codes:

    - 200: item found, JSON payload returned
    - 400: malformed input (non-integer id)
    - 404: item not found

    Args:
        item_id (str|int): The id value as passed from the route.

    Returns:
        tuple: (Response, status_code)
    """
    try:
        item_id_int = int(item_id)
    except (ValueError, TypeError):
        return jsonify({"error": "malformed input"}), 400

    item = get_menu_by_id(item_id_int)
    if item:
        return jsonify(item), 200
    return jsonify({"error": "Item not found"}), 404

