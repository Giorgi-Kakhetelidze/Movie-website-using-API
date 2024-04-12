const hamMenu = document.querySelector(".ham-menu");
const searchBox = document.querySelector(".search-box");
const apiKey = "1a3a23dc";
const baseUrl = "http://www.omdbapi.com/";

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
  searchBox.classList.toggle("deactive");
});

const movieTitles = ["Avatar", "The Walking Dead", "Inception", "Daryl Dixon"];

function displayMovieDetails(movieData, index) {
  const cardContainer = document.getElementById("movie-card-container");

  const cardHTML = `
    <div class="card1" onclick="navigateToPage(${index})"> <!-- Pass the index of the clicked movie -->
      <div class="img">
        <img class="movie-image" id="movie-img-id" src="${
          movieData.Poster !== "N/A" ? movieData.Poster : "placeholder.jpg"
        }" alt="${movieData.Title}">
        <h6 class="rating" id="movie-rating">${movieData.imdbRating}</h6>
      </div>
      <h3 class="title" id="movie-title">${movieData.Title}</h3>
      <img class="review-image" src="images/Review.png" class="review-img" alt="">
      <p class="description" id="movie-description">${movieData.Plot}</p>
    </div>
  `;

  cardContainer.innerHTML += cardHTML;
}

function navigateToPage(index) {
  const movieTitle = movieTitles[index]; // Getting movie title using the index
  localStorage.setItem("selectedMovieTitle", movieTitle);
  window.location.href = "moviePage.html";
}

// Fetch movie data for each title and display it
movieTitles.forEach((movieTitle, index) => {
  fetchMovieData(movieTitle, index);
});

function fetchMovieData(movieTitle, index) {
  const url = `${baseUrl}?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovieDetails(data, index); // Pass the index to displayMovieDetails
      } else {
        console.error(
          `Error fetching movie data for ${movieTitle}: ${data.Error}`
        );
      }
    })
    .catch((error) =>
      console.error(`Error fetching movie data for ${movieTitle}:`, error)
    );
}

function navigateToSearchPage() {
  const inputValue = document.getElementById("search").value;
  localStorage.setItem("inputValue", inputValue);
  window.location.href = "searchPage.html";
}
