document.addEventListener("DOMContentLoaded", async () => {
  const apiKey = "1a3a23dc";
  const baseUrl = "https://www.omdbapi.com/";
  const searchInput = localStorage.getItem('inputValue');
  const card = document.querySelector(".card");

  if (searchInput) {
    const response = await fetch(`${baseUrl}?apikey=${apiKey}&s=${searchInput}`);
    const data = await response.json();

    if (data.Search && data.Search.length > 0) {
      const firstResult = data.Search[0];
      const movieId = firstResult.imdbID;
      const movieResponse = await fetch(`${baseUrl}?apikey=${apiKey}&i=${movieId}`);
      const movieData = await movieResponse.json();

      if (movieData.Poster !== "N/A") {
        card.querySelector(".img").style.backgroundImage = `url(${movieData.Poster})`;
      } else {
        card.querySelector(".img").style.backgroundImage = "url(default_poster_url)";
      }

      card.querySelector(".rating").textContent = `Rating: ${movieData.imdbRating}`;
      card.querySelector(".title").textContent = movieData.Title;
      card.querySelector(".description").textContent = movieData.Plot;
    } else {
      card.querySelector(".img").style.backgroundImage = "";
      card.querySelector(".rating").textContent = "";
      card.querySelector(".title").textContent = "No results found";
      card.querySelector(".description").textContent = "";
    }
  }
});


function navigateToMainPage() {
  localStorage.clear()
  window.location.href = "index.html";

}