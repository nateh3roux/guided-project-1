// https://swapi2.azurewebsites.net/
// base url that has all the end points

// Gets base URL
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Adds an even listener so the films page laods the information when the film.html is loaded
addEventListener("DOMContentLoaded", () => {
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");

  film = fetchFilm(id);
  console.log(film);
});

// Gets the film information from the API Call.
async function fetchFilm(filmID) {
  // Done this way as the syntax formatting is not showing that string interpolation is working or not.
  let url = "https://swapi2.azurewebsites.net/api/films/${filmID}";
  const films = await fetch(url).then((res) => res.json());
  return films;
}
