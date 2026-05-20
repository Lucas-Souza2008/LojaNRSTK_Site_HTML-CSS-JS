const texto = "No restock. Once found never again.";
let i = 0;

function digitar() {
    const el = document.getElementById("titulo");
    if (!el) return;

    if (i < texto.length) {
        el.innerHTML = texto.substring(0, i + 1) + "<span class='cursor'>|</span>";
        i++;
        setTimeout(digitar, 120);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".card");
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const fechar = document.querySelector(".fechar");

    // =====================
    // ANIMAÇÃO AO SCROLL
    // =====================
    function mostrarCards() {
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();

            if (rect.top < window.innerHeight - 100 && !card.classList.contains("show")) {
                setTimeout(() => {
                    card.classList.add("show");
                }, index * 100);
            }
        });
    }

    window.addEventListener("scroll", mostrarCards);
    mostrarCards();

    // =====================
    // 🔥 EVITA BUG NO BOTÃO
    // =====================
    document.querySelectorAll(".btn-vendido").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const antigo = document.querySelector(".popup-found");
            if (antigo) antigo.remove();

            const popup = document.createElement("div");

            popup.className = "popup-found";

            popup.innerHTML = `
            <span>FOUND</span>
            <p>Essa peça já foi encontrada</p>
        `;

            document.body.appendChild(popup);

            // força o navegador a renderizar
            popup.offsetHeight;

            // ativa animação
            popup.classList.add("show");

            // espera aparecer
            setTimeout(() => {

                popup.classList.remove("show");

                // força render novamente
                popup.offsetHeight;

                // remove só depois da transição
                setTimeout(() => {
                    popup.remove();
                }, 700);

            }, 2500);
        });
    });

    // =====================
    // CLICK NAS IMAGENS
    // =====================
    document.querySelectorAll(".card-img").forEach(cardImg => {
        cardImg.addEventListener("click", (e) => {

            // se clicou no botão → ignora
            if (e.target.closest(".btn")) return;

            const card = cardImg.closest(".card");
            const img1 = cardImg.querySelector(".img1");
            const img2 = cardImg.querySelector(".img2");

            // =====================
            // 📱 MOBILE
            // =====================
            if (window.innerWidth <= 768) {

                const isBackVisible = img2.style.opacity === "1";

                // 🔥 PRIMEIRO TOQUE → vira imagem
                if (!card.classList.contains("virado")) {
                    if (img1 && img2) {
                        img2.style.opacity = "1";
                        img1.style.opacity = "0";
                    }

                    card.classList.add("virado");
                    return; // NÃO abre modal ainda
                }
            }

            // =====================
            // 💻 DESKTOP ou 2º CLIQUE MOBILE
            // =====================
            modalContent.innerHTML = "";

            const images = card.getAttribute("data-images");

            if (images) {
                images.split(",").forEach(src => {
                    const img = document.createElement("img");
                    img.src = src.trim();
                    img.classList.add("modal-img");
                    modalContent.appendChild(img);
                });
            }

            modal.classList.add("ativo");

            // reset scroll modal
            modalContent.scrollTop = 0;

            // trava scroll do fundo
            document.body.classList.add("modal-open");

            e.stopPropagation();
        });
    });

    // =====================
    // RESETAR CARDS
    // =====================
    function resetarCards() {
        cards.forEach(card => {
            const img1 = card.querySelector(".img1");
            const img2 = card.querySelector(".img2");

            if (img1 && img2) {
                img1.style.opacity = "1";
                img2.style.opacity = "0";
            }

            card.classList.remove("virado"); // 🔥 importante
        });
    }

    // =====================
    // FECHAR MODAL
    // =====================
    function fecharModal() {
        modal.classList.remove("ativo");

        // libera scroll
        document.body.classList.remove("modal-open");

        resetarCards();
    }

    if (fechar) {
        fechar.addEventListener("click", fecharModal);
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });

});

// =====================
// TEXTO DIGITANDO
// =====================
window.addEventListener("load", digitar);