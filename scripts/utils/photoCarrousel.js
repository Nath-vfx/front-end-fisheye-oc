const carousel = document.querySelector('#carrousel');
const image = document.querySelector('.carrousel_image');
const title = document.querySelector('.carrousel_image_title');

const photos = JSON.parse(localStorage.getItem('photographies'));
let photoUrl = `assets/photographers/${localStorage.getItem("photographer")}/`

console.log("photos recup : ",photos)
console.log("list length : ",photos.length)

let ind = 0

function toggleCarrousel() {
    carousel.classList.toggle('open');
}

function closeCarrousel() {
    carousel.classList.remove('open');
}

function getImageInfos(url, name, num) {
    image.src = url;
    title.innerText = name;
    ind = num
    console.log('Index : ', ind)
}

function updateImage(e) {
    image.src = photoUrl + photos[e].image
    title.innerText = photos[e].title
}

function nextImage() {
    ind++;
    if (ind >= photos.length) {
        ind = 0;
    }
    console.log("new index : ", ind);
    updateImage(ind);
}

function previousImage() {
    ind--;
    if (ind < 0) {
        ind = photos.length - 1;
    }
    console.log("new previous index : ", ind);
    updateImage(ind);
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
