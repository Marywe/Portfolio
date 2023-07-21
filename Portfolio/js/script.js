function openMenu() {
    "use strict";
    //Buscamos los li y los guardamos en una variable
    var opciones = document.getElementById("menu").firstElementChild.children;
    //La variable i nos ayudará a recorrer el bucle e ir presentando las opciones
    var i;
    for (i = 0; i < opciones.length; i = i + 1) {
        opciones[i].style.display = "block";
    }
}

function closeMenu() {
    "use strict";
    //Solo cerramos el menú cuando la pantalla es pequeña (menor a 700px de ancho)
    if (window.innerWidth <= 700) {
        var opciones = document.getElementById("menu").firstElementChild.children;
        var i;
        opciones[0].style.display = "block";
        for (i = 1; i < opciones.length; i = i + 1) {
            opciones[i].style.display = "none";
        }
    }
}

function menu() {
    "use strict";
    if (document.getElementById("menu").firstElementChild.lastElementChild.style.display === "block") {
        closeMenu();
    } else {
        openMenu();
    }
}

function openedMenu() {
    "use strict";
    var opciones = document.getElementById("menu").firstElementChild.children;
    var i;
    opciones[0].style.display = "none";
    for (i = 1; i < opciones.length; i = i + 1) {
        opciones[i].style.display = "block";
    }
}


window.onresize = function () {
    "use strict";
    if (window.innerWidth <= 700) {
        closeMenu();
    } else {
        openedMenu();
    }
}



var indice = 1;

function setImagen(n, g) {
    "use strict";
    var div_galeria = document.getElementById(g).firstElementChild;
    var imagenes = div_galeria.children;
    var num_imagenes = imagenes.length;

    if (n > num_imagenes) {
        indice = 1;
    }
    if (n < 1) {
        indice = num_imagenes;
    }

    div_galeria.style.left = ((indice - 1) * (-100)) + "%";
}

function avanzaImagen(n, g) {
    "use strict";
    setImagen(indice += n, g);
}