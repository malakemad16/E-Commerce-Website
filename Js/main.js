// Set the date we're counting down to
var countDownDate = new Date("May 30, 2025 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the format like the image
    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "<span>EXPIRED</span>";
    }
}, 1000);

// Swiper Slide
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
    },
});

//Nav bar Mobile
const listIcon = document.querySelector(".list-icon");
const mobileNav = document.querySelector(".mobile-nav");
listIcon.addEventListener("click", () => {
    mobileNav.classList.toggle("mobile-nav-hide")
})

// Add To cart Local Storage
const addToCart = document.querySelectorAll(".add-to-cart");

addToCart.forEach((button) => {
    button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const title = button.getAttribute("data-title");
        const image = button.getAttribute("data-image");
        const price = button.getAttribute("data-price");

        const cartItem = { id, title, image, price }
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
    })
})