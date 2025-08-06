document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos
    const modoBtn = document.getElementById('modo-btn');
    const body = document.body;
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.getElementById('main-nav-list');
    const form = document.getElementById('taskForm');
    const commentInput = document.getElementById('commentInput');
    const addCommentBtn = document.getElementById('addCommentBtn');
    const commentsList = document.getElementById('commentsList');

    // Funcionalidade do Dark Mode
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'dark') {
        body.classList.add('dark-mode');
        if (modoBtn) modoBtn.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        if (modoBtn) modoBtn.textContent = '🌙';
        if (!temaSalvo) localStorage.setItem('tema', 'light');
    }

    if (modoBtn) {
        modoBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const novoTema = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('tema', novoTema);
            modoBtn.textContent = novoTema === 'dark' ? '☀️' : '🌙';
        });
    } else {
        console.error("Botão de modo escuro (ID 'modo-btn') não encontrado.");
    }

    // Funcionalidade de Notificações (abre/fecha)
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique no botão feche o dropdown imediatamente
            notificationDropdown.hidden = !notificationDropdown.hidden;
        });
    } else {
        console.error("Botão de notificação ou dropdown não encontrado.");
    }

    // Funcionalidade do Menu Hambúrguer (abre/fecha ao clicar no ícone)
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('is-open');
            menuToggle.classList.toggle('is-active');
        });
    } else {
        console.error("Botão do menu ou lista de navegação não encontrados.");
    }

    // Funcionalidade de fechar menu e dropdown ao clicar em qualquer lugar
    document.addEventListener('click', (e) => {
        // Fecha o menu se o clique não foi no botão de toggle e nem dentro do menu
        if (navList.classList.contains('is-open') && !navList.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navList.classList.remove('is-open');
            menuToggle.classList.remove('is-active');
        }

        // Fecha o dropdown de notificações se o clique não foi no botão e nem dentro do dropdown
        if (notificationBtn && notificationDropdown && !notificationDropdown.hidden && !notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
            notificationDropdown.hidden = true;
        }
    });

    // Funcionalidade do Formulário
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const confirmacao = confirm("Deseja realmente salvar esta tarefa?");
            if (confirmacao) {
                alert("Tarefa salva com sucesso!");
                form.reset();
            } else {
                alert("Criação da tarefa cancelada.");
            }
        });
    } else {
        console.error("Formulário de tarefa não encontrado.");
    }

    // Funcionalidade de Comentários
    if (commentInput && addCommentBtn && commentsList) {
        addCommentBtn.addEventListener('click', () => {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment-item');
                commentDiv.innerHTML = `<p>${commentText}</p>`;
                commentsList.appendChild(commentDiv);
                commentInput.value = '';
            } else {
                alert('Por favor, digite um comentário antes de adicionar.');
            }
        });
    } else {
        console.error("Elementos de comentário (input, botão ou lista) não encontrados.");
    }
});
