const dogForm = document.getElementById("dogForm");
const breedInput = document.getElementById("breedInput");
const mensagem = document.getElementById("mensagem");
const dogImage = document.getElementById("dogImage");

async function carregarImagemDaBreed(breed) {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();

    if (!response.ok || data.status === "error") {
        throw new Error(data.message || "Nao foi possivel buscar a imagem.");
    }

    return data.message;
}

dogForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const breed = breedInput.value.trim().toLowerCase();

    mensagem.textContent = "";
    dogImage.style.display = "none";

    if (!breed) {
        mensagem.textContent = "Digite uma breed valida.";
        return;
    }

    try {
        const imagemUrl = await carregarImagemDaBreed(breed);
        dogImage.src = imagemUrl;
        dogImage.style.display = "block";
        mensagem.textContent = "Imagem carregada com sucesso.";
    } catch (error) {
        mensagem.textContent = "Erro: breed nao encontrada ou falha na API.";
        console.error(error);
    }
});