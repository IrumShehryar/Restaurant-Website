"""Flask Blueprint exposing the menu JSON API.

Routes:
- GET /api/v1/menu/         -> returns list of menu items
- GET /api/v1/menu/<item_id> -> returns single item or 404

This module keeps route definitions tiny by delegating logic to the
controller helpers in ``menu_controller.py`` which return (response,
status) tuples.
"""

from flask import Blueprint
from .menu_controller import get_menu, get_menu_item_controller


menu_bp = Blueprint("menu", __name__, url_prefix="/api/v1/menu")


@menu_bp.route("/", methods=["GET"])
def get_all_menu_route():
    """Route: GET /api/v1/menu/

    Returns the full menu as JSON (HTTP 200).
    """
    return get_menu()


@menu_bp.route("/<item_id>", methods=["GET"])
def get_menu_item_route(item_id):
    """Route: GET /api/v1/menu/<item_id>

    Validates the item_id and returns the single item JSON or an error
    response from the controller when the id is malformed or missing.
    """
    return get_menu_item_controller(item_id)