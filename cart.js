const cartContainer = document.getElementById("cart-container");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<h2>Your Cart is Empty</h2>";
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;

        cartContainer.innerHTML += `
            <div class="cart-card">
                <img src="${item.thumbnail}" alt="${item.title}">
                
                <div class="cart-info">
                    <h3>${item.title}</h3>
                    <p>$${item.price}</p>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    let tax = total * 0.1;
    let finalTotal = total + tax;

    cartContainer.innerHTML += `
        <div class="bill-summary">
            <h2>Bill Summary</h2>
            <p>Subtotal: $${total.toFixed(2)}</p>
            <p>Tax (10%): $${tax.toFixed(2)}</p>
            <h3>Total: $${finalTotal.toFixed(2)}</h3>
        </div>
    `;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();