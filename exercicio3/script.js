const STORAGE_KEY = "alunos";

const formAluno = document.getElementById("formAluno");
const nomeAlunoInput = document.getElementById("nomeAluno");
const notaFrontendInput = document.getElementById("notaFrontend");
const notaBackendInput = document.getElementById("notaBackend");
const notaDesignInput = document.getElementById("notaDesign");
const listaAlunos = document.getElementById("listaAlunos");

function lerAlunos() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}

function guardarAlunos(alunos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
}

function encriptarNome(nome) {
  return btoa(nome);
}

function desencriptarNome(nomeEncriptado) {
  return atob(nomeEncriptado);
}

function renderizarAlunos() {
  const alunos = lerAlunos();

  if (alunos.length === 0) {
    listaAlunos.innerHTML = "<p>Nenhum aluno guardado.</p>";
    return;
  }

  listaAlunos.innerHTML = alunos
    .map((aluno, index) => {
      const nome = desencriptarNome(aluno.nomeEncriptado);
      return `
        <div>
          <h3>Aluno ${index + 1}: ${nome}</h3>
          <p>Frontend: ${aluno.notas.frontend}</p>
          <p>Backend: ${aluno.notas.backend}</p>
          <p>Design: ${aluno.notas.design}</p>
        </div>
        <hr>
      `;
    })
    .join("");
}

formAluno.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = nomeAlunoInput.value.trim();
  const frontend = Number(notaFrontendInput.value);
  const backend = Number(notaBackendInput.value);
  const design = Number(notaDesignInput.value);

  if (!nome) {
    return;
  }

  const alunos = lerAlunos();
  const novoAluno = {
    nomeEncriptado: encriptarNome(nome),
    notas: {
      frontend,
      backend,
      design
    }
  };

  alunos.push(novoAluno);
  guardarAlunos(alunos);

  formAluno.reset();
  nomeAlunoInput.focus();
  renderizarAlunos();
});

renderizarAlunos();
