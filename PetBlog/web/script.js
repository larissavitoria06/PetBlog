// Seleção dos elementos
const form = document.getElementById('comment-form');
const usernameInput = document.getElementById('username');
const commentInput = document.getElementById('comment');
const commentsList = document.getElementById('comments-list');

// Função para carregar os comentários
async function loadComments() {
    const response = await fetch('http://localhost:5000/api/comments');
    const comments = await response.json();
    
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const div = document.createElement('div');
        div.classList.add('comment');
        div.innerHTML = `
            <strong>${comment.username}</strong>
            <p>${comment.comment}</p>
            <small>Publicado em: ${new Date(comment.createdAt).toLocaleString()}</small>
        `;
        commentsList.appendChild(div);
    });
}

// Função para enviar um novo comentário
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newComment = {
        username: usernameInput.value,
        comment: commentInput.value,
    };

    await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
    });

    // Limpar os campos
    usernameInput.value = '';
    commentInput.value = '';

    // Recarregar os comentários
    loadComments();
});

// Carregar comentários ao iniciar
loadComments();
