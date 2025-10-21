# Revontulet Flamehouse — Restaurant Website

Full stack project  
**Frontend:** HTML / CSS / JavaScript  
**Backend:** Python (Flask) + MongoDB (later)

## ✨ Project idea

A restaurant website inspired by the Northern Lights (“Revontulet”), with a warm “flamehouse” vibe. Users can browse the menu, add items to a cart, and place orders; admins manage menu items.

# Revontulet Flamehouse — Quick Start

## 1) Get the code

git clone https://github.com/IrumShehryar/Restaurant-Website.git
cd Restaurant-Website

```

---

### 2) Create & activate a virtual environment

#### 🪟 Windows (PowerShell or CMD)

python -m venv .venv
.\.venv\Scripts\activate

#### 🪟 macOS/Linux)
python3 -m venv .venv
source .venv/bin/activate

3) Install dependencies
python -m pip install --upgrade pip
pip install -r requirements.txt

####If you don’t have requirements.txt yet, create it with:

python -m pip freeze > requirements.txt

4) Run the Flask app
python backend/app.py
Then open http://127.0.0.1:5000
 in your browser.

 🗂️ Project Structure
Restaurant-Website/
├─ backend/
│  └─ app.py                # Flask backend
├─ frontend/
│  ├─ templates/
│  │  └─ index.html         # HTML template
│  └─ static/
│     ├─ css/style.css      # Styling
│     ├─ js/main.js         # JavaScript logic
│     └─ assets/
│        └─ revontulet_logo.png
├─ requirements.txt
├─ README.md
└─ .gitignore
```
