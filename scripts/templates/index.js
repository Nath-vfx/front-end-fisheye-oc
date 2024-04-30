function indexTemplate(data) {
    const {id, name, portrait, tagline, city, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement("a");
        a.setAttribute(
            "href",
            "/front-end-fisheye-oc/photographer.html?id=" + id,
        );
        const article = document.createElement("article");
        const div = document.createElement("div")
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        const h2 = document.createElement("h2");
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");
        const p = document.createElement("p")
        h2.textContent = name;
        h3.textContent = city;
        h4.textContent = tagline;

        p.textContent = price + "€/Jour"
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
