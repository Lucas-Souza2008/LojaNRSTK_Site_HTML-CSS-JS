const texto = "No restock. Once found never again.";
let i = 0;

function digitar() {
    const el = document.getElementById("titulo");

    if (!el) return;

    if (i < texto.length) {
        el.innerHTML = texto.substring(0, i + 1) + "<span>|</span>";
        i++;
        setTimeout(digitar, 80);
    }
}

window.addEventListener("load", digitar);