function loadComponent(id, file) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            // run after navbar load
            if (id === "navbar") {
                if (typeof checkLogin === "function") checkLogin();
                if (typeof updateCartCount === "function") updateCartCount();
            }

            if (id === "top-sale-iphone" || id === "top-sale-samsung") {
                if (typeof checkCartAccess === "function") {
                    checkCartAccess();
                }
            }
        });
}

// Load reusable parts
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("navbar", "assets/components/navbar.html");
    loadComponent("footer", "assets/components/footer.html");

});


function slide(wrapperId, direction) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    const card = wrapper.querySelector(".product-card");
    if (!card) return;

    const cardWidth = card.offsetWidth;

    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
    const newScroll = wrapper.scrollLeft + (cardWidth * direction);

    if (newScroll <= 0) {
        wrapper.scrollTo({ left: 0, behavior: "smooth" });
    } else if (newScroll >= maxScroll) {
        wrapper.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
        wrapper.scrollBy({ left: cardWidth * direction, behavior: "smooth" });
    }
}



