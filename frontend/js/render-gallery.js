import { galleryImages } from "./gallery.js";


const galleryGrid = document.querySelector("#gallery-grid");
const filterButtons = document.querySelectorAll(".gallery-filter");


export function renderGallery(filter = "all") {

    galleryGrid.innerHTML = "";


    const filteredImages = filter === "all"
        ? galleryImages
        : galleryImages.filter(image => image.category === filter);


    filteredImages.forEach(image => {

        const galleryItem = document.createElement("article");

        galleryItem.className = "gallery-item";


        galleryItem.innerHTML = `

            <img
                src="${image.image}"
                alt="${image.title}"
                loading="lazy"
            >

            <div class="gallery-overlay">

                <span>
                    ${image.category}
                </span>

                <h3>
                    ${image.title}
                </h3>

            </div>

        `;


        galleryGrid.appendChild(galleryItem);

    });

}


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        button.classList.add("active");


        const filter = button.dataset.filter;

        renderGallery(filter);

    });

});


if (document.querySelector("#gallery-grid")) {
    renderGallery();
}