let pessoa ={
    nome: "Paulo",
    idade: 28 ,
    activo: true ,
    status: "solteiro",
    email: "paulo_loito@eticalgarve.com"
}
//Objecto para JSON
let JsonString = JSON.stringify(pessoa)
console.log(JsonString)
console.log("-------------------")
//JSON para Objecto JS
let obj = JSON.parse(JsonString)
console.log(obj)
console.log("-------------------")
//Vai buscar o main.Json
fetch("main.json")
    .then(response => response.json())
    .then(data => 
    {
        console.log(data);
    })

