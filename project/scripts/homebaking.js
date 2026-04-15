//allow only one <details> accordion open at a time//
(function () {
    const accordions = document.querySelectorAll("[data-accordion]");

    if (!accordions.length) {
        return;
    }

    accordions.forEach((details) => {
        details.addEventListener("toggle", () => {
            if (!details.open) {
                return;
            }

            accordions.forEach((other) => {
                if (other !== details) {
                    other.open = false;
                }
            });
        });
    });
})();

const recipes = [
    {
        id: "cookie",
        name: "Brown Butter Chocolate Chip Cookie"
    },
    {
        id: "brownies",
        name: "Fudgy One-Bowl Brownies"
    },
    {
        id: "cupcakes",
        name: "Classic Vanilla Cupcakes"
    },
    {
        id: "lemon-loaf",
        name: "Lemon Blueberry Loaf"
    },
    {
        id: "cinnamon-rolls",
        name: "Cinnamon Rolls"
    },
    {
        id: "cheesecake",
        name: "No-Bake Cheesecake"
    },
    {
        id: "ganache-tart",
        name: "Chocolate Ganache Tart"
    },
    {
        id: "shortbread",
        name: "Shortbread Cookies"
    },
    {
        id: "banana-bread",
        name: "Banana Bread"
    },
    {
        id: "crepes",
        name: "French Crepes"
    }
];

//local storage counting review//
const feedbackCountKey = "completedFeedbackCount";
const feedbackSessionKey = "lastCountedFeedbackQuery";

//using recipes action in reviw.html//
const recipeSelect = document.getElementById("recipeId");
const feedbackForm = document.querySelector(".review-form[action='review.html']");

//fills recipe dropdown with shared array create options//
function populateRecipeOptions() {
    if (!recipeSelect) {
        return;
    }

    const hasRecipeOptions = recipeSelect.querySelector("option[value]:not([value=''])");

    if (hasRecipeOptions) {
        return;
    }

    //add recipe choice from data array//
    recipes.forEach((recipe) => {
        const option = document.createElement("option");

        option.value = recipe.id;
        option.textContent = recipe.name;
        recipeSelect.append(option);
    });
}
//get recipe name from saved id.//
function findRecipeName(recipeId) {
    return recipes.find((recipe) => recipe.id === recipeId)?.name ?? "Selected recipe";
}

//read current total number of succesful submissions from localStorage//

function getStoredFeedbackCount() {
    const storedCount = Number.parseInt(localStorage.getItem(feedbackCountKey) ?? "0", 10);
    return Number.isNaN(storedCount) ? 0 : storedCount;
}

//form prepared before submit, full submit count once, review.html refresh doesn't increase count//
function prepareFeedbackFormSubmission() {
    if (!feedbackForm) {
        return;
    }

    feedbackForm.addEventListener("submit", () => {
        let submissionInput = feedbackForm.querySelector("input[name='submissionId']");

        if (!submissionInput) {
            submissionInput = document.createElement("input");
            submissionInput.type = "hidden";
            submissionInput.name = "submissionId";
            feedbackForm.append(submissionInput);
        }

        //ignore count blank page refreshes//
        submissionInput.value = String(Date.now());
    });

}

//updating feedback submitted in review.html counter//
function countFeedbackSubmission(params) {
    const feedbackCountOutput = document.getElementById("feedbackCount");

    if (!feedbackCountOutput) {
        return;
    }

    const recipeId = params.get("recipeId");

    if (!recipeId) {
        feedbackCountOutput.textContent = String(getStoredFeedbackCount());
        return;
    }

    const submissionId = params.get("submissionId");
    const lastCountedSubmission = sessionStorage.getItem(feedbackSessionKey);
    let completedFeedbackCount = getStoredFeedbackCount();

    //blocking duplicate count, localStorage keeps total after browser closes//
    if (submissionId && submissionId !== lastCountedSubmission) {
        completedFeedbackCount += 1;
        localStorage.setItem(feedbackCountKey, String(completedFeedbackCount));
        sessionStorage.setItem(feedbackSessionKey, submissionId);
    }
    
    feedbackCountOutput.textContent = String(completedFeedbackCount);
}

//rating star fade effect//
function createStars(ratingValue) {
    const rating = Number.parseInt(ratingValue ?? "", 10);

    if (!rating || rating < 1 || rating > 5) {
        return "Not provided";
    }

    return `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;
}

//place text into element id, fallback message when submitted value missing//
function setTextContent(id, value, fallback = "Not provided") {
    const element = document.getElementById(id);

    if (!element) {
        return;
    }

    const resolvedValue = value && String(value).trim() ? value : fallback;
    element.textContent = resolvedValue;
}

//Use uppercase in letter in the review page from values choice//
function formatChoice(value) {
    if (!value) {
        return "Not provided";
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
}

//main review-page renderer, fill review field wih matched submit data//
function renderReviewPage() {
    const reviewSummary = document.querySelector("[data-review-summary]");

    if (!reviewSummary) {
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get("recipeId");
    const reviewEmptyState = document.getElementById("reviewEmptyState");
    const reviewContent = document.getElementById("reviewContent");

    countFeedbackSubmission(params);

    if (!recipeId) {
        if (reviewEmptyState) {
            reviewEmptyState.hidden = false;
        }

        if (reviewContent) {
            reviewContent.hidden = true;
        }

        return;
    }

    if (reviewEmptyState) {
        reviewEmptyState.hidden = true;
    }

    if (reviewContent) {
        reviewContent.hidden = false;
    }

    //read the submitted values from URL string and place into page.//
    setTextContent("recipeName", findRecipeName(recipeId));
    setTextContent("submittedRecipe", findRecipeName(recipeId));
    setTextContent("triedGuidesValue", formatChoice(params.get("tried-guides")));
    setTextContent("presentationStars", createStars(params.get("presentation-rating")));
    setTextContent(
        "easyRatingValue",
        params.get("easyRating") ? `${params.get("easyRating")} / 5` : "",
        "Not provided"
    );
    setTextContent("recommendValue", formatChoice(params.get("recommend")));
    setTextContent("writtenReviewValue", params.get("writtenReview"), "No written review was added.");
    setTextContent("emailValue", params.get("userEmail"), "No email provided.");
}

populateRecipeOptions();
prepareFeedbackFormSubmission();
renderReviewPage();


//getdate and lastModification
const currentYear = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}
