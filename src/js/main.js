import "../scss/styles.scss";
import movies from "../db/imdb_top_1000.json";
import grinch from "../img/grinch.png";

const cardContainer = document.querySelector("#cardContainer");
const inputSearch = document.querySelector("#search");
const select = document.querySelector("#select");

// filter variables
let search = "";
let genre = "";

const distinctGenres = [
  "Drama",
  "Crime",
  "Action",
  "Adventure",
  "Biography",
  "History",
  "Sci-Fi",
  "Romance",
  "Western",
  "Fantasy",
  "Comedy",
  "Thriller",
  "Animation",
  "Family",
  "War",
  "Mystery",
  "Music",
  "Horror",
  "Musical",
  "Film-Noir",
  "Sport",
];

distinctGenres.forEach(addGenreOption);
UpdateCardContainerInnerHTML(movies.MovieData);

inputSearch.addEventListener("input", (e) => {
  search = e.target.value;
  updateTableData();
});

select.addEventListener("input", (e) => {
  genre = e.target.value;
  updateTableData();
});

function updateTableData() {
  let filteredData = movies.MovieData;

  // filter from search
  if (search.length) {
    filteredData = filteredData.filter((movie) => {
      return movie.Series_Title.toString()
        .toLowerCase()
        .includes(search.toLowerCase());
    });
  }

  // filter from genre
  if (genre.length) {
    filteredData = filteredData.filter((movie) => {
      return movie.Genre.toString().toLowerCase().includes(genre.toLowerCase());
    });
  }
  UpdateCardContainerInnerHTML(filteredData);
}

function addGenreOption(genre) {
  var option = document.createElement("option");

  option.text = genre;
  option.value = genre;

  select.add(option, null);
}

function UpdateCardContainerInnerHTML(data) {
  cardContainer.innerHTML = filteredData
    .map((movie) =>
      getCardFromMovieData(
        grinch,
        movie.Series_Title,
        movie.Overview,
        movie.Genre
      )
    )
    .join(" ");
}

function getCardFromMovieData(image, title, overview, genre) {
  return `<div class="card col-sm-6 col-md-4 col-lg-3" style="width: 18rem;">
  <img src="${image}" class="card-img-top" alt="Movie poster">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${overview}</p>
    <a href="#" class="btn btn-primary">${genre}</a>
  </div>
</div>`;
}
