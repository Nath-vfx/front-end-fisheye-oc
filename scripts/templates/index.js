function indexTemplate(data) {
    const {id, name, portrait, tagline, city, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement("a");
        a.setAttribute(
            "href",
            "photographer.html?id=" + id,
        );
        a.setAttribute("aria-label", `Voir la page du photographe ${name}`);
        a.setAttribute("tabindex", "0");
        a.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                a.click();
            }
        });
        const article = document.createElement("article");
        article.setAttribute("aria-label", `${name}, ${city}, ${tagline}, ${price} euros par jour`);
        const div = document.createElement("div")
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);
        const h2 = document.createElement("h2");
        h2.textContent = name;
        h2.setAttribute("role", "heading");
        h2.setAttribute("aria-level", "2");
        const h3 = document.createElement("h3");
        h3.textContent = city;
        h3.setAttribute("aria-label", `Ville : ${city}`);
        const h4 = document.createElement("h4");
        h4.textContent = tagline;
        h4.setAttribute("aria-label", `Slogan : ${tagline}`);
        const p = document.createElement("p")
        p.textContent = price + "€/Jour"
        p.setAttribute("aria-label", `Tarif : ${price} euros par jour`);
        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(div);
        div.appendChild(h3);
        div.appendChild(h4);
        div.appendChild(p)
        return a;
    }

    return {name, picture, getUserCardDOM};
}
