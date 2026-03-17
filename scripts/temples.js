
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector("#menu");
    const navigation = document.querySelector(".navigation");
    const navigationList = document.querySelector("#primary-nav");

    if (!menuButton || !navigation || !navigationList) return;

    menuButton.setAttribute("aria-controls", navigationList.id);

    const setMenuState = (isOpen) => {
        navigation.classList.toggle("open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.textContent = isOpen ? "x" : "☰";

    };

    setMenuState(false);

    menuButton.addEventListener("click", () => {
        setMenuState(!navigation.classList.contains("open"));
    });

    navigationList.addEventListener("click", (event) => {
        if (!event.target.closest("a")) return;
        setMenuState(false);
    });

    window.addEventListener("resize", () => {
        if (window.matchMedia("(min-width: 768px)").matches) {
            setMenuState(false);
        }
    });

});