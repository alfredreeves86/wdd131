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