const apiKey = "1a3a23dc";
const baseUrl = "https://www.omdbapi.com/";

function fetchMovieData(movieTitles) {
  movieTitles.forEach((movieTitle) => {
    const url = `${baseUrl}?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          newPageMovieDetails(data);
        } else {
          console.error(`Error fetching movie data for ${movieTitle}: ${data.Error}`);
          alert(`Error fetching movie data for ${movieTitle}: ${data.Error}`);
        }
      })
      .catch((error) => {
        console.error(`Error fetching movie data for ${movieTitle}:`, error);
        alert(`Error fetching movie data for ${movieTitle}: ${error.message}`);
      });
  });
}

function newPageMovieDetails(movieData) {
  const cardContainer = document.getElementById("full-movie2");
  const cardHTML = `
    <div class="background-image" id="background">
      <img src="${movieData.Poster}" alt="${movieData.Title}">
    </div>

    <div>
      <div class="back-home" onclick="getBackToPage()">
        <img src="images/btn - Previous.png" alt="previous button" />
        <p class="back-txt">Back Home</p>
      </div>

      <div class="info info1">
        <h1 class="title" id="movie-title">${movieData.Title}</h1>
        <img src="images/Review.png" alt="review stars" />
        <p>10M+ views</p>

        <img src="images/IMDB_Logo_2016.svg.png" alt="imdb logo" />
        <p class="description" id="movie-description">${movieData.Plot}</p>

        <div class="watchlist-btn">
          <button class="watchlist-button1">
            <i class="fa fa-plus" style=""></i>
            Watchlist
          </button>
        </div>

        <button class="watch-btn">Watch Now</button>
      </div>
    </div>
    <div class="image-items">
      <img class="movie-image" id="movie-img-id" src="${movieData.Poster !== "N/A" ? movieData.Poster : "images/placeholder.jpg"}" alt="${movieData.Title}">
      <div class="top-rated">top-rated</div>
    </div>
  `;
  
  cardContainer.innerHTML = cardHTML;

}



// Movie title from localStorage
const selectedMovieTitle = localStorage.getItem('selectedMovieTitle');
const movieTitles = selectedMovieTitle ? [selectedMovieTitle] : [];
fetchMovieData(movieTitles);

console.log(selectedMovieTitle)



function getBackToPage() {
  window.location.href = "index.html";
  localStorage.clear();
  selectedMovieTitle = "";
}
