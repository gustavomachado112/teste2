const modoBtn = document.getElementById('modo-btn');
const body = document.body;

const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'dark') {
    body.classList.add('dark-mode');
    if (modoBtn) {
        modoBtn.textContent = '☀️';
    }
} else {
    body.classList.remove('dark-mode');
    if (modoBtn) {
        modoBtn.textContent = '🌙';
    }
    if (!temaSalvo) {
        localStorage.setItem('tema', 'light');
    }
}

if (modoBtn) {
    modoBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const novoTema = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('tema', novoTema);
        modoBtn.textContent = novoTema === 'dark' ? '☀️' : '🌙';
    });
} else {
    console.error("Botão de modo escuro (ID 'modo-btn') não encontrado no HTML.");
}

const notificationBtn = document.getElementById('notificationBtn');
const notificationDropdown = document.getElementById('notificationDropdown');

if (notificationBtn && notificationDropdown) {
    notificationBtn.addEventListener('click', () => {
        notificationDropdown.hidden = !notificationDropdown.hidden;
    });
} else {
    console.error("Botão de notificação (ID 'notificationBtn') ou dropdown (ID 'notificationDropdown') não encontrado no HTML.");
}

const form = document.getElementById('taskForm');

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
    console.error("Formulário de tarefa (ID 'taskForm') não encontrado no HTML.");
}

const commentInput = document.getElementById('commentInput');
const addCommentBtn = document.getElementById('addCommentBtn');
const commentsList = document.getElementById('commentsList');

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
    console.error("Elementos de comentário (input, botão ou lista) não encontrados no HTML.");
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.getElementById('main-nav-list');

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
});
