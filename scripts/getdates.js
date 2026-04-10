const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}