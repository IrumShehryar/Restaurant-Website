"""
Basic tests for the restaurant website
Run with: python test_app.py
"""

import unittest
from app import app

class RestaurantWebsiteTests(unittest.TestCase):
    
    def setUp(self):
        """Set up test client"""
        self.app = app.test_client()
        self.app.testing = True
    
    def test_home_page(self):
        """Test that home page loads successfully"""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Delicious Restaurant', response.data)
    
    def test_menu_page(self):
        """Test that menu page loads successfully"""
        response = self.app.get('/menu')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Menu', response.data)
    
    def test_about_page(self):
        """Test that about page loads successfully"""
        response = self.app.get('/about')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'About', response.data)
    
    def test_contact_page(self):
        """Test that contact page loads successfully"""
        response = self.app.get('/contact')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Contact', response.data)
    
    def test_reservations_page(self):
        """Test that reservations page loads successfully"""
        response = self.app.get('/reservations')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Reservation', response.data)
    
    def test_404_page(self):
        """Test that 404 error is handled"""
        response = self.app.get('/nonexistent')
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    print("Running Restaurant Website Tests...")
    print("=" * 50)
    unittest.main(verbosity=2)
