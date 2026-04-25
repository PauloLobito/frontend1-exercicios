const cartaoTemplate = document.createElement("template");
cartaoTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
      max-width: 280px;
      font-family: Arial, sans-serif;
    }

    .card {
      background: #ffffff;
      border: 1px solid #dbe5f4;
      border-radius: 14px;
      padding: 14px;
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
    }

    h3 {
      margin: 0 0 8px;
      color: #0f172a;
      font-size: 20px;
    }

    p {
      margin: 0;
      color: #334155;
      font-size: 15px;
    }
  </style>

  <article class="card">
    <h3 id="nomeTexto">Nome</h3>
    <p id="idadeTexto">Idade: -</p>
  </article>
`;

class CartaoUtilizador extends HTMLElement {
    static get observedAttributes() {
        return ["nome", "idade"];
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(cartaoTemplate.content.cloneNode(true));

        this.nomeTextoEl = this.shadowRoot.getElementById("nomeTexto");
        this.idadeTextoEl = this.shadowRoot.getElementById("idadeTexto");
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const nome = this.getAttribute("nome") || "Sem nome";
        const idade = this.getAttribute("idade") || "-";

        this.nomeTextoEl.textContent = nome;
        this.idadeTextoEl.textContent = `Idade: ${idade}`;
    }
}

customElements.define("cartao-utilizador", CartaoUtilizador);
