const formulario = document.querySelector("form");

const Inome = document.querySelector(".nome");
const Ilogin = document.querySelector(".login");
const Isenha = document.querySelector(".senha");
const Iresponsavel = document.querySelector(".responsavel");
const Icodigo = document.querySelector(".codigo");

function cadastrar() {
  fetch("http://localhost:8080/admin", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      nome: Inome.value,
      login: Ilogin.value,
      senha: Isenha.value
    })
  })
    .then((res) => {
      if (res.ok) {
        window.location.href = "bem_vindo.html";
      } else {
        console.log("Erro ao cadastrar. Status:", res.status);
        alert("Erro ao cadastrar. Tente novamente.");
      }
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
      alert("Ocorreu um erro. Verifique a conexão e tente novamente.");
    });
}

function limpar() {
  Inome.value = "";
  Ilogin.value = "";
  Isenha.value = "";
  Iresponsavel.value = "";
  Icodigo.value = "";
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  cadastrar();
  limpar();
});
