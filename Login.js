import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.querySelector("#loginBtn").addEventListener("click", async () => {
    const username = document.querySelector("#usernameInput").value.trim();
    const password = document.querySelector("#passwordInput").value;
    
    if (!username || !password) {
        alert("Please enter your username and password.");
        return;
    }

    try{
        const email = username + "@wcc.com";
        await signInWithEmailAndPassword(auth, email, password);

        localStorage.setItem("username", username);
        window.location.href = "./index.html";

    } catch (err) {
        console.error("Login error:", err);
        alert("Wrong username or password.");
    }
});
