const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", fetchData);

fetchData();

async function fetchData() {
  console.clear();
  try {
    const res = await fetch(
      "https://api.modrinth.com/v2/search?query=" +
        searchBar.value +
        "&limit=5&index=relevance"
    );
    const data = await res.json();
    showData(data);
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
