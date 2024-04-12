async function getPhotographers() {
  const response = await fetch(
      "http://localhost:63342/Front-End-Fisheye/data/photographers.json",
  );
  const photographers = await response.json();
  console.log("Réponse : ", photographers);
  // et bien retourner le tableau photographers seulement une fois récupéré
  return photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = indexTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
