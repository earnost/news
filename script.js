const archiveSearch = document.querySelector("#archive-search");
const archiveEntries = [...document.querySelectorAll(".archive-entry")];
const archiveFilters = [...document.querySelectorAll(".archive-filter")];
const archiveCount = document.querySelector("#archive-count");
const archiveEmpty = document.querySelector(".archive-empty");

let activeArchiveFilter = "all";

function updateArchiveResults() {
    if (!archiveEntries.length) {
        return;
    }

    const queryTerms = archiveSearch.value
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);
    let visibleCount = 0;

    archiveEntries.forEach((entry) => {
        const typeMatches =
            activeArchiveFilter === "all" ||
            entry.dataset.type === activeArchiveFilter;
        const searchText = entry.dataset.search;
        const textMatches = queryTerms.every((term) => searchText.includes(term));
        const isVisible = typeMatches && textMatches;

        entry.hidden = !isVisible;

        if (isVisible) {
            visibleCount += 1;
        }
    });

    archiveCount.textContent = visibleCount;
    archiveEmpty.hidden = visibleCount > 0;
}

archiveSearch?.addEventListener("input", updateArchiveResults);

archiveFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
        activeArchiveFilter = filter.dataset.filter;

        archiveFilters.forEach((button) => {
            button.classList.toggle("is-active", button === filter);
        });

        updateArchiveResults();
    });
});

updateArchiveResults();



const scores = document.querySelectorAll(".score");

let total = 0;

scores.forEach(score => {

    total += parseFloat(score.textContent);

});

const average = (total / scores.length).toFixed(1);

document.getElementById("overall-score").innerHTML =
    `${average}<span>/10</span>`;

let verdict = "";

if (average >= 9.5)
    verdict = "Editor's Choice";
else if (average >= 8.5)
    verdict = "Highly Recommended";
else if (average >= 7.5)
    verdict = "Recommended";
else if (average >= 6.5)
    verdict = "Worth Watching";
else if (average >= 5)
    verdict = "Mixed Recommendation";
else
    verdict = "Not Recommended";

document.getElementById("recommendation").textContent = verdict;