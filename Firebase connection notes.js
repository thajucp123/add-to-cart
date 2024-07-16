/* #Firebase realtime database
  Create a project in firebase console and create a new realitime database, change the rules aa per needed.
  First we gotta import few functions from google firebase official SDK */

//which are: 

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


// then we gotta initialize firebase using our firebase database url, 
// then define the databse and then define our reference

//like this:

const appSettings = {
    databaseURL: "https://add-to-cart-f163d-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const cartDB = ref(database, "cart"); // cart is the reference we use here, just like a table name.

// Then we can push to database

push(cartDB,"value"); //this will add new data to 'cart' reference collection


// To fetch data, we use onValue snapshot function

onValue(cartDB,(snapshot)=>{
 let cartItems = Object.entries(snapshot.val()); //we change the object into array here , snapshot.val() will return all objects inside our fibase reference
                                                // Object.entries will return keys and values in the object as array of arrays
 for(let i=0; i<cartItems.length; i++)
 {
    let currentItem = cartItems[i];
    console.log(currentItem[1]); // this is value
    console.log(currentItem[0]); // this is key
 }
})

//To delete from db

let locationOfItemInDB = ref(database, `cart/${itemId}`); //specify the reference with id of the item to delete
remove(locationOfItemInDB); //it will delete the item with the specified ID from the db