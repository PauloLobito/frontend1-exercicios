class TodoList {
    // Estado inicial da app (filtro ativo e tarefa em edicao)
    constructor() {
        this.filtroAtivo = "todas";
        this.idEditar = null;
        this.init();
    }

    // Arranca a app: eventos, render inicial, stats e AOS
    init() {
        this.setupEventListeners();
        this.renderizarTabela();
        this.atualizarStats();
        AOS.init();
    }

    // Le todas as tarefas guardadas no localStorage
    lerTodas() {
        const dados = localStorage.getItem("todos");
        return dados ? JSON.parse(dados) : [];
    }

    // Guarda o array de tarefas no localStorage
    guardar(todos) {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // Cria uma nova tarefa e atualiza a interface
    criarTodo(titulo) {
        if (!titulo.trim()) {
            this.mostrarToast("Por favor, adiciona um titulo!", "erro");
            return;
        }

        const todos = this.lerTodas();
        const novoTodo = {
            id: Date.now(),
            titulo: titulo.trim(),
            concluida: false,
            criadoEm: new Date().toLocaleString()
        };

        todos.push(novoTodo);
        this.guardar(todos);
        this.renderizarTabela();
        this.atualizarStats();
        this.mostrarToast("Tarefa criada com sucesso!", "sucesso");
    }

    // Edita o titulo de uma tarefa existente
    editarTodo(id, novoTitulo) {
        if (!novoTitulo.trim()) {
            this.mostrarToast("O titulo nao pode estar vazio!", "erro");
            return;
        }

        const todos = this.lerTodas();
        const todo = todos.find(t => t.id === id);

        if (todo) {
            todo.titulo = novoTitulo.trim();
            this.guardar(todos);
            this.renderizarTabela();
            this.atualizarStats();
            this.mostrarToast("Tarefa editada com sucesso!", "sucesso");
        }
    }

    // Apaga uma tarefa por id (com confirmacao)
    async apagarTodo(id) {
        if (window.Swal) {
            const resultado = await Swal.fire({
                title: "Apagar tarefa?",
                text: "Esta acao nao pode ser desfeita.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sim, apagar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#dc2626",
                cancelButtonColor: "#64748b"
            });

            if (!resultado.isConfirmed) return;
        } else if (!confirm("Tem a certeza que quer apagar esta tarefa?")) {
            return;
        }

        let todos = this.lerTodas();
        todos = todos.filter(t => t.id !== id);
        this.guardar(todos);
        this.renderizarTabela();
        this.atualizarStats();
        this.mostrarToast("Tarefa apagada!", "sucesso");
    }

    // Alterna entre pendente/concluida
    alternarConcluida(id) {
        const todos = this.lerTodas();
        const todo = todos.find(t => t.id === id);

        if (todo) {
            todo.concluida = !todo.concluida;
            this.guardar(todos);
            this.renderizarTabela();
            this.atualizarStats();
        }
    }

    // Devolve tarefas de acordo com o filtro selecionado
    getTarefasFiltradas() {
        const todos = this.lerTodas();

        if (this.filtroAtivo === "pendentes") {
            return todos.filter(t => !t.concluida);
        }

        if (this.filtroAtivo === "concluidas") {
            return todos.filter(t => t.concluida);
        }

        return todos;
    }

    // Renderiza a tabela no DOM com as tarefas filtradas
    renderizarTabela() {
        const todos = this.getTarefasFiltradas();
        const tbody = document.getElementById("listaTarefas");
        const msgVazia = document.getElementById("mensagemVazia");

        tbody.innerHTML = "";

        if (todos.length === 0) {
            msgVazia.classList.remove("hidden");
            return;
        }

        msgVazia.classList.add("hidden");

        todos.forEach(todo => {
            // Mapeia estado interno para classes/texto da UI
            const statusClass = todo.concluida ? "concluida" : "pendente";
            const statusTexto = todo.concluida ? "Concluida" : "Pendente";

            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${this.escaparHTML(todo.titulo)}</td>
                <td>${todo.criadoEm}</td>
                <td><span class="status ${statusClass}">${statusTexto}</span></td>
                <td>
                    <div class="acoes">
                        <button class="btn-acao btn-concluir" data-action="concluir" data-id="${todo.id}">
                            ${todo.concluida ? "Pendente" : "Concluir"}
                        </button>
                        <button class="btn-acao btn-editar" data-action="editar" data-id="${todo.id}" title="Editar tarefa">
                            <svg class="icon-edit" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                                <path d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                        </button>
                        <button class="btn-acao btn-apagar" data-action="apagar" data-id="${todo.id}" title="Apagar tarefa">
                            <svg class="icon-delete" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"/>
                            </svg>
                        </button>
                    </div>
                </td>
            `;

            tbody.appendChild(linha);
        });
    }

    // Recalcula os cards de total/concluidas/pendentes
    atualizarStats() {
        const todos = this.lerTodas();
        const concluidas = todos.filter(t => t.concluida).length;
        const pendentes = todos.length - concluidas;

        document.getElementById("totalTarefas").textContent = todos.length;
        document.getElementById("tarefasConcluidas").textContent = concluidas;
        document.getElementById("tarefasPendentes").textContent = pendentes;
    }

    // Abre modal e carrega dados da tarefa para edicao
    abrirModal(id) {
        const todos = this.lerTodas();
        const todo = todos.find(t => t.id === id);

        if (todo) {
            this.idEditar = id;
            document.getElementById("inputEdicao").value = todo.titulo;
            document.getElementById("modalEdicao").classList.remove("hidden");
            document.getElementById("modalEdicao").classList.add("visible");
            document.getElementById("inputEdicao").focus();
        }
    }

    // Fecha modal e limpa id em edicao
    fecharModal() {
        document.getElementById("modalEdicao").classList.add("hidden");
        document.getElementById("modalEdicao").classList.remove("visible");
        this.idEditar = null;
    }

    // Mostra feedback visual temporario (erro/sucesso)
    mostrarToast(mensagem, tipo = "sucesso") {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: tipo === "erro" ? "error" : "success",
            title: mensagem,
            showConfirmButton: false,
            timer: 2300,
            timerProgressBar: true
        });
    }

    // Escapa HTML para evitar injecao no titulo da tarefa
    escaparHTML(texto) {
        const div = document.createElement("div");
        div.textContent = texto;
        return div.innerHTML;
    }

    // Liga todos os eventos de interacao da UI
    setupEventListeners() {
        // Criacao de tarefa por botao
        document.getElementById("btnAdicionar").addEventListener("click", () => {
            const input = document.getElementById("inputTarefa");
            this.criarTodo(input.value);
            input.value = "";
            input.focus();
        });

        // Criacao de tarefa com Enter no input principal
        document.getElementById("inputTarefa").addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                document.getElementById("btnAdicionar").click();
            }
        });

        // Mudanca de filtro
        document.querySelectorAll(".filter-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                this.filtroAtivo = btn.dataset.filter;
                this.renderizarTabela();
            });
        });

        // Event delegation para acoes da tabela (concluir/editar/apagar)
        document.getElementById("listaTarefas").addEventListener("click", (e) => {
            const btn = e.target.closest(".btn-acao");
            if (!btn) return;

            const id = parseInt(btn.dataset.id, 10);
            const action = btn.dataset.action;

            if (action === "concluir") this.alternarConcluida(id);
            if (action === "editar") this.abrirModal(id);
            if (action === "apagar") this.apagarTodo(id);
        });

        // Controlo de abertura/fecho e guardado do modal
        document.getElementById("btnFecharModal").addEventListener("click", () => this.fecharModal());
        document.getElementById("btnCancelar").addEventListener("click", () => this.fecharModal());

        document.getElementById("btnSalvar").addEventListener("click", () => {
            const novoTitulo = document.getElementById("inputEdicao").value;
            if (this.idEditar !== null) {
                this.editarTodo(this.idEditar, novoTitulo);
            }
            this.fecharModal();
        });

        // Guardar edicao com Enter
        document.getElementById("inputEdicao").addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                document.getElementById("btnSalvar").click();
            }
        });

        // Fecha modal ao clicar no backdrop
        document.getElementById("modalEdicao").addEventListener("click", (e) => {
            if (e.target === document.getElementById("modalEdicao")) {
                this.fecharModal();
            }
        });
    }
}

// Instancia a app quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    new TodoList();
});

// Inicializa bibliotecas de animacao do titulo
AOS.init();
const matchMedia = gsap.matchMedia();

// Entrada inicial do titulo com fade + movimento
gsap.fromTo(
    "#titulo",
    { opacity: 0, y: -30 },
    {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.9,
        onComplete: () => {
            // Animacao mais suave e curta para mobile
            matchMedia.add("(max-width: 600px)", () => {
                gsap.to("#titulo span", {
                    y: -10,
                    duration: 0.35,
                    stagger: 0.06,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            });

            // Animacao com maior amplitude para desktop
            matchMedia.add("(min-width: 601px)", () => {
                gsap.to("#titulo span", {
                    y: -20,
                    duration: 0.4,
                    stagger: 0.08,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.out"
                });
            });
        }
    }
);