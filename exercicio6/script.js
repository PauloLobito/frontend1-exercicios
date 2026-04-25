const fullscreenStatusEl = document.getElementById("fullscreenStatus");
const btnEntrarFullscreen = document.getElementById("btnEntrarFullscreen");
const btnSairFullscreen = document.getElementById("btnSairFullscreen");
const fullscreenTarget = document.getElementById("fullscreenTarget");

const dateTimeStatusEl = document.getElementById("dateTimeStatus");
const clockNowEl = document.getElementById("clockNow");
const dateNowEl = document.getElementById("dateNow");
const formattedDateTimeEl = document.getElementById("formattedDateTime");
const timestampValueEl = document.getElementById("timestampValue");
const localeSelect = document.getElementById("localeSelect");
const timezoneSelect = document.getElementById("timezoneSelect");
const btnAtualizarDateTime = document.getElementById("btnAtualizarDateTime");

function resolverTimeZone(timeZone) {
    try {
        new Intl.DateTimeFormat("pt-PT", { timeZone }).format(new Date());
        return timeZone;
    } catch (error) {
        console.error("Timezone invalido:", timeZone, error);
        return "UTC";
    }
}

function atualizarFullscreenStatus() {
    const emFullscreen = !!document.fullscreenElement;
    fullscreenStatusEl.textContent = `Estado do ecrã: ${emFullscreen ? "fullscreen" : "normal"}`;
}

async function entrarEmFullscreen() {
    try {
        await fullscreenTarget.requestFullscreen();
    } catch (error) {
        fullscreenStatusEl.textContent = "Estado do ecrã: erro ao ativar fullscreen";
        console.error(error);
    }
}

async function sairDeFullscreen() {
    if (!document.fullscreenElement) return;

    try {
        await document.exitFullscreen();
    } catch (error) {
        console.error(error);
    }
}

function atualizarRelogioTempoReal() {
    const locale = localeSelect.value;
    const timeZone = resolverTimeZone(timezoneSelect.value);
    const agora = new Date();

    clockNowEl.textContent = new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone,
        timeZoneName: "short"
    }).format(agora);

    dateNowEl.textContent = new Intl.DateTimeFormat(locale, {
        dateStyle: "full",
        timeZone
    }).format(agora);
}

function atualizarDateTimeFormatado() {
    const locale = localeSelect.value;
    const timeZone = resolverTimeZone(timezoneSelect.value);
    const agora = new Date();

    const formatado = new Intl.DateTimeFormat(locale, {
        dateStyle: "full",
        timeStyle: "long",
        timeZone
    }).format(agora);

    formattedDateTimeEl.textContent = `Data formatada: ${formatado}`;
    timestampValueEl.textContent = `Timestamp (ms): ${agora.getTime()}`;
    dateTimeStatusEl.textContent = `Visualizacao atual: ${locale} em ${timeZone}`;
}

function atualizarDateTimeUI() {
    atualizarRelogioTempoReal();
    atualizarDateTimeFormatado();
}

btnAtualizarDateTime.addEventListener("click", atualizarDateTimeUI);
localeSelect.addEventListener("change", atualizarDateTimeUI);
timezoneSelect.addEventListener("change", atualizarDateTimeUI);

btnEntrarFullscreen.addEventListener("click", entrarEmFullscreen);
btnSairFullscreen.addEventListener("click", sairDeFullscreen);
document.addEventListener("fullscreenchange", atualizarFullscreenStatus);

atualizarFullscreenStatus();
atualizarDateTimeUI();
setInterval(atualizarDateTimeUI, 1000);
