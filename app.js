import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://add-to-cart-f163d-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const cartDB = ref(database, "cart");

onValue(cartDB,(snapshot)=>{
    clearCartItemsList();
    if(!snapshot.exists()){
        appendEmptyItemToCartList();
    }
    else{
 let cartItems = Object.entries(snapshot.val());
 for(let i=0; i<cartItems.length; i++)
 {
    let currentItem = cartItems[i]; // will have both key & value pair
    appendItemToCartList(currentItem);
 }
}
})

const inputFieldEl = document.getElementById('input-field');
const addButtonEl = document.getElementById('add-button');
const cartItemsList = document.getElementById('cart-list');

addButtonEl.addEventListener("click",()=>{
    let inputValue = inputFieldEl.value;
    push(cartDB,inputValue); 
    clearInputValue();
})

function clearInputValue() {
    inputFieldEl.value='';
}

function appendItemToCartList(item) {

    let itemId = item[0];
    let itemValue = item [1];
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;
    newEl.addEventListener("click",()=>{
        let locationOfItemInDB = ref(database, `cart/${itemId}`);
        remove(locationOfItemInDB); //it will delete the item at this location with specified ID in the db
    })
    cartItemsList.append(newEl);
}

function clearCartItemsList() {
    cartItemsList.innerHTML = '';
}

function appendEmptyItemToCartList() {

    cartItemsList.innerHTML = "No items.. yet";
}