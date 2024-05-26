const carousel = document.querySelector('#carrousel');
const image = document.querySelector('.carrousel_image');
const title = document.querySelector('.carrousel_image_title');

let photographer = null;
let photos = []; // Photographies seront assignées plus tard
let photoUrl = ''; // URL de base pour les photos sera assigné plus tard
let ind = 0; // Index de l'image actuelle

//Afficher ou retirer le carrousel
function toggleCarrousel() {
    carousel.classList.toggle('open');
}

//Fermer le carrousel
function closeCarrousel() {
    carousel.classList.remove('open');
}

//Mis à jour de l'image de la modale du carrousel
function updateImage(index) {
    if (photos.length > 0 && index >= 0 && index < photos.length) {
        image.src = photoUrl + photos[index].image;
        title.innerText = photos[index].title;
        ind = index;
        console.log("Current index:", ind);
    } else {
        console.error("Index out of range or photos not loaded:", index);
    }
}

function openCarrousel(index) {
    console.log("Open carrousel with index:", index);
    updateImage(index);
    toggleCarrousel();
}

function nextImage() {
    updateImage((ind + 1) % photos.length);
}

function previousImage() {
    updateImage((ind - 1 + photos.length) % photos.length);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        nextImage();
    } else if (event.key === 'ArrowLeft') {
        previousImage();
    } else if (event.key === 'Escape') {
        closeCarrousel();
    }
});

async function getPhotographer(param) {
    try {
        const urlParams = new URLSearchParams(param);
        const urlId = urlParams.get("id");
        console.log("Extracted ID:", urlId);

        const response = await fetch("/data/photographers.json");
        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
            return;
        }
        const data = await response.json();
        photographer = data.photographers.find(photographer => photographer.id === parseInt(urlId));
        if (!photographer) {
            console.error('Photographer not found.');
            return;
        }
        console.log("Found Photographer:", photographer);
        localStorage.setItem("photographer", photographer.name.split(" ")[0]);
    } catch (e) {
        console.error('There was a problem with fetching the photographer:', e);
    }
}

async function getPhotos(param) {
    try {
        const urlParams = new URLSearchParams(param);
        const urlId = urlParams.get("id");

        const response = await fetch("/data/photographers.json");
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const data = await response.json();
        photos = data.media.filter(photo => photo.photographerId === parseInt(urlId) && photo.image);
        console.log('Filtered Photos:', photos);

        if (photos.length > 0) {
            photoUrl = `assets/photographers/${localStorage.getItem("photographer")}/`;
        } else {
            console.error('No photos found for this photographer.');
        }
    } catch (error) {
        console.error('Erreur :', error);
    }
}

async function sortPhotos(criteria) {
    photos.sort((a, b) => {
        if (criteria === "popularity") {
            return b.likes - a.likes;
        } else if (criteria === "date") {
            return new Date(b.date) - new Date(a.date);
        } else if (criteria === "title") {
            return a.title.localeCompare(b.title);
        }
    });
    displayPhotos();
}

document.getElementById('sortSelector').addEventListener('change', (event) => {
    const criteria = event.target.value;
    sortPhotos(criteria);
});

async function displayPhotographer(data) {
    const dataSection = document.querySelector(".data_section");
    const pp = document.querySelector(".profil-photo");
    const portrait = `assets/photographers/${data.portrait}`;
    dataSection.innerHTML = `
        <h2 class="photographer-name">${data.name}</h2>
        <p class="photographer-location">${data.city}, ${data.country}</p>
        <p class="photographer-tagline">${data.tagline}</p>
    `;
    pp.innerHTML = `
        <img class="photographer-portrait" src="${portrait}" alt="">
    `;
    const modalTitle = document.querySelector(".photographer-contact-title");

    modalTitle.textContent = "Contactez-moi " + data.name;
}

async function displayPhotos() {
    const dataSection = document.querySelector(".photographer_section");
    let allPhotos = '';

    photos.forEach((photo, index) => {
        const photoLink = `assets/photographers/${localStorage.getItem("photographer")}/${photo.image}`;
        allPhotos += `
          <div class="photo">
            <button class="photo_container" onclick="openCarrousel(${index})">
              <img src="${photoLink}" alt="">
            </button>
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
        `;
    });

    dataSection.innerHTML = allPhotos;
    localStorage.setItem('photographies', JSON.stringify(photos));
}

function addLike() {
    const likeButtons = document.querySelectorAll('.Photo-likes');
    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (e) => {
            likeButton.querySelector('.Photo-like-icon').classList.toggle('liked');
            let addALike = likeButton.querySelector('.Photo-likes-counter');
            addALike.classList.toggle('add-like');
            if (addALike.classList.contains('add-like')) {
                addALike.innerText = parseInt(addALike.innerText) + 1;
            } else {
                addALike.innerText = parseInt(addALike.innerText) - 1;
            }
        });
    }
}

async function init() {
    await getPhotographer(window.location.search);
    await getPhotos(window.location.search);
    displayPhotographer(photographer)
    displayPhotos();
    addLike();
}

init();
