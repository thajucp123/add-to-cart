# add-to-cart
**Add to cart : Javascript & Firebase Project** <br/>
 - Just a simple shopping cart app that will add, delete data using firebase realtime database. <br/>
 - Used vanilla Javascript and regular CSS.

**Live Demo:** [addtocart-thaju.netlify.app/](https://addtocart-thaju.netlify.app/)
<br/>

## Usage:
Users can enter cart items and click the button, it will get added to firebase and will be shown in below section.<br/>
When clicking on an item, it will be removed from firebase and disappear in the app.

## Screenshots:

<img src="assets/screenshots/Screenshot 1.png"/> ![screenshot 2]("assets/screenshots/Screenshot 2.png")

## Code overview:
**Firebase:** <br/>
importing firebase methods
```
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
```
<br/>
initializing app and defining database reference
<br/>

```
const app = initializeApp(appSettings);
const database = getDatabase(app);
const cartDB = ref(database, "cart");
```
<br/>
Use the onValue method to do something whenever data changes in firebase database
<br/>

```
onValue(cartDB,(snapshot)=>{
    clearCartItemsList();
    if(!snapshot.exists()){
        //do something if there is no data in firebase reference
    }
    else{
 let cartItems = Object.entries(snapshot.val());
 for(let i=0; i<cartItems.length; i++)
 {
    //do something with each of the fetched data
 }
}
})
```
