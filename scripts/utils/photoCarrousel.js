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
    if (ind < photos.length - 1) {
        ind++;
        console.log("new index : ", ind);
        updateImage(ind);
    } else {

    }
}

function previousImage() {
    if (ind > 0) {
        ind--;
        console.log("new previous index : ", ind)
        updateImage(ind);
    }
}

