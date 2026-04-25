const navbarTemplate = document.createElement("template");
navbarTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 999;
      font-family: Arial, sans-serif;
    }

    nav {
      background: linear-gradient(90deg, #0f172a, #1e3a8a);
      color: #ffffff;
      padding: 10px 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.3);
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      max-width: 1100px;
      margin: 0 auto;
      flex-wrap: wrap;
    }

    .brand {
      font-weight: 700;
      letter-spacing: 0.3px;
      font-size: 15px;
      white-space: nowrap;
    }

    .links {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    a {
      text-decoration: none;
      color: #e2e8f0;
      font-size: 13px;
      padding: 6px 9px;
      border-radius: 8px;
      border: 1px solid transparent;
      transition: all 0.2s ease;
    }

    a:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
      border-color: rgba(255, 255, 255, 0.2);
    }
  </style>

  <nav>
    <div class="row">
      <div class="brand">Frontend 1</div>
      <div class="links">
        <a href="../exercicio1/index.html">Ex1</a>
        <a href="../exercicio2/index.html">Ex2</a>
        <a href="../exercicio3/index.html">Ex3</a>
        <a href="../exercicio4/index.html">Ex4</a>
        <a href="../exercicio5/index.html">Ex5</a>
        <a href="../exercicio6/index.html">Ex6</a>
        <a href="../exercicio7/index.html">Ex7</a>
        <a href="../Exercicio8/index.html">Ex8</a>
        <a href="../exercicio9/index.html">Ex9</a>
        <a href="../FINAL/index.html">Final</a>
      </div>
    </div>
  </nav>
`;

class AppNavbar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(navbarTemplate.content.cloneNode(true));
    }
}

customElements.define("app-navbar", AppNavbar);
