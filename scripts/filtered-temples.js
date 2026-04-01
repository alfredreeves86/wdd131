const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Add more temple objects here...
    {
        templeName: "Oakland California",
        location: "Oakland, California, United States",
        dedicated: "1964, November,17",
        area: 80157,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/oakland-california-temple/oakland-california-temple-2654-main.jpg"
    },
    {
        templeName: "Nuku'alofa Tonga",
        location: "Liahona, Tongatapu, Tonga",
        dedicated: "1983, August, 9",
        area: 21184,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/nuku'alofa-tonga-temple/nuku'alofa-tonga-temple-12094-main.jpg"
    },
    {
        templeName: "Tokyo Japan",
        location: "Minato-ku, Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 53997,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-26340-main.jpg"
    }
];

const templeGrid = document.querySelector(".temple-grid");
const navigationLinks = document.querySelectorAll("#primary-nav a"); //get all navigation links for each menu respon on trigger
const pageTitle = document.querySelector(".page-title");//find page heading that match the title when selected filter
    //(create card)
function createTempleCard(temple) {
    const card = document.createElement("figure");
    const image = document.createElement("img");
    const caption = document.createElement("figcaption");
    const name = document.createElement("h3");
    const location = document.createElement("p");
    const dedicated = document.createElement("p");
    const area = document.createElement("p");

    card.classList.add("temple-card");

    //(text)
    name.textContent = temple.templeName;
    location.textContent = `Location: ${temple.location}`;
    dedicated.textContent = `Dedicated: ${temple.dedicated}`;
    area.textContent = `Area: ${temple.area.toLocaleString()} square feet`;

    //(image)
    image.src = temple.imageUrl;
    image.alt = `${temple.templeName} Temple`;

    //(using lazy loading)
    image.loading = "lazy";
    image.width = 400;
    image.height = 250;

    //(context inside caption)
    caption.append(name, location, dedicated, area);
    card.append(image, caption);

    return card;
}

function displayTemples(templeList) {
    if (!templeGrid) return;

    templeGrid.innerHTML = ""; //Note: Remove/clear old cards so the list can be rebuilt.

    const fragment = document.createDocumentFragment();

    //(loop array create card for each)
    templeList.forEach((temple) => {
        fragment.appendChild(createTempleCard(temple));
    });

    templeGrid.appendChild(fragment);
}
//reading year from dedicated string for comparing ages.
function getTempleYear(temple) {
    const dedicatedParts = temple.dedicated.split(",");
    const year = Number(dedicatedParts[0].trim());

    return year;
}

//menu item as filtered accordingly
function filterTemples(filter) {
    let filteredTemples = temples;
    let headingText = "House of the Lord";

    //filtered name as selected in the navigation list
    if (filter === "old") {
        filteredTemples = temples.filter((temple) => getTempleYear(temple) < 1900);
        headingText = "Old Temples";
    } else if (filter === "new") {
        filteredTemples = temples.filter((temple) => getTempleYear(temple) > 2000);
        headingText = "New Temples";
    } else if (filter === "large") {
        filteredTemples = temples.filter((temple) => temple.area > 90000);
        headingText = "Large Temples";
    } else if (filter === "small") {
        filteredTemples = temples.filter((temple) => temple.area < 10000);
        headingText = "Small Temples";
    }

    //filtered results on the page
    displayTemples(filteredTemples);

    //update heading
    if (pageTitle) pageTitle.textContent = headingText;
}

//navigation link for each menu item filter(trigger/click)
navigationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); //note:stop link from jumping back top

        const selectedFilter = event.target.textContent.trim().toLowerCase();

        filterTemples(selectedFilter);
    });
})
//call funtion of the temples array
displayTemples(temples);