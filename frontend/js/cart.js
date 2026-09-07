let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.querySelector("#cart-container");

export function renderCart() {

    // Prevent errors on pages that don't have the cart
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    // Empty cart
    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h2>Your cart is empty</h2>
                <p>Add some delicious food from the restaurant.</p>
            </div>
        `;

        return;
    }


    // Cart heading
    const cartHeading = document.createElement("div");

    cartHeading.className = "cart-heading";

    cartHeading.innerHTML = `
        <h1>Your Cart</h1>
        <p>${cart.length} item(s)</p>
    `;

    cartContainer.appendChild(cartHeading);


    // Cart items
    cart.forEach(item => {

        const cartCard = document.createElement("article");

        cartCard.className = "cartCard";

        cartCard.innerHTML = `
            <img 
                src="${item.image}" 
                alt="${item.name}"
            >

            <div class="cart-info">

                <h2>${item.name}</h2>

                <p class="cart-price">
                    ZMW ${item.price}
                </p>

                <div class="cart-controls">

                    <button 
                        class="quantity-btn decrease-btn"
                        data-id="${item.id}"
                    >
                        −
                    </button>

                    <span class="quantity">
                        ${item.quantity}
                    </span>

                    <button 
                        class="quantity-btn increase-btn"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                </div>

                <p class="item-total">
                    ZMW ${item.price * item.quantity}
                </p>

                <button 
                    class="remove-btn"
                    data-id="${item.id}"
                >
                    <i class="fa-solid fa-trash"></i>
                    Remove
                </button>

            </div>
        `;


        cartContainer.appendChild(cartCard);


        // Increase quantity
        const increaseBtn =
            cartCard.querySelector(".increase-btn");

        increaseBtn.addEventListener("click", () => {

            const id = Number(increaseBtn.dataset.id);

            const item = cart.find(item => item.id === id);

            if (item) {

                item.quantity++;

                saveCart();

                renderCart();
            }

        });


        // Decrease quantity
        const decreaseBtn =
            cartCard.querySelector(".decrease-btn");

        decreaseBtn.addEventListener("click", () => {

            const id = Number(decreaseBtn.dataset.id);

            const item = cart.find(item => item.id === id);

            if (item) {

                item.quantity--;

                // Remove item when quantity reaches zero
                if (item.quantity <= 0) {

                    cart = cart.filter(item => item.id !== id);

                }

                saveCart();

                renderCart();
            }

        });


        // Remove item
        const removeBtn =
            cartCard.querySelector(".remove-btn");

        removeBtn.addEventListener("click", () => {

            const id = Number(removeBtn.dataset.id);

            cart = cart.filter(item => item.id !== id);

            saveCart();

            renderCart();

        });

    });


    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => {

        return total + (item.price * item.quantity);

    }, 0);


    // Cart summary
    const cartSummary = document.createElement("div");

    cartSummary.className = "cart-summary";

    cartSummary.innerHTML = `
        <h2>Order Summary</h2>

        <div class="summary-row">
            <span>Subtotal</span>
            <strong>ZMW ${subtotal}</strong>
        </div>

        <button class="checkout-btn" id="checkout-btn">
    Proceed to Checkout
</button>
    `;

    cartContainer.appendChild(cartSummary);

    const checkoutBtn =
    cartSummary.querySelector("#checkout-btn");

checkoutBtn.addEventListener("click", () => {

    window.location.href = "checkout.html";

});

}


/*
    Save cart to localStorage
*/
function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/*
    Render cart only if
    cart container exists
*/
if (document.querySelector("#cart-container")) {

    renderCart();

}


export { cart };