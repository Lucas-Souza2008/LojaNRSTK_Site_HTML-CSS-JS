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
    // CLICK NA IMAGEM
    // =====================
    document.querySelectorAll(".card-img").forEach(cardImg => {
        cardImg.addEventListener("click", (e) => {

            const card = cardImg.closest(".card");

            // 🔥 MOBILE: troca imagem no clique
            if (window.innerWidth <= 768) {
                const img1 = cardImg.querySelector(".img1");
                const img2 = cardImg.querySelector(".img2");

                if (img2.style.opacity === "1") {
                    img2.style.opacity = "0";
                    img1.style.opacity = "1";
                } else {
                    img2.style.opacity = "1";
                    img1.style.opacity = "0";
                }
            }

            // =====================
            // MODAL DINÂMICO
            // =====================
            modalContent.innerHTML = "";

            const images = card.getAttribute("data-images").split(",");

            images.forEach(src => {
                const img = document.createElement("img");
                img.src = src.trim();
                img.classList.add("modal-img");
                modalContent.appendChild(img);
            });

            // abre modal + blur
            modal.style.display = "flex";
            document.body.classList.add("modal-open");

            e.stopPropagation();
        });
    });

    // =====================
    // RESETAR IMAGENS
    // =====================
    function resetarCards() {
        cards.forEach(card => {
            const img1 = card.querySelector(".img1");
            const img2 = card.querySelector(".img2");

            if (img1 && img2) {
                img1.style.opacity = "1";
                img2.style.opacity = "0";
            }
        });
    }

    // =====================
    // FECHAR MODAL
    // =====================
    function fecharModal() {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
        resetarCards();
    }

    fechar.addEventListener("click", fecharModal);

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