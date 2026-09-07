import { menuItems } from "./restaurant.js";
import { cart, renderCart } from "./cart.js";


const foodContainer = document.querySelector("#food-container");


export function renderFood() {

    if (!foodContainer) return;

    foodContainer.innerHTML = "";


    menuItems.forEach(food => {

        const foodCard = document.createElement("article");

        foodCard.className = "foodCard";


        foodCard.innerHTML = `

            <img 
                src="${food.image}" 
                alt="${food.name}"
            >

            <div class="food-info">

                <h2>${food.name}</h2>

                <p>${food.description}</p>

                <div class="food-bottom">

                    <span class="food-price">
                        ZMW ${food.price}
                    </span>

                    <button 
                        class="add-cart-btn"
                        data-id="${food.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;


        foodContainer.appendChild(foodCard);


        const button =
            foodCard.querySelector(".add-cart-btn");


        button.addEventListener("click", () => {

            const id = Number(button.dataset.id);


            const selectedFood =
                menuItems.find(item => item.id === id);


            const existingFood =
                cart.find(item => item.id === id);


            if (existingFood) {

                existingFood.quantity++;

            } else {

                cart.push({
                    ...selectedFood,
                    quantity: 1
                });

            }


            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            console.log(cart);


            /*
                renderCart() is safe now.
                It will only render when
                #cart-container exists.
            */
            renderCart();


        });

    });

}