const cart = JSON.parse(localStorage.getItem("cart")) || [];


const checkoutItems =
    document.querySelector("#checkout-items");

const checkoutTotal =
    document.querySelector("#checkout-total");

const checkoutForm =
    document.querySelector("#checkout-form");



/* ========================================
   RENDER CHECKOUT ITEMS
======================================== */

function renderCheckout() {

    if (!checkoutItems) return;


    checkoutItems.innerHTML = "";


    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="checkout-empty">

                <i class="fa-solid fa-cart-shopping"></i>

                <p>Your cart is empty.</p>

                <a href="restaurant.html">
                    Back to Restaurant
                </a>

            </div>
        `;

        return;
    }


    let total = 0;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const checkoutItem =
            document.createElement("div");


        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <div class="checkout-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.quantity} × ZMW ${item.price}
                </p>

            </div>


            <strong>
                ZMW ${itemTotal}
            </strong>

        `;


        checkoutItems.appendChild(
            checkoutItem
        );

    });


    checkoutTotal.textContent =
        `ZMW ${total}`;

}



/* ========================================
   PLACE ORDER
======================================== */

checkoutForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;
        }


        const formData =
            new FormData(checkoutForm);


        const customerName =
            formData.get("name");


        const customerPhone =
            formData.get("phone");


        const location =
            formData.get("location");


        const orderType =
            formData.get("orderType");


        let total = 0;


        let orderMessage =
            `Hello Izeni Resort Restaurant 👋\n\n`;


        orderMessage +=
            `I would like to place an order.\n\n`;


        orderMessage +=
            `*Customer Details*\n`;

        orderMessage +=
            `Name: ${customerName}\n`;

        orderMessage +=
            `Phone: ${customerPhone}\n`;

        orderMessage +=
            `Room/Table: ${location}\n`;

        orderMessage +=
            `Order Type: ${orderType}\n\n`;


        orderMessage +=
            `*Order*\n`;


        cart.forEach(item => {

            const itemTotal =
                item.price * item.quantity;


            total += itemTotal;


            orderMessage +=
                `${item.name} × ${item.quantity} - ZMW ${itemTotal}\n`;

        });


        orderMessage +=
            `\n*Total: ZMW ${total}*`;


        /*
            Replace this number with
            the restaurant's WhatsApp number.

            Use country code without +
            Example Zambia:
            260971234567
        */

        const restaurantNumber =
            "260971234567";


        const whatsappURL =
            `https://wa.me/${restaurantNumber}?text=${encodeURIComponent(orderMessage)}`;


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);



/* ========================================
   INITIALIZE
======================================== */

renderCheckout();