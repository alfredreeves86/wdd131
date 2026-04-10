const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];
//constant key name using to store completed review count in localStorag(according to assignment)
const reviewCountKey = "completedReviewCount";
//constant stores per-tab key so same submitted URL doesn't count
const reviewSessionKey = "lastCountedReviewQuery";
//grabs product user select from form.html if script is running on the form page.
const productSelect = document.getElementById("productId");
const reviewCountOutput = document.getElementById("reviewCount");
//grabs the selected product placeholder from the review.html
const selectedProductOutput = document.getElementById("selectedProduct");

function populateProductOptions() {
    //stop early if current page does not contain any product select element.
    if (!productSelect) {
        return;
    }

    //Building one option for each product object in the array.
    products.forEach((product) => {
        const option = document.createElement("option");

        //Visible option thext comes from the product name field.
        option.textContent = product.name;
        //submitted value
        option.value = product.id;
        productSelect.append(option);
    });
}

//going beyond on this assignment requriement.
//funtion reads URL query string on review.html and returns the matching product
function getSubmittedProduct() {
    const params = new URLSearchParams(window.location.search);
    const submittedProductId = params.get("productId");
    //find the product with id matches the submitted select value
    return products.find((product) => product.id === submittedProductId) ?? null;
}

//function for increment localStorage counter
function updateCompletedReviewCount() {
    if (!reviewCountOutput) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const hasSubmittedReview = params.has("productId") && params.has("overallRating") && params.has("installationDate");
    const currentQuery = window.location.search;
    const lastCountedQuery = sessionStorage.getItem(reviewSessionKey);

    //increment when review.html was reached by a submission
    if (hasSubmittedReview && currentQuery !== lastCountedQuery) {
        const storedCount = Number(localStorage.getItem(reviewCountKey)) || 0;
        const newCount = storedCount + 1;

        //save the update review count so it presistence accross.(easy reconizing count)
        localStorage.setItem(reviewCountKey, String(newCount));

        //notes from google(sessionStorage)
        sessionStorage.setItem(reviewSessionKey, currentQuery);
    }

    //Read back stored count appears in review.html.
    reviewCountOutput.textContent = localStorage.getItem(reviewCountKey) ?? "0";
}

//last function(show submitted product name on review.html for a solid confirmation)
function showSubmittedProduct() {
    //stoping early if current page does not contain confirmation.
    if (!selectedProductOutput) {
        return;
    }

    const submittedProduct = getSubmittedProduct();

    //display product name when it mactch product id
    selectedProductOutput.textContent = submittedProduct ? submittedProduct.name : "you selected product";
}

//run form-page setup when form.html is open
populateProductOptions();

//run review-page setup when review.html is open
updateCompletedReviewCount();
showSubmittedProduct();

//getdate and lastModification
const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}
