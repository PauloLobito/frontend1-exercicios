const formulario = document.getElementById("formulario");



formulario.addEventListener("submit", function(e){
    e.preventDefault();
    const nome = document.getElementById("inputNome").value;
    //SetItem = Guarda os valores na LocalStorage.
    localStorage.setItem("Nome Guardado", nome);

    console.log(nome)

    document.getElementById("mensagem").textContent = "Nome Guardado" + nome;
})

window.addEventListener("load",function(){
    const nomeGuardado = localStorage.getItem("nome_guardado");

    if (nomeGuardado){
        console.log("Nome recuperado na LocalStorage: ",nomeGuardado);
        document.getElementById("inputNome").value = nomeGuardado;
    }else{
        console.log("Nenhum nome guardado ainda");
    }
});
