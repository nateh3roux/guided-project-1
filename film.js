let producer;
let title;
let episode_id;
let director;
let release_date;
let filmsDiv;
let planetDiv;
let characterUl;
let characterInFilm;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  title = document.querySelector("h1#title");
  producer = document.querySelector("span#producer");
  episode_id = document.querySelector("span#episode_id");
  director = document.querySelector("span#director");
  release_date = document.querySelector("span#release_date");

  planet = document.querySelector("span#homeworld");
  characterUl = document.querySelector("#characters>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getFilm(id);
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilms(id);
    // character.homeworld = await fetchHomeworld(character);
    characterInFilm = await fetchCharacter(id);
    console.log(characterInFilm);
  } catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);
}

async function fetchCharacter(filmID) {
  const url = `${baseUrl}/films/${filmID}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  return characters;
}

async function fetchPlanets(filmID) {
  const url = `${baseUrl}/films/${filmID}/planets`;
  const planet = await fetch(url).then((res) => res.json());
  return planet;
}

async function fetchFilms(filmID) {
  const url = `${baseUrl}/films/${filmID}`;
  const films = await fetch(url).then((res) => res.json());
  return films;
}

const renderFilm = (film) => {
  document.title = `SWAPI - ${film?.title}`; // Just to make the browser tab say their name
  producer.textContent = film?.producer;
  title.textContent = film?.title;
  episode_id.textContent = film?.episode_id;
  director.textContent = film?.director;
  release_date.textContent = film?.release_date;
  //   Planet needs work
  homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
  const characterLis = characterInFilm?.map(
    (character) =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
  );
  console.log(characterLis);
  characterUl.innerHTML = characterLis.join("");
};
