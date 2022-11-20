import app from "./firebase.js";
import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

const db = getDatabase();
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const googleloginBtn = document.getElementById("googlelogin");
const googlesigninBtn = document.getElementById("googlesignin");
const manualsignin = document.getElementById("manualsignin");
const manuallogin = document.getElementById("manuallogin");

//Google Sign up Authentication Button
googlesigninBtn.addEventListener('click', () => {
    console.log("andar");
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("here");
            location.href = "home2.html";
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    onAuthStateChanged(auth, (user) => {
        if (user) {
            set(ref(db, 'googleusers/' + user.uid), {
                username: user.displayName,
                email: user.email,
                userid: user.uid
            });
            console.log(auth.currentUser);
        } else { }
    });
});

//Google Login authentication Button
googleloginBtn.addEventListener('click', function userlogin() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setTimeout(() => {
                location.href = "home.html";
            }, 3000);
        } else { }
    });
})

//logging in through manual inputs
manuallogin.addEventListener('click', () => {
    const loginpassword = document.getElementById("loginpassword");
    const loginusername = document.getElementById("loginusername");
    SelectData();
    function SelectData() {
        const dbref = ref(db);
        console.log("reached")
        get(child(dbref, "manualusers/" + loginusername.value)).then((snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val().password != loginpassword.value) {
                    console.log("Username or Password is incorrect")
                    //ADD SOME Functionalities to show that the username or password is incorrect
                }
                else {
                    console.log("You are logged in")
                    location.href = "home.html"
                }
                console.log("Data found")
            }
            else {
                console.log("No data found")
                //add some functionalities to show that the username or password is incorrect
            }
        })
            .catch((error) => {
                console.log("chud gyi");
                alert("Error", error)
            });
    }
})

//making user id
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//manual signing in
manualsignin.addEventListener('click', function InsertSignup(e) {
    e.preventDefault();
    const signinemail = document.getElementById("email1");
    const signinusername = document.getElementById("username1");
    const signinpassword = document.getElementById("password1");
    console.log("Username:", signinusername.value)
    console.log("Email:", signinemail.value)
    console.log("password:", signinpassword.value);

    set(ref(db, "manualusers/" + signinusername.value), {
        userid: makeid(20),
        email: signinemail.value,
        password: signinpassword.value
    })
        .then(() => {
            console.log("success")
            location.href = "home.html";
        })
        .catch((error) => {
            alert("Error", error)
        })
    document.getElementById("manualsignin").addEventListener('click', function () {
        setTimeout(function () {
            location.href = "home.html";
        }, 3000);
    });
});
//20 length user id
