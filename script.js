
//---------------Carregamento das abas superiores------------//
document.addEventListener('DOMContentLoaded', () => {
    // Gerenciar troca de abas e inicialização
    document.querySelectorAll('.tab-links button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.tab-links button.active').classList.remove('active');
            button.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
            document.querySelector(`#${button.dataset.tab}`).style.display = 'block';

            updateTotalPoints(button.dataset.tab);
        });
    });
//-------------Função para dar update nos pontos totais---------//
    function updateTotalPoints(tabId) {
        const pointsElements = document.querySelectorAll(`#${tabId} .radio-group input[type="radio"]:checked`);
        const attributeValues = {
            estadio: [1, 2, 3, 4, 5],
            estrelas: [1, 2, 3],
            base: [1, 2, 3, 4, 5],
            nivel: [1, 2, 3, 4, 5],
            scout: [1, 2, 3, 4, 5],
            transferencias: [1, 2, 3, 4, 5]
        };

        let totalPoints = 15; // Total inicial
        let exTotalPoints = totalPoints;

        pointsElements.forEach(element => {
            const attributeName = element.name;
            const value = parseInt(element.value);

            if (attributeValues[attributeName]) {
                exTotalPoints = totalPoints;
                totalPoints -= attributeValues[attributeName][value - 1];
            }
        });

        if (totalPoints < 0) {
            alert("A soma dos pontos não pode ser negativa!");
            totalPoints = exTotalPoints;
        }

        document.querySelector(`#${tabId}-points`).textContent = totalPoints;
        updateFinalPoints(tabId);
    }
//----------------Função para atualizar os pontos da coluna Final------------------//
    function updateFinalPoints(tabId) {
        const attributeValues = {
            estadio: [2500, 5000, 7500, 10000, 15000],
            estrelas: [1, 2, 3],
            base: [3, 6, 9, 12, 15],
            nivel: [1, 2, 3, 4, 5],
            scout: [1, 2, 3, 4, 5],
            transferencias: [1, 2, 3, 4, 5]
        };

        document.querySelectorAll(`#${tabId} .radio-group input[type="radio"]:checked`).forEach(element => {
            const attributeId = element.name;
            const value = parseInt(element.value);

            if (attributeValues[attributeId]) {
                document.querySelector(`#${tabId}-${attributeId}-final`).textContent = `${attributeId.charAt(0).toUpperCase() + attributeId.slice(1)}: ${attributeValues[attributeId][value - 1]}`;
            }
        });
    }

    document.querySelectorAll('.radio-group input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const tabId = document.querySelector('.tab-links button.active').dataset.tab;
            updateTotalPoints(tabId);
        });
    });
//---------------------------- Gerenciar modais-------------------------------//
    function setupModal(modalId, buttonId) {
        const modal = document.getElementById(modalId);
        const btn = document.getElementById(buttonId);
        const span = modal.querySelector('.close');

        btn.onclick = () => modal.style.display = 'block';
        span.onclick = () => modal.style.display = 'none';
    }

    ['bagril', 'papete', 'atlantico', 'mendes'].forEach(team => {
        setupModal(`${team}-modal`, `${team}-modal-btn`);
        setupModal(`${team}-retrospecto-modal`, `${team}-retrospecto-modal-btn`);
    });

    window.onclick = event => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };

//------------------------------Inicializa a aba ativa---------------------------//
    const activeTab = document.querySelector('.tab-links button.active').dataset.tab;
    updateTotalPoints(activeTab);

    // Gerenciar troca de abas nos modais
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.tab-button.active').classList.remove('active');
            button.classList.add('active');

            document.querySelectorAll('.modal-tab-content.active').forEach(content => content.classList.remove('active'));
            document.querySelector(`#${button.dataset.tab}`).classList.add('active');
        });
    });
});
