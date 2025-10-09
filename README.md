# Restaurant Website

A full-stack restaurant website built with HTML/CSS/JavaScript for the frontend and Flask/Python/MongoDB for the backend.

## Features

- **Home Page**: Welcome section with featured dishes and testimonials
- **Menu Page**: Browse menu items by category with add-to-cart functionality
- **Reservations**: Book a table with date, time, and party size selection
- **About Page**: Learn about the restaurant's story and team
- **Contact Page**: Get in touch with the restaurant
- **Order System**: Place online orders for delivery
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technologies Used

### Frontend
- HTML5
- CSS3 (with responsive design)
- JavaScript (ES6+)

### Backend
- Flask (Python web framework)
- Flask-PyMongo (MongoDB integration)
- Python 3.x

### Database
- MongoDB

## Project Structure

```
Resaurant-Website/
├── app.py                 # Flask application and API endpoints
├── requirements.txt       # Python dependencies
├── .gitignore            # Git ignore file
├── templates/            # HTML templates
│   ├── base.html         # Base template
│   ├── index.html        # Home page
│   ├── menu.html         # Menu page
│   ├── reservations.html # Reservations page
│   ├── about.html        # About page
│   └── contact.html      # Contact page
└── static/               # Static files
    ├── css/
    │   └── style.css     # Main stylesheet
    ├── js/
    │   ├── main.js       # Main JavaScript
    │   ├── home.js       # Home page functionality
    │   ├── menu.js       # Menu page functionality
    │   ├── reservations.js # Reservations functionality
    │   └── contact.js    # Contact form functionality
    └── images/           # Image files
```

## Installation

### Prerequisites

- Python 3.7 or higher
- MongoDB installed and running locally or a MongoDB connection string

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/IrumShehryar/Resaurant-Website.git
   cd Resaurant-Website
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up MongoDB**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/restaurant_db`
   - Or set the `MONGO_URI` environment variable:
     ```bash
     export MONGO_URI="your_mongodb_connection_string"
     ```

6. **Run the application**
   ```bash
   python app.py
   ```

7. **Access the website**
   - Open your browser and go to: `http://localhost:5000`

## API Endpoints

### Menu
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Add a new menu item

### Reservations
- `GET /api/reservations` - Get all reservations
- `POST /api/reservations` - Create a new reservation

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create a new order

### Contact
- `POST /api/contact` - Submit a contact form

## Usage

### Adding Menu Items

To add menu items to the database, you can use the API endpoint or MongoDB directly:

```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Grilled Salmon",
    "description": "Fresh Atlantic salmon",
    "price": 24.99,
    "category": "main-course",
    "image": "🐟",
    "available": true
  }'
```

### Making a Reservation

Users can make reservations through the website's reservation page, which will be stored in the MongoDB database.

### Placing an Order

Users can browse the menu, add items to their cart, and place orders with delivery information.

## Development

### Running in Development Mode

The application runs in debug mode by default for development:

```bash
python app.py
```

### Database Collections

The application uses the following MongoDB collections:
- `menu` - Menu items
- `reservations` - Table reservations
- `orders` - Customer orders
- `contacts` - Contact form submissions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is created as a university fullstack project.

## Contact

For questions or feedback, please use the contact form on the website or reach out through the repository.
