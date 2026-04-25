const pessoa = {
    nome: "João",
    idade: 30,
    email: "joao@example.com"
};

const pessoaJson = JSON.stringify(pessoa);
console.log("Objeto em JSON:", pessoaJson);
console.log("-------------------------------");

const pessoaObj = JSON.parse(pessoaJson);
console.log("JSON convertido para objeto:", pessoaObj);
console.log("Nome da pessoa apos parse:", pessoaObj.nome);
console.log("-------------------------------");


fetch("./data.json")
    .then((resposta) => resposta.json())
    .then((dados) => {
        console.log("Dados do data.json:", dados);
        console.log("Nome da Pessoa:", dados.pessoas.nome);
        console.log("Marca do Carro:", dados.carros.marca);
    })
    .catch((erro) => {
        console.error("Falha ao carregar o JSON:", erro);
    });
