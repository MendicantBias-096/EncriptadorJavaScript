// Función para reemplazar caracteres en el mensaje utilizando expresiones regulares
function encriptarMensaje() {

    // Reglas de Codificacion
    let diccionario = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat',
        'z': 'kk',
    };

    let mensaje = document.getElementById("mensaje").value;

    if (!validacion(mensaje)) {
        return alert("Cuidado, el mensaje no cumple con las caracteristicas indicadas");
    }

    let mensajeEncriptado = mensaje.replace(/[aeiou]/g, function (match) {
        /* 
            Esta función busca vocales dentro del mensaje y las reemplaza según las reglas definidas en el diccionario.

            Dentro de la función, se utiliza el método `replace()` para buscar todas las ocurrencias de las vocales 
            (a, e, i, o, u) en el mensaje. 
            Por cada vocal encontrada, se verifica si hay una entrada correspondiente en el diccionario de encriptación. 
            Si existe una entrada en el diccionario para esa vocal, se reemplaza la vocal con el valor asociado en el diccionario.

            Si no hay una entrada en el diccionario para esa vocal, la vocal se deja sin cambios en el mensaje encriptado.
        */
        return diccionario[match];
    });

    mostrarMensaje(mensajeEncriptado);
}

// Función para desencriptar un mensaje utilizando el diccionario de desencriptación
function desencriptarMensaje() {

    let diccionario = {
        'ai': 'a',
        'enter': 'e',
        'imes': 'i',
        'ober': 'o',
        'ufat': 'u',
    };

    let mensaje = document.getElementById("mensaje").value;

    if (!validacion(mensaje)) {
        return alert("Cuidado, el mensaje no cumple con las caracteristicas indicadas");
    }

    // Este bucle itera a través de todas las claves del diccionario proporcionado
    for (let clave in diccionario) {
        /*  
            Se crea una expresion regular con la clave dentro del diccionario
            De esta forma se creara una expresion regular con la que evaluar la cadena de caracteres
            En la primera iteracion por ejemplo la expresion regular seria 'ai'
        */
        let expresionRegular = new RegExp(clave, 'g');
        /*  
            Evaluamos la expresion regular dentro de nuestro mensaje
            Si encontramos dentro de nuestra cadena esta coincidencia 'ai' que corresponde a la primera iteracion
            El fragmento que coincida sera reemplazado por el valor del diccionario con esa clave
            En este caso si encontramos 'ai' dentro de la cadena, estos caracteres seran sustituidos por 'a'
        */
        mensaje = mensaje.replace(expresionRegular, diccionario[clave]);
    }

    mostrarMensaje(mensaje);
}

function mostrarMensaje(mensaje) {

    // Obtenemos el elemento contenedor de la imagen que muestra cuando no hay ningun mensje a encriptar / desencriptar
    let noText = document.querySelector(".no-text");
    // Obtenemos el elemento contenedor del mensaje
    let textShow = document.querySelector(".text-show-hide");
    // Obtenemos el elemento contenedor donde se mostrara mensaje
    let spanShowMensaje = textShow.querySelector("span");

    if (mensaje != '') {
        // Si el mensaje es distinto de vacio, es decir, existe el mensaje, se ocultara la imagen y se mostrara el boton y el mensaje encriptado desencriptado
        noText.style.display = 'none';
        textShow.style.display = 'flex';
        // Colocamos el mensaje en el contenedor
        spanShowMensaje.innerHTML = mensaje;

    } else {
        // Si no hay mensaje, la imagen se mantiene
        noText.style.display = 'flex';
        textShow.style.display = 'none';
    }
}

// Copiar Mensaje
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto)
        .then(() => {
            // console.log('Texto copiado al portapapeles');
        })
        .catch(err => {
            // console.error('Error al copiar el texto al portapapeles:', err);
        });
}

function copiar() {
    let mensaje = document.getElementById("mensaje-procesado").textContent;
    copiarAlPortapapeles(mensaje);
}

// Validaciones
function validacionMinusculas(mensaje) {
    return mensaje === mensaje.toLowerCase();
}

function validacionAcentos(mensaje) {
    let regexAcentos = /[áéíóúÁÉÍÓÚ]/;
    return !regexAcentos.test(mensaje);
}

function validacionCaracteresNumeros(mensaje) {
    let regexAlfabetico = /^[a-zñ\s]*$/;
    return regexAlfabetico.test(mensaje);
}

function validacion(mensaje) {
    if ((validacionMinusculas(mensaje) && validacionAcentos(mensaje) && validacionCaracteresNumeros(mensaje))) {
        return true;
    }

    return false;
}