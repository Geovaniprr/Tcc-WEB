async function fetchRelatos() {
  try {
      const response = await fetch('http://192.168.0.16:8080/relatos');
      const data = await response.json();

      if (response.status === 200) {
          renderPosts(data.content);
      } else {
          alert('Erro ao carregar os relatos.');
      }
  } catch (error) {
      console.error('Erro ao buscar relatos:', error);
      alert('Erro na conexão. Tente novamente.');
  }
}

function renderPosts(posts) {
  const postsContainer = document.querySelector('.posts');
  postsContainer.innerHTML = '<h2>Postagem dos Alunos</h2>';

  posts.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      postElement.innerHTML = `
          <div class="post-header">
              <div class="profile-icon">${post.alunoNome.charAt(0)}</div>
              <div class="post-info">
                  <h3>${post.alunoNome}</h3>
                  <p>Aluno</p>
              </div>
              <div class="post-options" onclick="toggleMenu(this)">...</div>
              <div class="post-menu">
                  <div class="menu-item" onclick="deletePost(this, ${post.id})">
                      Apagar Postagem <span class="close-menu">&times;</span>
                  </div>
              </div>
          </div>
          <div class="post-content">
              <p>${post.descricao}</p>
          </div>
          <div class="post-footer">
              <span>${post.curtidas || 0}</span>
              <img src="../imagens/Curtida.png" alt="Like Icon" onclick="likePost(${post.id})" class="like-icon">
          </div>
      `;

      postsContainer.appendChild(postElement);
  });
}

async function likePost(postId) {
  try {
      const response = await fetch(`http://192.168.0.16:8080/relatos/curtir/${postId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
          alert('Relato curtido com sucesso!');
          fetchRelatos();
      } else {
          alert('Admin nao pode curtir relato');
      }
  } catch (error) {
      console.error('Erro ao curtir o relato:', error);
      alert('Erro na conexão. Tente novamente.');
  }
}

async function deletePost(element, postId) {
  try {
      const response = await fetch(`http://192.168.0.16:8080/relatos/${postId}`, {
          method: 'DELETE',
      });

      if (response.status === 200) {
          alert('Relato apagado com sucesso!');
          element.closest('.post').remove();
      } else {
          alert('Erro ao apagar o relato.');
      }
  } catch (error) {
      console.error('Erro ao apagar o relato:', error);
      alert('Erro na conexão. Tente novamente.');
  }
}

function toggleMenu(element) {
  const menu = element.nextElementSibling;
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function openModal() {
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', fetchRelatos);
