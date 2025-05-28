//Nav bar Mobile
const listIcon = document.querySelector(".list-icon");
const mobileNav = document.querySelector(".mobile-nav");
listIcon.addEventListener("click", () => {
    mobileNav.classList.toggle("mobile-nav-hide")
})
// Enhanced Cart Functionality with your HTML structure
const cartContainer = document.querySelector(".cart-items");
const totalPriceElement = document.querySelector(".cart-total-price");

function displayCartItems() {
    // Clear existing items
    cartContainer.innerHTML = '';

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="6" style="padding: 10px;">Your cart is empty</td></tr>';
        totalPriceElement.textContent = '$0';
        return;
    }

    let total = 0;

    cartItems.forEach((item, index) => {
        const quantity = item.quantity || 1;
        const subtotal = item.price * quantity;
        total += subtotal;

        const cartItemRow = document.createElement("tr");
        cartItemRow.className = "cart-item";
        cartItemRow.dataset.id = item.id;

        cartItemRow.innerHTML = `
            <td class="cart-item-cell">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            </td>
            <td class="cart-item-cell">
                <p class="cart-item-title">${item.title}</p>
            </td>
            <td class="cart-item-cell">$${item.price}</td>
            <td class="cart-item-cell">
                <input type="number" class="cart-item-quantity" 
                       value="${quantity}" min="1" data-index="${index}">
            </td>
            <td class="cart-item-cell">$${subtotal.toFixed(2)}</td>
            <td class="cart-item-cell">
                <button class="cart-item-delete" data-index="${index}">Delete</button>
            </td>
        `;

        cartContainer.appendChild(cartItemRow);
    });

    totalPriceElement.textContent = `$${total.toFixed(2)}`;

    // Add event listeners
    document.querySelectorAll('.cart-item-delete').forEach(button => {
        button.addEventListener('click', deleteCartItem);
    });

    document.querySelectorAll('.cart-item-quantity').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
}

function deleteCartItem(event) {
    const index = event.target.dataset.index;
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (index >= 0 && index < cartItems.length) {
        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        displayCartItems();
    }
}

function updateQuantity(event) {
    const index = event.target.dataset.index;
    const newQuantity = parseInt(event.target.value) || 1;
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (index >= 0 && index < cartItems.length) {
        cartItems[index].quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        displayCartItems();
    }
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', displayCartItems);