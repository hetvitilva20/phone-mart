function addToCart(product) {

    // CHECK LOGIN FIRST
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        const goLogin = confirm("You need to login first. Go to login page?");
        if (goLogin) {
            window.location.href = "login.html";
        }
        return;
    }

    // CONTINUE IF LOGGED IN
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(item => item.id === product.id);

    if (exists) {
        exists.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // update UI
    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    alert("Added to cart");
}

function updateCartTotal(cart) {
    const total = cart.reduce((sum, item) => {
        return sum + (item.price * item.qty); // ✅ FIXED
    }, 0);

    document.getElementById("cartSubtotal").innerText = total.toFixed(2);
    document.getElementById("cartTotal").innerText = total.toFixed(2);
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    const el = document.getElementById("cartCount");

    if (!el) return;

    el.innerText = totalItems;
}

// ================= LOAD CART =================
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");

    if (!container) return;

    container.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty</p>";
        if (totalEl) totalEl.innerText = 0;
        return;
    }

    cart.forEach(item => {
        total += item.price * item.qty;

        container.innerHTML += `
      <div class="card mb-3 p-3 d-flex flex-row justify-content-between align-items-center">
        
        <div>
          <h6>${item.name}</h6>
          <p class="mb-0">₹${item.price}</p>
        </div>

        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-secondary" onclick="updateQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button class="btn btn-sm btn-secondary" onclick="updateQty(${item.id}, 1)">+</button>
        </div>

        <div>
          <button class="btn btn-sm btn-danger" onclick="removeItem(${item.id})">Remove</button>
        </div>

      </div>
    `;
    });

    if (totalEl) totalEl.innerText = total;
    updateCartTotal(cart);
}


// ================= UPDATE QTY =================
function updateQty(id, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.map(item => {
        if (item.id === id) {
            item.qty += change;
            if (item.qty < 1) item.qty = 1;
        }
        return item;
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
    updateCartCount();
}


// ================= REMOVE ITEM =================
function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
    updateCartCount();
}


// ================= CART COUNT =================
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    const el = document.getElementById("cartCount");
    if (el) el.innerText = totalItems;
}


function checkCartAccess() {
    const user = localStorage.getItem("user");

    if (!user) {
        document.querySelectorAll(".add-cart-btn").forEach(btn => {
            btn.innerText = "Login to Buy";
            btn.classList.remove("btn-warning");
            btn.classList.add("btn-secondary");
        });
    }
}

document.addEventListener("DOMContentLoaded", checkCartAccess);
// ================= INIT =================
document.addEventListener("DOMContentLoaded", loadCart);

const subtotalEl = document.getElementById("cartSubtotal");
const totalEl = document.getElementById("cartTotal");

if (subtotalEl) subtotalEl.innerText = total;
if (totalEl) totalEl.innerText = total;


function goToCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    window.location.href = "checkout.html";
}


// Load total on checkout page
function loadCheckout() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const el = document.getElementById("totalAmount");
    if (el) el.innerText = total;
}

document.addEventListener("DOMContentLoaded", loadCheckout);


// Simulate payment
function payNow() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    // fake loading
    alert("Processing payment...");

    setTimeout(() => {
        alert("Payment Successful ✅");

        // clear cart
        localStorage.removeItem("cart");

        window.location.href = "index.html";
    }, 1000);
}