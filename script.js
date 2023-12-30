document.addEventListener("DOMContentLoaded", function () {
  getCurrentImageOfTheDay();
  loadSearchHistory();

  document
    .getElementById("search-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      getImageOfTheDay();
    });

  document
    .getElementById("search-history")
    .addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        const selectedDate = event.target.textContent;
        getImageOfTheDay(selectedDate);
      }
    });
});

function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  getImage(currentDate);
}

function getImageOfTheDay() {
  const selectedDate = document.getElementById("search-input").value;
  if (selectedDate) {
    saveSearch(selectedDate);
    addSearchToHistory(selectedDate);
    getImage(selectedDate);
  }
}

function getImage(date) {
  const apiKey = "ehR4Jjw8uqetyfMqx0UNhSht8GNHdfjqZeDNfD5Y";
  const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => displayImage(data))
    .catch((error) => console.error("Error fetching data:", error));
}

function displayImage(data) {
  const imageContainer = document.getElementById("current-image-container");
  imageContainer.innerHTML = `
        <img src="${data.url}" alt="${data.title}">
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory(date) {
  const searchHistoryList = document.getElementById("search-history");
  const listItem = document.createElement("li");
  listItem.textContent = date;
  searchHistoryList.appendChild(listItem);
}

function loadSearchHistory() {
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  const searchHistoryList = document.getElementById("search-history");
  searches.forEach((date) => {
    const listItem = document.createElement("li");
    listItem.textContent = date;
    searchHistoryList.appendChild(listItem);
  });
}
