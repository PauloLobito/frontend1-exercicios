const btnCarregar = document.getElementById("carregarBtn");
const lista = document.getElementById("lista");

async function carregarDados() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!response.ok) {
            throw new Error("Falha ao carregar os posts.");
        }

        const posts = await response.json();

        lista.innerHTML = "";
        posts.slice(0, 5).forEach((post) => {
            const li = document.createElement("li");
            li.textContent = post.title;
            lista.appendChild(li);
        });
    } catch (error) {
        lista.innerHTML = "<li>Erro ao carregar dados. Tente novamente.</li>";
        console.error(error);
    }
}

btnCarregar.addEventListener("click", carregarDados);
carregarDados();