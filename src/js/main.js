// Import our custom CSS
import "../scss/styles.scss";
import movies from "../db/imdb_top_1000.json";

const tableBody = document.querySelector("#body");
const inputSearch = document.querySelector("#search");
const select = document.querySelector("#select");

let search = "";
let genre = "";

const distinctGenres = new Set(
  movies.MovieData.flatMap((movie) =>
    movie.Genre.split(",").map((genre) => genre.trim())
  )
);

distinctGenres.forEach(addGenreOption);

tableBody.innerHTML = movies.MovieData.map(
  (movie) =>
    `<tr>
        <td>${movie.Series_Title}</td>
        <td>${movie.Genre}</td>
    </tr>
    `
).join(" ");

inputSearch.addEventListener("input", (e) => {
  search = e.target.value;
  updateTableData();
});

select.addEventListener("input", (e) => {
  genre = e.target.value;
  updateTableData();
});

function updateTableData() {
  const data = movies.MovieData.filter((movie) => {
    const title = `${movie.Series_Title}`;
    const localGenre = `${movie.Genre}`;
    return search.length
      ? title.length
        ? title.includes(search) && localGenre.includes(genre)
        : title.includes(search)
      : title.length
      ? title.includes(search)
      : true;
  });

  tableBody.innerHTML = data
    .map(
      (movie) =>
        `<tr>
        <td>${movie.Series_Title}</td>
        <td>${movie.Genre}</td>
    </tr>
    `
    )
    .join(" ");
}

function addGenreOption(genre) {
  var option = document.createElement("option");

  option.text = genre;
  option.value = genre;

  select.add(option, null);
}
