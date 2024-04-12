async function getPhotographer(param) {
  try {
    const urlParams = new URLSearchParams(param);
    const urlId = urlParams.get("id");
    console.log("Extracted ID:", urlId);

    const response = await fetch(
        "http://localhost:63342/Front-End-Fisheye/data/photographers.json",
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const photographers = data.photographers;

    const photographer = photographers.find(
        (photographer) => photographer.id === parseInt(urlId),
    );
    console.log("Found Photographer:", photographer);
    return photographer;
  } catch (e) {
    console.error('There was a problem with fetching the photographer:', e);
  }
}

async function displayPhotographer (data) {
  const dataSection = document.querySelector(".data_section");
  const portrait = `assets/photographers/${data.portrait}`
  dataSection.innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.city}, ${data.country}</p>
      <p>${data.tagline}</p>
      <img src="${portrait}" alt="">
  `;
}

async function init() {
  const photographer = await getPhotographer(window.location.search);
  displayPhotographer(photographer);
}

init()