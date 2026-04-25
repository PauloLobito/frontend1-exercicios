const canvas = document.getElementById("meuCanvas");
const ctx = canvas.getContext("2d");

const quadrado = {
    x: 0,
    y: 320,
    size: 40,
    speed: 3
};

function desenharFormasEstaticas() {
    // Retangulo
    ctx.fillStyle = "#2563eb";
    ctx.fillRect(40, 40, 180, 90);

    // Circulo
    ctx.beginPath();
    ctx.arc(340, 85, 45, 0, Math.PI * 2);
    ctx.fillStyle = "#10b981";
    ctx.fill();

    // Linha
    ctx.beginPath();
    ctx.moveTo(460, 40);
    ctx.lineTo(760, 130);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#dc2626";
    ctx.stroke();
}

function desenharQuadradoAnimado() {
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(quadrado.x, quadrado.y, quadrado.size, quadrado.size);
}

function atualizarQuadrado() {
    quadrado.x += quadrado.speed;

    if (quadrado.x > canvas.width) {
        quadrado.x = -quadrado.size;
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharFormasEstaticas();
    desenharQuadradoAnimado();
    atualizarQuadrado();
    requestAnimationFrame(animar);
}

animar();
