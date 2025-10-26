from flask import jsonify
from .menu_model import list_all_menu_items

def get_menu():
    items = list_all_menu_items()
    return items,200