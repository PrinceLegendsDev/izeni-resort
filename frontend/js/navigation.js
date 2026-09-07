export async function loadComponent(id, file) {

    const element = document.querySelector(id);

    if (!element) {
        console.error(`Element ${id} not found`);
        return;
    }

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
        }

        const html = await response.text();

        element.innerHTML = html;

    } catch (error) {

        console.error(error);

    }
}

export function initNavigation() {

    const menuButton = document.querySelector(".menu-btn");
    const nav = document.querySelector("#nav");

    if (!menuButton || !nav) return;


    menuButton.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("active");

        menuButton.setAttribute("aria-expanded", isOpen);

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

        menuButton.innerHTML = isOpen
            ? `<i class="fa-solid fa-xmark"></i>`
            : `<i class="fa-solid fa-bars"></i>`;

        document.body.classList.toggle("menu-open", isOpen);

    });


    /* Close menu when a link is clicked */

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open menu"
            );

            menuButton.innerHTML =
                `<i class="fa-solid fa-bars"></i>`;

            document.body.classList.remove("menu-open");

        });

    });

}