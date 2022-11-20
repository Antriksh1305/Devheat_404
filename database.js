import app from "./firebase.js";
import { getDatabase, ref, onValue, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";

const db = getDatabase();


//.........................References.........................//
var crop = document.getElementById('crop');
var price = document.getElementById('price');
var transport = document.getElementById('transport');
var quantity = document.getElementById('quantity');
const btn = document.getElementById('btn');
const arr1 = document.querySelectorAll(".t1");
const arr2 = document.querySelectorAll(".t2");
const arr3 = document.querySelectorAll(".t3");
const arr4 = document.querySelectorAll(".t4");
const inputclr = document.querySelectorAll(".clear");

//......................Insert data function................//
var ind = 0;

btn.addEventListener('click', Insertdata);

function Insertdata() {
    set(ref(db, "crop/" + crop.value), {
        price: price.value,
        transport: transport.value,
        quantity: quantity.value
    })
        .then(() => {
            arr1[ind].innerText = crop.value;
            arr2[ind].innerText = price.value;
            arr3[ind].innerText = transport.value;
            arr4[ind].innerText = quantity.value;
            ind++;

            setTimeout(() => {
                inputclr.forEach(ele => {
                    ele.value = "";
                });
            }, 3500);
            alert("data stored successfully");
        })
        .catch((error) => {
            alert('unsuccessful');
        });
}


// function Updatedata() {
//     // x = price.value;
//     // y = transport.value;
//     // z = quantity.value;

//     update(ref(db, "crop/" + crop.value), {
//         price: price.value,
//         transport: transport.value,
//         quantity: quantity.value
//     })
//         .then(() => {
//             alert("data stored successfully");
//         })
//         .catch((error) => {
//             alert('unsuccessful');
//         });
// }


//...................Selecting Data Function..............//
// var ind = 1;
// function Inserttohtml() {
//     const dbref = ref(db);

//     get(child(dbref, "crop/" + crop.value)).then((snapshot) => {
//         if (snapshot.exists()) {
//             ind++;
//             // document.getElementById("11").innerText = snapshot.val().crop;
//             // document.getElementById("12").innerText = snapshot.val().price;
//             // document.getElementById("13").innerText = snapshot.val().transport;
//             // document.getElementById("14").innerText = snapshot.val().quantity;
//         }
//         else {
//             alert("No data found");
//         }
//     })
//         .catch((error) => {
//             alert("unsuccessful");
//         })
// }


// function SelectData() {
//     const dbref = ref(db);
//     console.log("reached")
//     get(child(dbref, "crop/" + crop.value)).then((snapshot) => {
//         if (snapshot.exists()) {
//             // Update();

//             console.log("Data found")
//         }
//         else {
//             console.log("No data found")
//             Insertdata();
//             //add some functionalities to show that the username or password is incorrect
//         }
//     })
//         .catch((error) => {
//             console.log("chud gyi");
//             alert("Error", error)
//         });
// }