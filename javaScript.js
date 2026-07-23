document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modalContent");
    const fechar = document.querySelector(".fechar");

    // NOTIFICAÇÃO DISCRETA SE CLICAR NO PRODUTO ESGOTADO
    document.querySelectorAll(".btn-vendido, .card.esgotado").forEach(item => {
        item.addEventListener("click", (e) => {
            if (e.target.tagName === 'IMG') return;

            e.preventDefault();

            const antigo = document.querySelector(".popup-found");
            if (antigo) antigo.remove();

            const popup = document.createElement("div");
            popup.className = "popup-found";
            popup.innerHTML = `
                <span>PIECE SOLD OUT</span>
                <p>Essa peça já foi vendida.</p>
            `;

            document.body.appendChild(popup);
            popup.offsetHeight; 
            popup.classList.add("show");

            setTimeout(() => {
                popup.classList.remove("show");
                setTimeout(() => popup.remove(), 400);
            }, 3000);
        });
    });

    // MODAL DE GALERIA DE FOTOS
    document.querySelectorAll(".card-img").forEach(cardImg => {
        cardImg.addEventListener("click", (e) => {
            const card = cardImg.closest(".card");
            
            if (card.classList.contains("esgotado")) return;

            const images = card.getAttribute("data-images");
            if (!images) return;

            if (modalContent) {
                modalContent.innerHTML = "";
                images.split(",").forEach(src => {
                    const img = document.createElement("img");
                    img.src = src.trim();
                    img.style.maxWidth = "80vw";
                    img.style.maxHeight = "80vh";
                    img.style.objectFit = "contain";
                    modalContent.appendChild(img);
                });

                modal.classList.add("ativo");
                document.body.style.overflow = "hidden";
            }
        });
    });

    function fecharModal() {
        if (modal) {
            modal.classList.remove("ativo");
            document.body.style.overflow = "";
        }
    }

    if (fechar) fechar.addEventListener("click", fecharModal);
    if (modal) {
        window.addEventListener("click", (e) => { 
            if (e.target === modal) fecharModal(); 
        });
    }
});