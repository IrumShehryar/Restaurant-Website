# Restaurant Website - Quick Start Guide

## Overview
This is a full-stack restaurant website built as a university project featuring:
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Flask (Python)
- **Database**: MongoDB

## Project Structure
```
├── app.py              # Flask application with API endpoints
├── init_db.py          # Database initialization script
├── test_app.py         # Unit tests
├── requirements.txt    # Python dependencies
├── templates/          # HTML templates
│   ├── base.html       # Base template with navigation
│   ├── index.html      # Home page
│   ├── menu.html       # Menu with ordering system
│   ├── reservations.html # Table reservations
│   ├── about.html      # About the restaurant
│   └── contact.html    # Contact form
└── static/            # Static assets
    ├── css/
    │   └── style.css   # All styles
    └── js/
        ├── main.js     # Common functionality
        ├── home.js     # Home page logic
        ├── menu.js     # Menu and cart logic
        ├── reservations.js # Reservation form
        └── contact.js  # Contact form
```

## Quick Setup

### 1. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 2. Setup MongoDB
- Install MongoDB on your system
- Start MongoDB service: `sudo systemctl start mongodb` (Linux)
- Or use MongoDB Atlas for cloud database

### 3. Initialize Database (Optional)
```bash
python init_db.py
```
This populates the database with 16 sample menu items.

### 4. Run the Application
```bash
python app.py
```

### 5. Access the Website
Open your browser and navigate to:
```
http://localhost:5000
```

## Features

### For Customers
- **Browse Menu**: View menu items by category (Appetizers, Main Course, Desserts, Beverages)
- **Order Online**: Add items to cart and place orders with delivery details
- **Make Reservations**: Book a table with date, time, and party size
- **Contact**: Send messages to the restaurant

### For Developers
- **RESTful API**: JSON endpoints for all operations
- **Responsive Design**: Mobile-first CSS that works on all devices
- **Modern JavaScript**: ES6+ features, async/await for API calls
- **Flask Backend**: Clean, modular Python code
- **MongoDB**: NoSQL database for flexible data storage

## API Endpoints

### Menu
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Add new menu item

### Reservations
- `GET /api/reservations` - Get all reservations
- `POST /api/reservations` - Create new reservation

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order

### Contact
- `POST /api/contact` - Submit contact form

## Testing
Run the test suite:
```bash
python test_app.py
```

All tests should pass, verifying that all routes work correctly.

## Configuration
Copy `.env.example` to `.env` and customize:
```bash
cp .env.example .env
```

Edit `.env` to set your MongoDB connection string:
```
MONGO_URI=mongodb://localhost:27017/restaurant_db
```

## Customization

### Change Restaurant Name
Edit `templates/base.html` and update "Delicious Restaurant" to your name.

### Add Real Images
Replace emoji placeholders with actual images:
1. Add images to `static/images/`
2. Update image references in templates
3. Update `init_db.py` to use image paths

### Modify Menu Items
Edit `init_db.py` to change the sample menu items, or add items through the API.

### Styling
Customize colors and styling in `static/css/style.css`:
- `--primary-color`: Main brand color
- `--secondary-color`: Secondary brand color
- Fonts, spacing, and layout

## Troubleshooting

### MongoDB Connection Error
**Problem**: "Connection refused" error when starting app
**Solution**: Make sure MongoDB is running:
```bash
sudo systemctl start mongodb
```

### Port Already in Use
**Problem**: "Port 5000 already in use"
**Solution**: Change port in `app.py` or kill the process using port 5000

### Module Not Found
**Problem**: "No module named 'flask'"
**Solution**: Install requirements:
```bash
pip install -r requirements.txt
```

## Production Deployment
For production deployment, consider:
- Use a production WSGI server (e.g., Gunicorn)
- Set up environment variables properly
- Use a cloud MongoDB service (MongoDB Atlas)
- Enable HTTPS
- Add authentication for admin features
- Implement proper error logging

## License
This project is created as a university fullstack project.

## Support
For issues or questions, please use the contact form on the website or open an issue on GitHub.
