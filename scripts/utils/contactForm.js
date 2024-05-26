const modal = document.getElementById("contact_modal");
const body = document.querySelector('body')

function displayModal() {
	modal.style.display = "flex";
    body.style.overflow = "hidden";
}

function closeModal() {
    modal.style.display = "none";
    body.style.overflow = "visible";
}
