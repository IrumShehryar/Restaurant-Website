from flask import Flask,jsonify ,url_for,render_template

app = Flask (
    __name__,
    template_folder= "../frontend/templates",
    static_folder= "../frontend/static",
    static_url_path= "/static",
    
)

@app.get ("/")
def home():
    return render_template("index.html")
    
@app.get("/api/menu")
def menu_api():
    items = [
        {
            "id": 1,
            "name": "Aurora Burger",
            "price" : 12.9,
            "catagory" : "Burgers",
         },
        {
            "id": 2, 
            "name": "Arctic Fries",
            "price" : 4.5,
            "catagory" : "sides",
        },
    ]
    
    return jsonify(items),200

if __name__ == "__main__":
    app.run(debug = True)