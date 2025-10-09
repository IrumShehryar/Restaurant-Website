from flask import Flask, render_template, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from datetime import datetime
import os

app = Flask(__name__)

# MongoDB Configuration
app.config["MONGO_URI"] = os.environ.get("MONGO_URI", "mongodb://localhost:27017/restaurant_db")
mongo = PyMongo(app)

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/reservations')
def reservations():
    return render_template('reservations.html')

# API Endpoints
@app.route('/api/menu', methods=['GET'])
def get_menu():
    """Get all menu items"""
    try:
        menu_items = list(mongo.db.menu.find())
        for item in menu_items:
            item['_id'] = str(item['_id'])
        return jsonify(menu_items), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/menu', methods=['POST'])
def add_menu_item():
    """Add a new menu item"""
    try:
        data = request.json
        result = mongo.db.menu.insert_one({
            'name': data['name'],
            'description': data['description'],
            'price': data['price'],
            'category': data['category'],
            'image': data.get('image', ''),
            'available': data.get('available', True)
        })
        return jsonify({"message": "Menu item added", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/reservations', methods=['POST'])
def make_reservation():
    """Create a new reservation"""
    try:
        data = request.json
        result = mongo.db.reservations.insert_one({
            'name': data['name'],
            'email': data['email'],
            'phone': data['phone'],
            'date': data['date'],
            'time': data['time'],
            'guests': data['guests'],
            'message': data.get('message', ''),
            'status': 'pending',
            'created_at': datetime.utcnow()
        })
        return jsonify({"message": "Reservation submitted successfully", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/reservations', methods=['GET'])
def get_reservations():
    """Get all reservations"""
    try:
        reservations = list(mongo.db.reservations.find())
        for reservation in reservations:
            reservation['_id'] = str(reservation['_id'])
            if 'created_at' in reservation:
                reservation['created_at'] = reservation['created_at'].isoformat()
        return jsonify(reservations), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/orders', methods=['POST'])
def create_order():
    """Create a new order"""
    try:
        data = request.json
        result = mongo.db.orders.insert_one({
            'customer_name': data['customer_name'],
            'customer_email': data['customer_email'],
            'customer_phone': data['customer_phone'],
            'items': data['items'],
            'total': data['total'],
            'delivery_address': data.get('delivery_address', ''),
            'status': 'pending',
            'created_at': datetime.utcnow()
        })
        return jsonify({"message": "Order placed successfully", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/orders', methods=['GET'])
def get_orders():
    """Get all orders"""
    try:
        orders = list(mongo.db.orders.find())
        for order in orders:
            order['_id'] = str(order['_id'])
            if 'created_at' in order:
                order['created_at'] = order['created_at'].isoformat()
        return jsonify(orders), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    """Submit contact form"""
    try:
        data = request.json
        result = mongo.db.contacts.insert_one({
            'name': data['name'],
            'email': data['email'],
            'subject': data['subject'],
            'message': data['message'],
            'created_at': datetime.utcnow()
        })
        return jsonify({"message": "Message sent successfully", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
