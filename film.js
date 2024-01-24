let producer;
let title;
let episode_id;
let director;
let release_date;
let filmsDiv;
let planetDiv;
let characterUl;
let characterInFilm;

let planets;
let planetsInFilm;
// let planetHTML;

const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  title = document.querySelector("h1#title");
  producer = document.querySelector("span#producer");
  episode_id = document.querySelector("span#episode_id");
  director = document.querySelector("span#director");
  release_date = document.querySelector("span#release_date");

  planets = document.querySelector("span#planet");
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
    planetsInFilm = await fetchPlanets(id);
    console.log(planetsInFilm);
    // console.log(characterInFilm);
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
  //   const planetsLis = planetsInFilm?.map => ( (pl)
  //     `<a href="/planet.html?id=${planetsInFilm.id}">${planetsInFilm.name}</a>`;
  //   );
  //   planets.innerHTML = `<a href="/planet.html?id=${planetsInFilm.id}">${planetsInFilm.name}</a>`;
  const planetLis = planetsInFilm?.map(
    (pl) => `<li><a href="/character.html?id=${pl.id}">${pl.name}</li>`
  );

  const characterLis = characterInFilm?.map(
    (character) =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
  );
  console.log(characterLis);
  planets.innerHTML = planetLis.join("");
  characterUl.innerHTML = characterLis.join("");
};
