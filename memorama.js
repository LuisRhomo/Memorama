let iconos;
var contador = 0;
var contarbuenas =0;
function cargarIconos() {
    iconos = [
        '<i class="fas fa-star"></i>',
        '<i class="far fa-star"></i>',
        '<i class="fas fa-star-of-life"></i>',
        '<i class="fas fa-star-and-crescent"></i>',
        '<i class="fab fa-old-republic"></i>',
        '<i class="fab fa-galactic-republic"></i>',
        '<i class="fas fa-sun"></i>',
        '<i class="fas fa-stroopwafel"></i>',
        '<i class="fas fa-dice"></i>',
        '<i class="fas fa-chess-knight"></i>',
        '<i class="fas fa-chess"></i>',
        '<i class="fas fa-dice-d20"></i>',
    ];
}
function generarTablero() {
    cargarIconos();
    let tablero = document.getElementById("tablero");
    
    let tarjetas = [];
    for (let i = 0; i < 24; i++) {
        tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${iconos[0]}
                </div>
                <div class="cara superior">
                <i class="far fa-question-circle"></i>
                </div>
            </div>
        </div>
        `)
        if (i%2==1) {
            iconos.splice(0,1);
        }
    }
    tarjetas.sort(() => Math.random()-0.5);
    tablero.innerHTML = tarjetas.join(" ");
    contador =0;
    tablero.innerHTML += `<h3>Número de intento: </h3><h3 id='txtcontador'></h3>`;
    document.getElementById("txtcontador").innerHTML = contador;
}
let selecciones = [];

function seleccionarTarjeta(i) {

    let tarjeta = document.getElementById("tarjeta"+i);
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)";
        selecciones.push(i);
    }
    if (selecciones.length == 2) {
        deseleccionar(selecciones);
        selecciones = [];
    }
}

function deseleccionar(selecciones) {
    setTimeout(()=> {
        let tarjeta1 = document.getElementById("tarjeta"+ selecciones[0]);
        let tarjeta2 = document.getElementById("tarjeta"+ selecciones[1]);
        let trasera1 = document.getElementById("trasera"+ selecciones[0]);
        let trasera2 = document.getElementById("trasera"+ selecciones[1]);
        if(trasera1.innerHTML != trasera2.innerHTML){
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"
            contador += 1;
        }else{
            trasera1.style.background = "green";
            trasera2.style.background = "green";
            contador += 1;
            contarbuenas ++;
        }
        if(contarbuenas > 11){
            document.getElementById("txtcontador").innerHTML = "Felicidades ganaste en: " + contador + " intentos    ";
        }else{
            document.getElementById("txtcontador").innerHTML = contador;
        }
    },1000);
}