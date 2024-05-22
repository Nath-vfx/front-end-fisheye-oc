const sortSelector = document.getElementById('sortSelector');
let photographies = [];
let photographerId = null;

async function getPhotographer(param) {
    try {
        const urlParams = new URLSearchParams(param);
        const urlId = urlParams.get("id");
        console.log("Extracted ID:", urlId);

        const response = await fetch(
            "/data/photographers.json",
        );
        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const photographers = data.photographers;

        const photographer = photographers.find(
            (photographer) => photographer.id === parseInt(urlId),
        );
        console.log("Found Photographer:", photographer);
        photographerId = photographer;
        localStorage.setItem("photographer", photographerId.name.split(" ")[0]);
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
/*
function addSort(photos, el) {
    return photos.sort(function (a, b) {
        //console.log('Type of sort : ', typeof (a[el]));
        if (typeof a[el] === 'number' && typeof b[el] === 'number') {
            //console.log('Type of sort : ', a[el]);
            return b[el] - a[el]; // Comparaison numérique pour les nombresk
        } else {
            //console.log('Type of sort : ', a[el]);
            return a[el].localeCompare(b[el]); // Comparaison lexicographique pour les chaînes
        }
    })
}*/



async function getPhotos(param) {
    try {
        const urlParams = new URLSearchParams(param);
        const urlId = urlParams.get("id");

        const response = await fetch(
            "/data/photographers.json",
        );
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const photos = data.media;
        let photographersPhotos;
        photographersPhotos = photos.filter(
            (photo) => photo.photographerId === parseInt(urlId),
        );
        //console.log("Found photos from Photographer:", addSort(photographersPhotos, 'title'));

        photographies = photographersPhotos;

        console.log('Photos : ',photographies);
    } catch (error) {
        console.error('Erreur : ', error)
    }
}

async function sortPhotos(criteria) {
    photographies.sort((a, b) => {
        if (criteria === "popularity") {
            return b.likes - a.likes
        } else if (criteria === "date"){
            return new Date(b.date) - new Date(a.date)
        } else if (criteria === "title") {
            return a.title.localeCompare(b.title);
        }
    })
    displayPhotos(photographies, photographerId);
}

sortSelector.addEventListener('change', (event) => {
    const criteria = event.target.value;
    sortPhotos(criteria);
});



// Affiche les images dans la page photographer.html
async function displayPhotos(photos, photographer) {
    //Récupération de la balise d'insertion
    const dataSection = document.querySelector(".photographer_section");
    //Déclaration de la variable d'insertion
    let allPhotos = '';
    let table = []
    //let i = 0;

    //Pour chaque photo contenue dans le tableau photo
        // - SI 'photo.image' est VRAI alors une photo est ajouté à 'allPhotos'
        // - SINON le programme lit l'entrée suivante dans le tableau photos
    photos.forEach((photo, index) => {
        if (photo.image) {
            table.push(photo);
            //Génération du lien de récupération des photos en utilisant dynamiquement à la fois le nom du photographe et le nom du fichier image
            let photoLink = `assets/photographers/${localStorage.getItem("photographer")}/${photo.image}`;
            //Concaténation dans la variable allPhotos afin d'éviter l'écrasement par les photos successive dans le HTML
             allPhotos += `
              <div class="photo" >
                  <img src="${photoLink}" alt="" onclick="getImageInfos('${photoLink}','${photo.title}', '${index}'); toggleCarrousel()" >
                  <div class="Photo-infos">
                    <span class="Photo-title">${photo.title}</span>
                    <div class="Photo-likes">
                    <svg class="Photo-like-icon" xmlns="http://www.w3.org/2000/svg" viewBox="-32 0 576 512">
                        <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
                    </svg>
                    <span class="Photo-likes-counter">${photo.likes}</span>
                    </div>  
                </div>
                  
              </div>
            `
            //i++
            //console.log("Boucles : ",i)
        }
    })
    //Ajout de la chaine de caractère dans le DOM
    dataSection.innerHTML = allPhotos
    console.log('Table : ', table)
    localStorage.setItem('photographies', JSON.stringify(table));
}

function addLike() {
    const likeButtons = document.querySelectorAll('.Photo-likes');
    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (e) => {
            likeButton.querySelector('.Photo-like-icon').classList.toggle('liked');
            // Sélection de l'élément à incrémenter
            let addALike = likeButton.querySelector('.Photo-likes-counter')
            // Ajout de la classe spécifique
            addALike.classList.toggle('add-like');
            // Si la classe est trouvé alors incrémentation +1
            // Sinon incrémentation -1
            if (addALike.classList.contains('add-like')) {
                addALike.innerText = parseInt(addALike.innerText) + 1;
            } else {
                addALike.innerText = parseInt(addALike.innerText) - 1;
            }
        })
    }
}



async function init() {
    const photographer = await getPhotographer(window.location.search);
    const photos = await getPhotos(window.location.search);
    displayPhotographer(photographerId);
    displayPhotos(photographies, photographer);
    addLike();
}

init()