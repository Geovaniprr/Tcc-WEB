const formulario = document.querySelector("form");
const Ilogin = document.querySelector(".login");
const Isenha = document.querySelector(".senha");

function login() {
  fetch("http://localhost:8080/admin/login", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      login: Ilogin.value,
      senha: Isenha.value
    })
  })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json(); // Obter o token do corpo da resposta
        console.log("Token recebido:", data.token); // Log do token para depuração

        // Armazenar o token no localStorage
        localStorage.setItem('authToken', data.token);

        // Redirecionar para a página inicial
        window.location.href = "app_home_page.html";
      } else {
        console.log("Erro no login. Status:", res.status);
        alert("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
      }
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
      alert("Ocorreu um erro. Verifique a conexão e tente novamente.");
    });
}

function limpar() {
  Ilogin.value = "";
  Isenha.value = "";
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  login(); // Chamar a função de login ao invés de cadastrar
  limpar();
});
