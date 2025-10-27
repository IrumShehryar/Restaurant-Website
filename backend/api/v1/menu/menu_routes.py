from flask import Blueprint
from .menu_controller import get_menu,get_menu_item_controller

menu_bp = Blueprint('menu',__name__, url_prefix= '/api/v1/menu')

@menu_bp.route('/', methods = ['GET'])
def get_all_menu_route():
    return get_menu()


@menu_bp.route('/<item_id>', methods =['GET'])
def get_menu_item_route(item_id):
    return get_menu_item_controller(item_id)