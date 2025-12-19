function alterElements(e) {
    const initialMessage = document.getElementById("mensagem-inicial");
    const search = document.getElementById("pesquisa");
    const shortcut = document.getElementById("atalhos");
    const dest = document.querySelector("[data-dest]");

    if (e.target.getAttribute('off') === "/") {
        initialMessage.style.display = "block";
        search.style.position = ""
        search.style.bottom = "";
        search.style.width = ""
        shortcut.style.display = "flex";
        dest.classList.add("mensagens")
    } else {
        initialMessage.style.display = "none"
        search.style.position = "fixed"
        search.style.bottom = "20px";
        search.style.width = "50vw"
        shortcut.style.display = "none";

        loadHtml(e);
    }

};

function loadHtml(e) {
    e.preventDefault();

    const url = e.target.getAttribute('href');
    const dest = document.querySelector("[data-dest]")

    fetch(url)
        .then(resp => resp.text())
        .then(html => {
            dest.classList.remove('mensagens')
            dest.innerHTML = html
        })
}

function liveMenuBar(e) {
    const menu = document.getElementById("menu-lateral");
    const menuIcon = document.getElementById("menu-icone");
    menuIcon.style.display = "none"
    document.body.style.gridTemplateColumns = "340px 1fr"
    menu.style.position = "absolute";
    menu.style.width = "320px"
    menu.style.zIndex = 1;
    menu.style.height = "100%"
    menu.style.display = "block"
}
function hideMenuBar(e) {
    const menu = document.getElementById("menu-lateral");
    const menuIcon = document.getElementById("menu-icone");
    menu.style.display = "none";
    document.body.style.gridTemplateColumns = "0px 1fr";
    menuIcon.style.display = "block"
}

document.querySelectorAll("[link-dest]").forEach(e => {
    e.addEventListener("click", alterElements)
})

document.getElementById("menu-icone-js").addEventListener("click", alterElements)
document.getElementById("menu-icone").addEventListener("click", liveMenuBar)
document.getElementById("menu-aside").addEventListener("click", hideMenuBar)