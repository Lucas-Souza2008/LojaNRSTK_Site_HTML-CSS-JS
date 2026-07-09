document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const fechar = document.querySelector(".fechar");

    // ==========================================
    // TRATAMENTO PRODUTOS ESGOTADOS (POPUP BANDA INFERIOR)
    // ==========================================
    document.querySelectorAll(".btn-vendido").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const antigo = document.querySelector(".popup-found");
            if (antigo) antigo.remove();

            const popup = document.createElement("div");
            popup.className = "popup-found";
            popup.innerHTML = `
                <span>PIECE SOLD OUT</span>
                <p>Essa peça exclusiva já foi encontrada por outro membro.</p>
            `;

            document.body.appendChild(popup);
            popup.offsetHeight; // Força reflow
            popup.classList.add("show");

            setTimeout(() => {
                popup.classList.remove("show");
                setTimeout(() => popup.remove(), 400);
            }, 3000);
        });
    });

    // ==========================================
    // DETECÇÃO DE TOQUE / MODAL (OTIMIZADO INSTAGRAM)
    // ==========================================
    document.querySelectorAll(".card-img").forEach(cardImg => {
        cardImg.addEventListener("click", (e) => {
            const card = cardImg.closest(".card");
            const img1 = cardImg.querySelector(".img1");
            const img2 = cardImg.querySelector(".img2");

            // No Mobile, o primeiro toque alterna a foto, o segundo abre a galeria
            if (window.innerWidth <= 768) {
                if (!card.classList.contains("virado")) {
                    if (img1 && img2) {
                        img2.style.opacity = "1";
                        img1.style.opacity = "0";
                    }
                    // Reseta os outros cards ativos para evitar bagunça visual
                    cards.forEach(c => {
                        if(c !== card) {
                            const i1 = c.querySelector(".img1");
                            const i2 = c.querySelector(".img2");
                            if(i1 && i2) { i1.style.opacity = "1"; i2.style.opacity = "0"; }
                            c.classList.remove("virado");
                        }
                    });
                    card.classList.add("virado");
                    return;
                }
            }

            // Abertura do Modal Galeria
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
            document.body.style.overflow = "hidden"; // Bloqueia scroll do fundo
            e.stopPropagation();
        });
    });

    // Fechar Modal
    function fecharModal() {
        modal.classList.remove("ativo");
        document.body.style.overflow = ""; // Libera scroll
        
        // Reseta imagens dos produtos
        cards.forEach(card => {
            const img1 = card.querySelector(".img1");
            const img2 = card.querySelector(".img2");
            if (img1 && img2) {
                img1.style.opacity = "1";
                img2.style.opacity = "0";
            }
            card.classList.remove("virado");
        });
    }

    if (fechar) fechar.addEventListener("click", fecharModal);
    window.addEventListener("click", (e) => { if (e.target === modal) fecharModal(); });
});