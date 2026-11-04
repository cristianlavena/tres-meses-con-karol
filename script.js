function abrirCarta() {
    const sobre = document.getElementById("sobre");
    const carta = document.getElementById("carta-final");
    const boton = document.getElementById("boton-carta");

    if (!sobre || !carta) return;

    const estaAbierta = sobre.classList.contains("abierto");

    if (!estaAbierta) {
        sobre.classList.add("abierto");
        boton.textContent = "Tu carta está abierta ✦";

        setTimeout(() => {
            carta.classList.add("visible");
            carta.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 850);
    } else {
        carta.classList.remove("visible");
        sobre.classList.remove("abierto");
        boton.textContent = "Abrir mi carta ✦";
    }
}
function reproducirCancion(videoId, boton) {
    const tarjeta = boton.closest(".cancion");
    const reproductor = tarjeta.querySelector(".reproductor");

    // Cerrar el reproductor si ya está abierto
    if (reproductor.innerHTML !== "") {
        reproductor.innerHTML = "";
        boton.textContent = "▶ Play";
        return;
    }

    // Cerrar los demás reproductores
    document.querySelectorAll(".reproductor").forEach((player) => {
        player.innerHTML = "";
    });

    document.querySelectorAll(".cancion .boton").forEach((btn) => {
        btn.textContent = "▶ Play";
    });

    // Abrir el reproductor de YouTube
    reproductor.innerHTML = `
        <iframe
            src="https://www.youtube.com/embed/${videoId}?autoplay=1"
            title="Reproductor de YouTube"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen>
        </iframe>
    `;

    boton.textContent = "✕ Cerrar";
}
let cancionActual = null;

function controlarMusica(boton) {
    const tarjeta = boton.closest(".cancion");
    const audio = tarjeta.querySelector("audio");

    if (audio.paused) {
        if (cancionActual && cancionActual !== audio) {
            cancionActual.pause();
            cancionActual.closest(".cancion")
                .querySelector(".control").textContent = "▶";
        }

        cancionActual = audio;
        audio.play();
        boton.textContent = "Ⅱ";
    } else {
        audio.pause();
        boton.textContent = "▶";
    }
}

document.querySelectorAll(".cancion").forEach(tarjeta => {
    const audio = tarjeta.querySelector("audio");
    const barra = tarjeta.querySelector(".progreso");
    const relleno = barra.querySelector("div");
    const tiempo = tarjeta.querySelector(".tiempo");
    const boton = tarjeta.querySelector(".control");

    audio.addEventListener("timeupdate", () => {
        if (!audio.duration) return;

        const restante = audio.duration - audio.currentTime;
        const minutos = Math.floor(restante / 60);
        const segundos = Math.floor(restante % 60);

        relleno.style.width =
            (audio.currentTime / audio.duration * 100) + "%";

        tiempo.textContent =
            `${minutos}:${String(segundos).padStart(2, "0")}`;
    });

    audio.addEventListener("ended", () => {
        boton.textContent = "▶";
        relleno.style.width = "100%";
    });

    barra.addEventListener("click", e => {
        if (!audio.duration) return;
        const rect = barra.getBoundingClientRect();
        const posicion = (e.clientX - rect.left) / rect.width;
        audio.currentTime = posicion * audio.duration;
    });
});
function cargarGaleria(contenedorId, prefijo, cantidad) {
    const contenedor = document.getElementById(contenedorId);

    for (let i = 1; i <= cantidad; i++) {
        const imagen = document.createElement("div");
        imagen.className = "obra";

        const img = document.createElement("img");
        img.src = `galeria/${prefijo}${i}.png`;
        img.alt = `${prefijo} ${i}`;

        imagen.appendChild(img);

        imagen.onclick = () => {
            window.open(img.src, "_blank");
        };

        contenedor.appendChild(imagen);
    }
}

cargarGaleria("galeria-dibujos", "dibujo", 23);
cargarGaleria("galeria-recuerdos", "recuerdo", 7);
function abrirRegalo() {
    const cofre = document.getElementById("cofre");
    const sorpresa = document.getElementById("sorpresa");
    const texto = document.getElementById("texto-cofre");

    if (!cofre.classList.contains("abierto")) {
        cofre.classList.add("abierto");
        lanzarEstrellas();
        texto.textContent = "¡Una sorpresa para vos!";

        setTimeout(() => {
            sorpresa.classList.add("visible");
            sorpresa.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 650);
    }
}
function lanzarEstrellas() {
    const contenedor = document.querySelector(".cofre-contenedor");

    for (let i = 0; i < 35; i++) {
        const estrella = document.createElement("span");

        estrella.className = "particula";
        estrella.textContent = "✦";

        estrella.style.setProperty("--x", Math.random() * 100 + "%");
        estrella.style.setProperty("--tamano", (12 + Math.random() * 22) + "px");
        estrella.style.setProperty("--duracion", (1.5 + Math.random() * 1.5) + "s");
        estrella.style.setProperty("--distancia", (-70 - Math.random() * 150) + "px");

        contenedor.appendChild(estrella);

        setTimeout(() => estrella.remove(), 3200);
    }
}
function actualizarContador() {
    const fechaInicio = new Date(2026, 7, 13, 0, 0, 0);
    const ahora = new Date();

    let diferencia = ahora - fechaInicio;

    if (diferencia < 0) diferencia = 0;

    const segundosTotales = Math.floor(diferencia / 1000);

    const dias = Math.floor(segundosTotales / 86400);
    const horas = Math.floor((segundosTotales % 86400) / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
}

actualizarContador();
setInterval(actualizarContador, 1000);
function crearEstrellaFugaz() {
    const estrella = document.createElement("div");

    estrella.className = "estrella-fugaz";
    estrella.style.setProperty(
        "--altura",
        (10 + Math.random() * 65) + "vh"
    );

    document.body.appendChild(estrella);

    setTimeout(() => estrella.remove(), 1600);

    const siguiente = 7000 + Math.random() * 9000;
    setTimeout(crearEstrellaFugaz, siguiente);
}

setTimeout(crearEstrellaFugaz, 3000);

/* ===== GALERÍA TIPO CELULAR ===== */

(function iniciarGaleria() {
    function prepararGaleria() {
        const estilo = document.createElement("style");

        estilo.textContent = `
            .visor-galeria {
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: none;
                align-items: center;
                justify-content: center;
                background: rgba(8, 4, 16, .96);
                backdrop-filter: blur(12px);
                opacity: 0;
                transition: opacity .25s ease;
                touch-action: pan-y;
            }

            .visor-galeria.activo {
                display: flex;
                opacity: 1;
            }

            .visor-imagen-contenedor {
    position: relative;
    width: min(85vw, 1050px);
    height: min(82vh, 750px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 35px;
    border: 1px solid rgba(213, 165, 255, .65);
    border-radius: 25px;

    background:
        radial-gradient(circle at 50% 40%, rgba(165, 105, 220, .22), transparent 65%),
        linear-gradient(145deg, rgba(65, 40, 91, .95), rgba(20, 11, 36, .98));

    box-shadow:
        0 0 20px rgba(181, 119, 255, .18),
        0 0 65px rgba(181, 119, 255, .12),
        inset 0 0 35px rgba(213, 165, 255, .08);
}

.visor-imagen-contenedor::before {
    content: "✦";
    position: absolute;
    top: 12px;
    left: 17px;
    color: #e8c5ff;
    font-size: 17px;
    text-shadow: 0 0 12px #d5a5ff;
}

.visor-imagen-contenedor::after {
    content: "✦";
    position: absolute;
    bottom: 12px;
    right: 17px;
    color: #e8c5ff;
    font-size: 17px;
    text-shadow: 0 0 12px #d5a5ff;
}

            .visor-imagen {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border: 3px solid rgba(232, 197, 255, .85);
    border-radius: 13px;
    padding: 5px;
    background: #1c102b;

    box-shadow:
        0 0 12px rgba(213, 165, 255, .35),
        0 0 30px rgba(183, 108, 255, .18);

    user-select: none;
    -webkit-user-drag: none;
    animation: aparecerImagen .25s ease;
}

            @keyframes aparecerImagen {
                from {
                    opacity: 0;
                    transform: scale(.96);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            .visor-cerrar,
            .visor-flecha {
                position: absolute;
                z-index: 2;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid rgba(255,255,255,.2);
                color: white;
                background: rgba(80, 48, 110, .65);
                cursor: pointer;
                transition: .2s;
            }

            .visor-cerrar:hover,
            .visor-flecha:hover {
                background: #9b69cf;
                transform: scale(1.08);
            }

            .visor-cerrar {
                top: 22px;
                right: 25px;
                width: 45px;
                height: 45px;
                border-radius: 50%;
                font-size: 27px;
            }

            .visor-flecha {
                top: 50%;
                width: 48px;
                height: 48px;
                border-radius: 50%;
                font-size: 30px;
                transform: translateY(-50%);
            }

            .visor-anterior {
                left: 20px;
            }

            .visor-siguiente {
                right: 20px;
            }

            .visor-contador {
                position: absolute;
                bottom: 22px;
                left: 50%;
                transform: translateX(-50%);
                color: #f0d5ff;
                font-family: 'Nunito', sans-serif;
                font-size: 14px;
                letter-spacing: 2px;
            }

            @media (max-width: 650px) {
                .visor-imagen-contenedor {
    width: 94vw;
    height: 78vh;
    padding: 20px 12px;
    border-radius: 18px;
}

                .visor-flecha {
                    top: auto;
                    bottom: 15px;
                    width: 42px;
                    height: 42px;
                    transform: none;
                }

                .visor-anterior {
                    left: 20px;
                }

                .visor-siguiente {
                    right: 20px;
                }

                .visor-contador {
                    bottom: 28px;
                }

                .visor-cerrar {
                    top: 15px;
                    right: 15px;
                }
            }
        `;

        document.head.appendChild(estilo);

        const visor = document.createElement("div");
        visor.className = "visor-galeria";

        visor.innerHTML = `
            <button class="visor-cerrar" aria-label="Cerrar">×</button>
            <button class="visor-flecha visor-anterior" aria-label="Anterior">‹</button>
            <div class="visor-imagen-contenedor">
                <img class="visor-imagen" alt="">
            </div>
            <button class="visor-flecha visor-siguiente" aria-label="Siguiente">›</button>
            <div class="visor-contador"></div>
        `;

        document.body.appendChild(visor);

        const imagenGrande = visor.querySelector(".visor-imagen");
        const contador = visor.querySelector(".visor-contador");
        const botonCerrar = visor.querySelector(".visor-cerrar");
        const botonAnterior = visor.querySelector(".visor-anterior");
        const botonSiguiente = visor.querySelector(".visor-siguiente");

        let imagenes = [];
        let indiceActual = 0;
        let inicioX = 0;
        let inicioY = 0;

        function actualizarImagen() {
            if (!imagenes.length) return;

            const imagen = imagenes[indiceActual];

            imagenGrande.src = imagen.currentSrc || imagen.src;
            imagenGrande.alt = imagen.alt || "Fotografía de la galería";

            contador.textContent =
                (indiceActual + 1) + " / " + imagenes.length;

            const hayVarias = imagenes.length > 1;

            botonAnterior.style.display = hayVarias ? "flex" : "none";
            botonSiguiente.style.display = hayVarias ? "flex" : "none";
        }

        function abrirVisor(indice) {
            imagenes = Array.from(
                document.querySelectorAll(".galeria img, .obra img")
            );

            if (!imagenes.length) return;

            indiceActual = indice;
            actualizarImagen();

            visor.style.display = "flex";
            document.body.style.overflow = "hidden";

            requestAnimationFrame(() => {
                visor.classList.add("activo");
            });
        }

        function cerrarVisor() {
            visor.classList.remove("activo");
            document.body.style.overflow = "";

            setTimeout(() => {
                if (!visor.classList.contains("activo")) {
                    visor.style.display = "none";
                }
            }, 250);
        }

        function siguienteImagen() {
            if (imagenes.length < 2) return;

            indiceActual = (indiceActual + 1) % imagenes.length;
            actualizarImagen();
        }

        function anteriorImagen() {
            if (imagenes.length < 2) return;

            indiceActual =
                (indiceActual - 1 + imagenes.length) % imagenes.length;

            actualizarImagen();
        }

        
document.addEventListener("click", function(evento) {
    const imagen = evento.target.closest(
        ".galeria img, .obra img"
    );

    const enlace = evento.target.closest(
        ".galeria a, .obra a"
    );

    if (!imagen && !enlace) return;

    const imagenClickeada = imagen || enlace.querySelector("img");

    if (!imagenClickeada) return;

    evento.preventDefault();
    evento.stopPropagation();
    evento.stopImmediatePropagation();

    const todas = Array.from(
        document.querySelectorAll(".galeria img, .obra img")
    );

    abrirVisor(todas.indexOf(imagenClickeada));
}, true);


        botonCerrar.addEventListener("click", cerrarVisor);
        botonSiguiente.addEventListener("click", siguienteImagen);
        botonAnterior.addEventListener("click", anteriorImagen);

        visor.addEventListener("click", function(evento) {
            if (evento.target === visor) {
                cerrarVisor();
            }
        });

        document.addEventListener("keydown", function(evento) {
            if (!visor.classList.contains("activo")) return;

            if (evento.key === "Escape") cerrarVisor();
            if (evento.key === "ArrowRight") siguienteImagen();
            if (evento.key === "ArrowLeft") anteriorImagen();
        });

        imagenGrande.addEventListener("pointerdown", function(evento) {
            inicioX = evento.clientX;
            inicioY = evento.clientY;
        });

        imagenGrande.addEventListener("pointerup", function(evento) {
            const diferenciaX = evento.clientX - inicioX;
            const diferenciaY = evento.clientY - inicioY;

            if (Math.abs(diferenciaX) > 50 &&
                Math.abs(diferenciaX) > Math.abs(diferenciaY)) {

                if (diferenciaX < 0) {
                    siguienteImagen();
                } else {
                    anteriorImagen();
                }
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", prepararGaleria);
    } else {
        prepararGaleria();
    }
})();
/* ===== ESTRELLAS QUE TITILAN ===== */

function crearEstrellasTitilantes() {
    const cielo = document.querySelector(".cielo-animado");

    if (!cielo) return;

    for (let i = 0; i < 45; i++) {
        const estrella = document.createElement("span");

        estrella.className = "estrella-titilante";

        estrella.style.left = Math.random() * 100 + "%";
        estrella.style.top = Math.random() * 100 + "%";

        const tamano = 2 + Math.random() * 3;
        estrella.style.width = tamano + "px";
        estrella.style.height = tamano + "px";

        estrella.style.setProperty(
            "--duracion",
            (2 + Math.random() * 4) + "s"
        );

        estrella.style.animationDelay =
            (Math.random() * 5) + "s";

        cielo.appendChild(estrella);
    }
}

crearEstrellasTitilantes();
/* ===== CÁPSULA DEL TIEMPO ===== */

const mensajesCapsula = [
    "Cada momento que comparto con vos se convierte en un recuerdo que quiero guardar para siempre.",
    "Aunque estemos lejos, siempre encuentro una forma de sentirte cerquita.",
    "Ojalá podamos seguir creando muchísimos recuerdos juntos.",
    "Si estás leyendo esto, quiero recordarte que sos alguien muy especial para mí.",
    "arroz con tierra,wakala.",
    "el mate no es un té.",
    "faaaàaa.",
    "Argentina es mejor que Cuba :).",
    "No importa cuántos kilómetros haya entre nosotros, siempre voy a encontrar motivos para acercarme a vos.",
    "No necesito un día especial para recordarte lo mucho que te amo.",
    "Espero que hoy hayas comido bien, mi niña. No te me descuides.",
    "Si tuviste un día difícil, ojalá este mensajito te saque una sonrisa.",
    "Quiero que nunca dudes de lo especial que sos para mí.",
    "Nunca te olvides de lo orgulloso que estoy de vos.",
    "Algún día vamos a leer esto juntos y nos vamos a reír de lo mucho que hemos cambiado.",
    "Todavía nos quedan muchísimas primeras veces por vivir.",
    "Tengo muchas ganas de conocer todos esos pequeños detalles de vos que todavía no conozco."
];

let ultimoMensaje = -1;

function descubrirRecuerdo() {
    const capsula = document.getElementById("capsula-objeto");
    const tarjeta = document.getElementById("recuerdo-revelado");
    const texto = document.getElementById("mensaje-recuerdo");

    if (!capsula || !tarjeta || !texto) return;

    let nuevoMensaje;

    do {
        nuevoMensaje = Math.floor(Math.random() * mensajesCapsula.length);
    } while (mensajesCapsula.length > 1 && nuevoMensaje === ultimoMensaje);

    ultimoMensaje = nuevoMensaje;

    texto.textContent = mensajesCapsula[nuevoMensaje];

    capsula.classList.add("descubriendo");
    tarjeta.classList.remove("visible");

    setTimeout(() => {
        tarjeta.classList.add("visible");
        capsula.classList.remove("descubriendo");
    }, 350);
}
/* ===== UN CIELO DE DESEOS ===== */

const deseosKarol = [
    "Deseo que nunca te falten motivos para sonreír.",
    "Deseo que puedas cumplir cada uno de tus sueños.",
    "Deseo poder abrazarte en esos días en los que más lo necesites.",
    "Deseo que nunca dejes de ver lo especial que sos.",
    "Deseo que algún día podamos vernos.",
    "Deseo que algún día podamos caminar juntos de la mano.",
    "Y sobre todo, deseo que nunca te falte amor, tranquilidad y alguien que te recuerde cuánto valés."
];

let estrellasDescubiertas = [];

function revelarDeseo(indice) {
    const tarjeta = document.getElementById("deseo-revelado");
    const texto = document.getElementById("texto-deseo");
    const estrellas = document.querySelectorAll(".estrella-deseo");

    if (!tarjeta || !texto || !estrellas[indice]) return;

    texto.textContent = deseosKarol[indice];
    tarjeta.classList.remove("visible");

    estrellasDescubiertas[indice] = true;

    estrellas[indice].classList.add("descubierta");
    estrellas[indice].style.color = "#ffffff";
    estrellas[indice].style.textShadow =
        "0 0 12px white, 0 0 25px #e8c5ff";

    setTimeout(() => {
        tarjeta.classList.add("visible");
        tarjeta.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }, 100);

    if (estrellasDescubiertas.filter(Boolean).length === deseosKarol.length) {
        texto.textContent += " ✦ ¡Descubriste todos mis deseos para vos, mi niña!";
    }
}
/* ===== ABRAZO DE CRISTIAN Y KAROL ===== */

function darAbrazo() {
    const ilustracion = document.getElementById("abrazo-ilustracion");
    const boton = document.getElementById("boton-abrazo");

    if (!ilustracion || !boton) return;

    if (!ilustracion.classList.contains("visible")) {
        ilustracion.classList.add("visible");
        boton.textContent = "Otro abrazo ✦";

        setTimeout(() => {
            ilustracion.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 250);
    } else {
        ilustracion.classList.remove("visible");
        boton.textContent = "Necesito un abrazo ✦";
    }
}
/* ===== MENSAJES ALEATORIOS PARA KAROL ===== */

const frasesKarol = [
    "¿Ya te dije lo bonita que sos hoy?",
    "Ojalá pudiera darte un abrazo ahora mismo.",
    "Estoy muy orgulloso de vos, mi niña.",
    "No te olvides de comer, que te conozco JAJAJA.",
    "Si pudiera elegir dónde estar ahora, sería a tu lado.",
    "Sos mi casualidad favorita.",
    "Ojalá pudiera abrazarte cada vez que te extraño.",
    "Si pudiera pedir un deseo, sería poder despertar todos los días a tu lado.",
    "Nunca dudes de lo muchísimo que te quiero.",
    "Te mando un besito de esos que duran muchísimo."
];

let ultimoMensajeKarol = -1;

function moverEstrellaMensaje() {
    const zona = document.getElementById("zona-mensajes");
    const estrella = document.getElementById("estrella-mensaje");

    if (!zona || !estrella) return;

    const margen = 15;

    const espacioX = zona.clientWidth - estrella.offsetWidth - margen * 2;
    const espacioY = zona.clientHeight - estrella.offsetHeight - margen * 2;

    const posicionX = margen + Math.random() * Math.max(0, espacioX);
    const posicionY = margen + Math.random() * Math.max(0, espacioY);

    const inclinacion = Math.random() * 30 - 15;

    estrella.style.left = posicionX + "px";
    estrella.style.top = posicionY + "px";
    estrella.style.transform =
        `rotate(${inclinacion}deg)`;
}

function descubrirMensaje() {
    const estrella = document.getElementById("estrella-mensaje");
    const tarjeta = document.getElementById("tarjeta-mensaje");
    const texto = document.getElementById("texto-mensaje");

    if (!estrella || !tarjeta || !texto) return;

    let nuevoMensaje;

    do {
        nuevoMensaje = Math.floor(Math.random() * frasesKarol.length);
    } while (
        frasesKarol.length > 1 &&
        nuevoMensaje === ultimoMensajeKarol
    );

    ultimoMensajeKarol = nuevoMensaje;

    texto.textContent = frasesKarol[nuevoMensaje];

    tarjeta.classList.remove("visible");

    setTimeout(() => {
        tarjeta.classList.add("visible");
    }, 50);

    estrella.textContent = "✦ Buscame otra vez ✦";

    moverEstrellaMensaje();
}

document.addEventListener("DOMContentLoaded", () => {
    moverEstrellaMensaje();
});