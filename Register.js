import { db, auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.querySelector("#registerBtn").addEventListener("click", async () => {
    const username = document.querySelector("#usernameInput").value.trim();
    const password = document.querySelector("#passwordInput").value;

    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    try {
        const existing = await getDoc(doc(db, "users", username));
        if (existing.exists()) {
            alert("Username already taken. Please choose another.");
            return;
        }

        const email = username + "@wcc.com";
        await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", username),{
            countries: []
        });

        alert("Account created! You can now log in.");
        window.location.href = "Login.html"
    } catch (err) {
        console.error("Register error:", err);
        if (err.code === "auth/email-already-in-use"){
            alert("Username already taken. Please choose another.");
        } else {
        alert("Something went wrong. Please try again.");
        }
    }
});