(function () {
    const accordions = document.querySelectorAll(`[data-accordion]`);
    if (!accordions.length) return;

    accordions.forEach((details) => {
        details.addEventListener(`toggle`, () => {
            if (!details.open) return;
            accordions.forEach((other) => {
                if (other !== details) other.open = false;
            })
        })
    })
})

//getdate and lastModification
const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}
