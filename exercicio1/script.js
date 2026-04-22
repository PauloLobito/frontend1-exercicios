let pessoa = {
    nome: "João",
    idade :30,
    email: "joao@example.com"
};

let obj = JSON.stringify(pessoa);
console.log(obj);
console.log("-------------------------------")
let ObjJason = JSON.parse(obj);
console.log(ObjJason);
console.log("-------------------------------")


fetch("./data.json")
.then(resposta => resposta.json())
.then(dados =>{
    console.log("Nome do JSON: ", dados);
    console.log("Nome da Pessoa: ",dados.pessoas.nome);
    console.log("Marca do Carro: ",dados.carros.marca);
})
.catch(erro => {
    console.error("Falha ao carregar o JSON:",erro);
})
