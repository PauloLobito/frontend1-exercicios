const formulario = document.getElementById("formulario");
const btntema = document.getElementById("btnTema");
const temaAtual = document.getElementById("TemaMostra");



formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("inputNome").value;
    //SetItem = Guarda os valores na LocalStorage.
    localStorage.setItem("nome_guardado", nome);

    console.log(nome)

    document.getElementById("mensagem").textContent = "Nome Guardado: " + nome;
})

window.addEventListener("load", function () {
    const nomeGuardado = localStorage.getItem("nome_guardado");

    if (nomeGuardado) {
        console.log("Nome recuperado na LocalStorage: ", nomeGuardado);
        document.getElementById("inputNome").value = nomeGuardado;
    } else {
        console.log("Nenhum nome guardado ainda");
    }
});

function aplicartema(tema) {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(tema);
    temaAtual.textContent = "Tema Atual: " + tema;
}

window.addEventListener("load", function () {
    const temaGuardado = sessionStorage.getItem("tema");

    if (temaGuardado) {
        aplicartema(temaGuardado);
    } else {
        aplicartema("light");
        sessionStorage.setItem("tema", "light");
    }
});

btntema.addEventListener("click", function () {
    const temaAtualValor = sessionStorage.getItem("tema") || "light";
    const novoTema = temaAtualValor === "light" ? "dark" : "light";

    sessionStorage.setItem("tema", novoTema);
    aplicartema(novoTema);
});



