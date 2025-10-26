from flask import Blueprint
from .menu_controller import get_menu

menu_bp = Blueprint('menu',__name__, url_prefix= '/api/v1/menu')

@menu_bp.route('/', methods = ['GET'])
def get_all_menu():
    return get_menu()


