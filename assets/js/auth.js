// VALIDATION
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// SIGNUP
document.addEventListener("submit", function (e) {
    if (e.target.id === "signupForm") {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        if (!validateEmail(email)) {
            alert("Invalid email");
            return;
        }

        if (!validatePassword(password)) {
            alert("Password must be at least 6 characters");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.find(u => u.email === email);
        if (exists) {
            alert("User already exists");
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Signup successful!");
        window.location.href = "login.html";
    }
});


// LOGIN
document.addEventListener("submit", function (e) {
    if (e.target.id === "loginForm") {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert("Invalid credentials");
            return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "index.html";
    }
});


function checkLogin() {
    const user = JSON.parse(localStorage.getItem("user"));

    const loginNav = document.getElementById("loginNav");
    const signupNav = document.getElementById("signupNav");
    const profile = document.getElementById("navProfileItem");

    const profileText = document.getElementById("navProfileText");
    const profileEmail = document.getElementById("navProfileEmail");

    if (user) {
        profile?.classList.remove("d-none");

        if (profileText) profileText.innerText = user.name;
        if (profileEmail) profileEmail.innerText = user.email;

        loginNav?.classList.add("d-none");
        signupNav?.classList.add("d-none");

    } else {
        loginNav?.classList.remove("d-none");
        signupNav?.classList.remove("d-none");
        profile?.classList.add("d-none");
    }
}

document.addEventListener("DOMContentLoaded", checkLogin);


// LOGOUT
document.addEventListener("click", function (e) {
    if (e.target.id === "navLogoutBtn") {
        e.preventDefault();

        localStorage.removeItem("user");

        location.reload();
    }
});