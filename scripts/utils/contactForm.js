const modal = document.getElementById("contact_modal");
const body = document.querySelector('body')
const main = document.querySelector('main');
const header = document.querySelector('header');

function trapFocus(element) {
    const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableEls = element.querySelectorAll(focusableSelectors);
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    function handleTab(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableEl) {
                    e.preventDefault();
                    lastFocusableEl.focus();
                }
            } else {
                if (document.activeElement === lastFocusableEl) {
                    e.preventDefault();
                    firstFocusableEl.focus();
                }
            }
        }
    }
    element.addEventListener('keydown', handleTab);
    element._removeTrap = () => element.removeEventListener('keydown', handleTab);
}

function displayModal() {
    modal.style.display = "flex";
    body.style.overflow = "hidden";
    if (main) main.setAttribute('aria-hidden', 'true');
    if (header) header.setAttribute('aria-hidden', 'true');
    // focus sur le premier champ du formulaire
    const firstInput = modal.querySelector('input, textarea, button');
    if (firstInput) firstInput.focus();
    trapFocus(modal);
}

function closeModal() {
    modal.style.display = "none";
    body.style.overflow = "visible";
    if (main) main.removeAttribute('aria-hidden');
    if (header) header.removeAttribute('aria-hidden');
    if (modal._removeTrap) modal._removeTrap();
}
