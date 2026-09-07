import { rooms } from "./rooms.js";

export function renderRooms() {

    const roomContainer = document.querySelector("#room-container");

    if(!roomContainer) return;

    
        rooms.forEach(item => {

    const roomItem = `
        <article class="room-item">

            <div class="room-image">
                <img src="${item.images[0]}" alt="${item.name}">
            </div>

            <div class="room-details">

                <h3>${item.name}</h3>

                <p>${item.description}</p>

                <div class="room-info">
                    <span>K${item.price} :</span>
                    <span>${item.capacity}</span>
                </div>

                <a href="room-details.html?id=${item.id}" class="view-btn">
                    View Room
                </a>

            </div>

        </article>
    `;

    roomContainer.insertAdjacentHTML("beforeend", roomItem);
});

}