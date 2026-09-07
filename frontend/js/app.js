import { loadComponent, initNavigation } from "./navigation.js";
import { renderRooms } from "./renderRooms.js";
import { readRoom } from "./roomDetails.js";
import { renderGallery } from "./render-gallery.js";
import { renderFood } from "./render-food.js";
import "./checkout.js";



async function startApp() {

    await loadComponent(
        "#header",
        "components/nav.html"
    );

    await loadComponent(
        "#footer",
        "components/footer.html"
    );


    if (document.querySelector("#room-container")) {
    renderRooms();
    }


    if (document.querySelector("#room-details-container")) {
        readRoom();
    }


    if (document.querySelector("#gallery-grid")) {
        renderGallery();
    }

    if(document.querySelector("#food-container")) {
        renderFood ();
    }

    if (document.querySelector("#food-container")) {

    renderFood();

}


if (document.querySelector("#cart-container")) {

    renderCart();

}

    initNavigation();

}


startApp();