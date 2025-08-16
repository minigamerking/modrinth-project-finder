const searchBar = document.getElementById("searchBar");
const luckyButton = document.getElementById("feeling-lucky");

searchBar.addEventListener("input", fetchSearchData);
luckyButton.addEventListener("click", fetchRandomData);

fetchSearchData();

async function fetchSearchData() {
  console.clear();
  try {
    const res = await fetch(
      "https://api.modrinth.com/v2/search?query=" +
        searchBar.value +
        "&limit=20&index=relevance"
    );
    const data = await res.json();
    showData(data);
  } catch (error) {
    console.error(error);
  }
}

async function fetchRandomData() {
  console.clear();
  try {
    const res = await fetch(
      "https://api.modrinth.com/v2/projects_random?count=20"
    );
    const data = await res.json();
    showRandomData(data);
  } catch (error) {
    console.error(error);
  }
}

function showData(data) {
  const cards = document.getElementById("cards");
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }
  for (const mod of data["hits"]) {
    console.log("Adding card");
    const slug = mod["slug"];
    const icon = mod["icon_url"];
    const desc = mod["description"];
    const title = mod["title"];
    let project_card = document.createElement("div");
    project_card.className = "project-card";
    let link = document.createElement("a");
    link.href = "https://modrinth.com/project/" + slug;
    link.textContent = title;
    link.className = "mod-link";
    link.target = "_blank";
    project_card.appendChild(link);
    cards.appendChild(project_card);
  }
}

function showRandomData(data) {
  const cards = document.getElementById("cards");
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }

  const random = randInt(0, data.length);

  const mod = data[random];

  console.log("Adding card");
  const slug = mod["slug"];
  const icon = mod["icon_url"];
  const desc = mod["description"];
  const title = mod["title"];
  let project_card = document.createElement("div");
  project_card.className = "project-card";
  let link = document.createElement("a");
  link.href = "https://modrinth.com/project/" + slug;
  link.textContent = title;
  link.className = "mod-link";
  link.target = "_blank";
  project_card.appendChild(link);
  cards.appendChild(project_card);
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
