import { rooms } from "./rooms.js";

export function readRoom() {

    const urlParams = new URLSearchParams(window.location.search);
    const roomId = Number(urlParams.get("id"));

    const room = rooms.find(item => item.id === roomId);

    const container = document.querySelector("#room-details-container");

    if (!container) return;

    if (!room) {

        container.innerHTML = `
            <h2>Room Not Found</h2>

            <p>
                The room you are looking for does not exist.
            </p>

            <a href="rooms.html">
                Back to Rooms
            </a>
        `;

        return;
    }


    /* ========================================
       ROOM FEATURES
    ======================================== */

    const featuresHTML = room.features
        .map(feature => `<li>${feature}</li>`)
        .join("");


    /* ========================================
       ROOM IMAGES
    ======================================== */

    const imagesHTML = room.images
        .map((image, index) => `
            <img
                src="${image}"
                alt="${room.name} - image ${index + 1}"
            >
        `)
        .join("");


    /* ========================================
       ROOM DETAILS
    ======================================== */

    container.innerHTML = `

        <article class="room-details-page">

            <div class="room-gallery">

                ${imagesHTML}

            </div>


            <div class="room-details-content">

                <h1>${room.name}</h1>

                <p>
                    ${room.description}
                </p>

                <p>
                    <strong>Room Number:</strong>
                    ${room.number}
                </p>

                <p>
                    <strong>Capacity:</strong>
                    ${room.capacity}
                </p>

                <p>
                    <strong>Price:</strong>
                    K${room.price} / night
                </p>

                <p>
                    <strong>Status:</strong>
                    ${room.status}
                </p>


                <h3>Room Features:</h3>

                <ul>
                    ${featuresHTML}
                </ul>


                <div class="room-actions">

                    <a href="rooms.html">
                        Back to Rooms
                    </a>

                    <button
                        type="button"
                        class="${room.status === "occupied" ? "occupied" : "available"}"
                        ${room.status === "occupied" ? "disabled" : ""}
                    >
                        Book Room
                    </button>

                </div>

            </div>

        </article>
    `;
}