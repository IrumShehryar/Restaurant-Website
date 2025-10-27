import os
from flask import Flask,jsonify ,url_for,render_template
from werkzeug.middleware.proxy_fix import ProxyFix
from dotenv import load_dotenv
from api.v1.menu.menu_routes import menu_bp

load_dotenv()
app = Flask (
    __name__,
    template_folder= "../frontend/templates",
    static_folder= "../frontend/static",
    static_url_path= "/static", 
)

app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_prefix=1)

#register the blueprints
app.register_blueprint(menu_bp)

@app.get ("/") 

def home():
    return render_template("index.html")
    
@app.get("/menu")
def menu():
    return render_template("menu.html")


@app.get("/menu/<int:item_id>")
def menu_item(item_id):
    """Render the menu page for a specific item id.

    This provides a friendly URL like /menu/1 that returns the same
    `menu.html` page. The frontend script can inspect the path and
    fetch `/api/v1/menu/<id>` to load the item details.
    """
    return render_template("menu.html")


if __name__ == "__main__":
     app.run(host="127.0.0.1", port=os.getenv("PORT"), debug=os.getenv("FLASK_DEBUG"), use_reloader=os.getenv("FLASK_RELOADER"))