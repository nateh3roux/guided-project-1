let name1;
let diameter;
let rotation_period;
let population;
let filminplanets;
// let planetHTML;

const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener("DOMContentLoaded", () => {
  name1 = document.querySelector("h1#name1");
  diameter = document.querySelector("span#diameter");
  rotation_period = document.querySelector("span#rotation_period");
  population = document.querySelector("span#population");
  filmlist = document.querySelector("span#filmlist")
 

  planets = document.querySelector("#planets>ul");
  characterUl = document.querySelector("#characters>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getplanet(id);
});

async function getplanet(id) {
  let planet;
  try {
    planet = await fetchplanet(id);
    // character.homeworld = await fetchHomeworld(character);
    // characterInFilm = await fetchCharacter(id);
    filminplanets = await fetchfilms(id);
    console.log(filminplanets);
    // console.log(characterInFilm);
  } catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderplanet(planet);
}

// Get character objects
// async function fetchCharacter(filmID) {
//   const url = `${baseUrl}/films/${filmID}/characters`;
//   const characters = await fetch(url).then((res) => res.json());
//   return characters;
//}

// Get Planet Object
async function fetchfilms(filmID) {
  const url = `${baseUrl}/planets/${filmID}/films`;
  const film = await fetch(url).then((res) => res.json());
  return film;
}

// Get films object.
async function fetchplanet(planetID) {
  const url = `${baseUrl}/planets/${planetID}`;
  const planet = await fetch(url).then((res) => res.json());
  return planet;
}

const renderplanet = (planet) => {
  document.title = `SWAPI - ${planet?.title}`; // Just to make the browser tab say their name
  name1.textContent = planet?.name;
  diameter.textContent = planet?.diameter;
  rotation_period.textContent = planet?.rotation_period;
  population.textContent = planet?.population;
  

  // Adds the planets to a list that is then appdended.
const filmUl =filminplanets?.map(
    (pl) => `<li><a href="/film.html?id=${pl.id}">${pl.name}</li>`
  );

//   const characterLis = characterInFilm?.map(
//     (character) =>
//       `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
//   );
//console.log(characterLis);
filmlist.innerHTML = filmUl.join("");
//characterUl.innerHTML = characterLis.join("");

};
