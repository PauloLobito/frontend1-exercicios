fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
        .catch(error => console.error('Error:', error));

const btnCarregar = document.getElementById('carregarBtn');
const lista = document.getElementById('lista');

async function carregarDados() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();

    lista.innerHTML = '';
    data.slice(0,5).forEach(post => {
        const li = document.createElement('li');
        li.textContent = post.title;
        lista.appendChild(li);
    });
}

btnCarregar.addEventListener('click', carregarDados);
carregarDados();