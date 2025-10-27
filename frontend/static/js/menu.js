// Import the data-access functions for menu items.
// - getAllMenu: fetches the full list of menu items from your API/service
// - getMenuById: (not used here) fetches a single item by id
import { getAllMenu, getMenuById } from "./services/menuService.js";

// Import a small UI factory that builds a DOM element ("card") for one menu item.
// createMenuCard(item) returns a <div class="menu-card">...</div>
import { createMenuCard } from "./components/menuCard.js";
import { renderItemDetail } from './ui/menuRenderer.js'; // remove later
import { createModal } from './components/Modal.js';
/**
 * Load the menu list into the #menuList container.
 * Steps:
 *  1) Show a loading state
 *  2) Fetch items
 *  3) Render cards efficiently using a DocumentFragment
 *  4) Handle empty results and errors
 */
async function loadMenu() {
  // Grab the container where cards will be rendered.
  const el = document.getElementById("menuList");

  // Immediate feedback to the user while we wait for data.
  el.textContent = "Loading...";

  try {
    // Fetch all menu items (async). Execution pauses here until the Promise resolves.
    const items = await getAllMenu();

    // Clear the container (removes the "Loading..." text or any old content).
    el.innerHTML = "";

    // Guard: ensure we actually have an array with data.
    if (Array.isArray(items) && items.length) {
      // Use a DocumentFragment to build DOM off-screen.
      // This is faster for multiple inserts because it avoids repeated reflow on the live DOM.
      const frag = document.createDocumentFragment();

      // For each item, build a card element and add it to the fragment.
      items.forEach((i) => {
        // createMenuCard builds the structure and fills in name/category/price and buttons.
        const card = createMenuCard(i);
        frag.appendChild(card);
      });

      // Append the fragment in one operation.
      // The fragment itself disappears; only its children are inserted into #menuList.
      el.appendChild(frag);
    } else {
      // No items were returned (empty list or non-array).
      el.textContent = "No items in the menu";
    }
  } catch (err) {
    // If the fetch fails (network/server issue), show a friendly message.
    el.textContent = "Failed to load the menu";

    // Log the actual error to the console to help with debugging.
    console.error(err);
  }
}

// Run loadMenu as soon as the initial HTML is parsed and #menuList exists.
// This avoids trying to query elements before they are in the DOM.
document.addEventListener("DOMContentLoaded", loadMenu);
document.getElementById('menuList').addEventListener('show-detail',(e)=>{
  console.log('menulist got show detail event,id=',e.detail?.id)
  if(e.detail?.id){
    showDetail(Number(e.detail.id))
  }
})
const modal = createModal();

async function showDetail(id){

try{

  const item = await getMenuById(id);
  modal.setContent(renderItemDetail(item));
  modal.open()

  const closeBtn=document.getElementById('modal-close')
  if(closeBtn)
    closeBtn.addEventListener('click',()=> modal.close())

} catch(err){
  console.error("Show detail error,",err)
}

}
/**
 * NOTE on event listeners, bubbling, and delegation:
 *
 * - Your cards (from createMenuCard) include buttons like ".btn-detail" and ".btn-add".
 *   You have two common choices for handling clicks:
 *
 *   A) Per-button listener (inside createMenuCard)
 *      btn.addEventListener('click', () => openModal(item.id))
 *      Simple, but the card now knows about the controller logic.
 *
 *   B) Event delegation (one listener on the parent, e.g. #menuList)
 *      #menuList.addEventListener('click', (e) => { ... })
 *      Relies on "bubbling": a click on a child button bubbles up to #menuList,
 *      so one listener can handle all current and future cards.
 *
 * - If you use CustomEvent in createMenuCard with { bubbles: true }, the custom event
 *   also bubbles up to a parent that listens for it, keeping the card decoupled.
 */

// This commented line would NOT work as-is for multiple dynamic buttons:
// document.getElementById("btn-detail").addEventListener("click", ...)
//
// Why:
// 1) IDs must be unique. You’ll have many "Details" buttons, not one.
// 2) Buttons are created after load via JavaScript, so a single getElementById at startup
//    won’t cover future elements.
// Prefer either per-card listeners inside createMenuCard OR a single delegated listener on #menuList.
