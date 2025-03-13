document.addEventListener("DOMContentLoaded", function() {
    // Inicializar tooltips do Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Selecionar os elementos da timeline
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Função que verifica se os elementos da timeline estão visíveis no ecrã e adiciona a class "visible"
    function checkVisibility() {
        timelineItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('visible');
            }
        });
    }

    // Função que verifica se um elemento está dentro da área visível do ecrã
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < window.innerHeight * 0.85 &&  // Quando 85% do item está visível no ecrã
            rect.bottom > 50  // Garante que pelo menos 50px do elemento estejam visíveis
        );
    }

    // Verificar a visibilidade dos elementos ao carregar a página
    checkVisibility();

    // Verificar visibilidade quando o utilizador faz scroll
    window.addEventListener('scroll', checkVisibility);

    // Criar um observer para detetar mudanças no DOM (caso elementos sejam adicionados dinamicamente) e reavalia a visibilidade dos elementos
    const observer = new MutationObserver(() => {
        checkVisibility();
    });

    // Observar mudanças no body (novos elementos adicionados ou removidos)
    observer.observe(document.body, { childList: true, subtree: true });
});


document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const items = document.querySelectorAll(".carousel-item");
    const totalItems = items.length;
    const carouselContent = document.querySelector(".carousel-content");

    // Garante que os itens estejam enfileirados corretamente
    items.forEach(item => {
        item.style.width = "100%";
        item.style.flex = "0 0 100%";
    });

    function updateCarousel() {
        const itemWidth = document.querySelector(".carousel").offsetWidth;
        carouselContent.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

    document.querySelector(".next").addEventListener("click", function () {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Volta para o primeiro item
        }
        updateCarousel();
    });

    document.querySelector(".prev").addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalItems - 1; // Volta para o último item
        }
        updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
});
