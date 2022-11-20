import appp from "./firebase";
import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { getAuth, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

const db = getDatabase();
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const googleintrosignin = document.getElementById("googleintrosignin");

googleintrosignin.addEventListener('click', () => {
    console.log("andar");
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("here");
            location.href = "home.html";
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