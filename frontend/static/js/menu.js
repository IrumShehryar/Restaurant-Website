const menuGrid = document.getElementById("menuGrid");

const menuItems = [
    {
        name: "Aurora Bites",
        type: "starter",
        price: "5.5€",
        image: "burger.jpg"
    },
    {
        name: "Nordic Salmon Skewers",
        type: "starter",
        price: "9.75€",
        image: "burger.jpg"
    },
    {
        name: "Smoked Trout Salad",
        type: "starter",
        price: "8.95€",
        image: "burger.jpg"
    },
    {
        name: "Reindeer Stew",
        type: "main",
        price: "14.5€",
        image: "burger.jpg"
    },
    {
        name: "Arctic Garden Bowl",
        type: "main",
        price: "12€",
       image: "burger.jpg"
    },
    {
        name: "Firewood Salmon",
        type: "main",
        price: "15.25€",
        image: "burger.jpg"
    },
    {
        name: "Lapland Dessert",
        type: "dessert",
        price: "6.75€",
        image: "burger.jpg"
    },
    {
        name: "Polar Night Cake",
        type: "dessert",
        price: "7.5€",
        image: "burger.jpg"
    }
];

menuGrid.innerHTML = menuItems
    .map(
        item => `
        <div class="menu-item">
            <img src="/static/assets/${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.type} • ${item.price}</p>
            <button>Details</button>
            <button>Add</button>
        </div>
    `
    )
    .join("");
