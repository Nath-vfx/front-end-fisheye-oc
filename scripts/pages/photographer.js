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

async function displayPhotographer(data) {
    const dataSection = document.querySelector(".data_section");
    const pp = document.querySelector(".profil-photo");
    const portrait = `assets/photographers/${data.portrait}`
    dataSection.innerHTML = `
      <h2 class="photographer-name">${data.name}</h2>
      <p class="photographer-location">${data.city}, ${data.country}</p>
      <p class="photographer-tagline">${data.tagline}</p>
  `;
    pp.innerHTML = `
  <img class="photographer-portrait" src="${portrait}" alt="">
  `;
}

async function getPhotos(param) {
    try {
        const urlParams = new URLSearchParams(param);
        const urlId = urlParams.get("id");

        const response = await fetch(
            "http://localhost:63342/Front-End-Fisheye/data/photographers.json",
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const photos = data.media;
        const photographersPhotos = photos.filter(
            (photo) => photo.photographerId === parseInt(urlId),
        )
        console.log("Found photos from Photographer:", photographersPhotos);
        return photographersPhotos;
    } catch (error) {
        console.error('Erreur : ', error)
    }
}

// Affiche les images dans la page photographer.html
async function displayPhotos(photos, photographer) {
    //Récupération de la balise d'insertion
    const dataSection = document.querySelector(".photographer_section");
    //Déclaration de la variable d'insertion
    let allPhotos = '';
    //let i = 0;

    //Pour chaque photo contenue dans le tableau photo
        // - SI 'photo.image' est VRAI alors une photo est ajouté à 'allPhotos'
        // - SINON le programme lit l'entrée suivante dans le tableau photos
    photos.forEach((photo) => {
        if (photo.image) {
            //Génération du lien de récupération des photos en utilisant dynamiquement à la fois le nom du photographe et le nom du fichier image
            const photoLink = `assets/photographers/${photographer.name.split(" ")[0]}/${photo.image}`;
            //Concaténation dans la variable allPhotos afin d'éviter l'écrasement par les photos successive dans le HTML
             allPhotos += `
              <div class="photo">
                  <img src="${photoLink}" alt="">
              </div>
            `
            //i++
            //console.log("Boucles : ",i)
        }
    })
    //Ajout de la chaine de caractère dans le DOM
    dataSection.innerHTML = allPhotos
}

async function init() {
    const photographer = await getPhotographer(window.location.search);
    const photos = await getPhotos(window.location.search);
    displayPhotographer(photographer);
    displayPhotos(photos, photographer);
}

init()