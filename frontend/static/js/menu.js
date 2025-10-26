import { apiUrl } from "./utils/config.js";
import fetchData from './utils/fetchData.js'

async function loadMenu(){
    const el = document.getElementById("menuList")
    el.textContent = "Loading..."

    try{
        const items = await fetchData(apiUrl("menu"))
       // el.innerHTML = items.map(i => `<b>${i.name}</b> - ${i.price}E <i>${i.category}</i> <br>`).join("") || "No Items"
        //DECIDE:  which one to choose a simple list of items  as above or with buttons as below
       el.innerHTML = (Array.isArray(items) && items.length)
      ? items.map(i => `
        <div class="menu-card" data-id="${i.id}">
          <div class="menu-info">
            <b>${i.name}</b>
            <div class="menu-meta">${i.category} • ${i.price}€</div>
          </div>
          <div class="menu-actions">
            <button class="btn-detail" data-id="${i.id}">Details</button>
            <button class="btn-add" data-id="${i.id}">Add</button>
          </div>
        </div>`).join("")
      : "No items available";
    } catch(err){

        el.textContent = "Failed to load the menu"
        console.error(err)
    }
    
}
document.addEventListener("DOMContentLoaded", loadMenu)
//document.getElementById("btnLoad").addEventListener("click",loadMenu)