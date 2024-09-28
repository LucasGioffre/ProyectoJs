const prodGuitarras = [
    {nombre: "Guitarra Electrica Ibanez Grx40ca Serie Gio Candy Apple", precio: 470000},
    {nombre: "Guitarra Sx Ef3d-cs Ef3 Series Lp Rw Mango Encolado", precio: 310500},
    {nombre: "Guitarra Electrica EpiPhone Les Paul Classic Color Negra", precio: 650200},
    {nombre: "Guitarra Electrica Esp Ltd Ec401 Ow Eclipse Emg Blanca", precio: 865000},
];

const prodBajos = [
    {nombre: "Bajo Cort Action Pj Opb Action Precision Jazz, Color Negro", precio: 565000},
    {nombre: "Bajo Electrico Ibanez Gsr180bem 4 Cuerdas Blue", precio: 472000},
    {nombre: "Bajo Electrico Yamaha Trbx305 Serie Rbx De 5 Cuerdas", precio: 645000},
    {nombre: "Bajo Ibanez Gsr200pw Serie Gsr 4 Cuerdas Pearl White", precio: 421000},
];

const prodBaterias = [
    {nombre: "Bateria Acustica Mapex Ve5294ftvc Venus Steel Blue", precio: 1000000},
    {nombre: "Bateria Yamaha Rdp2f5sLG Serie Rydeen Gris Sin Fierros", precio: 850000},
    {nombre: "Bateria Tama Vd36mwsvbg Silverstar 16+10+13 Vintage", precio: 1200000},
    {nombre: "Bateria Electronica 5 Cuerpos Platillos Alesis Crimson Ii", precio: 1350000},
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Funcion para actualizar el carrito tanto en la pagina como en el LocalStorage
const actualizarCarrito = () => {
    const listaCarrito = document.getElementById("listaCarrito");
    listaCarrito.innerHTML = ''; // Limpia la lista actual del carrito
    let total = 0;
    // Funcion para eliminar un producto del carrito
    const eliminarDelCarrito = (index) => {
        carrito.splice(index, 1); // Elimina el producto del carrito
        actualizarCarrito(); // Actualiza el carrito en la pagina
    };
    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio} x ${item.cantidad} `;
        // Creo el boton de eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = " X ";
        btnEliminar.classList.add("btnEliminar");
        // Llamo a la funcion de eliminarDelCarrito
        btnEliminar.onclick = () => eliminarDelCarrito(index);
        li.appendChild(btnEliminar); // Agrego el boton al elemento de la lista del carrito
        listaCarrito.appendChild(li);
        total += item.precio * item.cantidad; // Calcula el total del carrito
    });
    document.getElementById("totalCarrito").textContent = `TOTAL: $${total}`;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Funcion para agregar un producto al carrito
const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(item => item.nombre === producto.nombre);
    if (productoExistente) {
        productoExistente.cantidad += 1; // Incrementa la cantidad si ya existe el producto
    } else {
        carrito.push({...producto, cantidad: 1}); // Añade nuevo producto con cantidad 1
    }
    actualizarCarrito();
}

// Funcion para obtener producto por indice
const obtenerProductoPorIndice = (index) => {
    const todosLosProductos = [...prodGuitarras, ...prodBajos, ...prodBaterias];
    return todosLosProductos[index];
}

// Funcion para manejar el clic en los botones de "AGREGAR AL CARRITO"
const initBotones = () => {
    const botonesAgregar = document.querySelectorAll("input[value='AGREGAR AL CARRITO']");
    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener("click", () => {
            const producto = obtenerProductoPorIndice(index);
            agregarAlCarrito(producto);
        });
    });
};

// Funcion para calcular el total del carrito
const totalCarrito = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

const mostrarMensaje = (texto) => {
    const mensajeDiv = document.getElementById("mensaje");
    const textoMensaje = document.getElementById("textoMensaje");
    const cerrarMensaje = document.getElementById("cerrarMensaje");
    textoMensaje.textContent = texto;
    mensajeDiv.classList.add("show");
    // Funcion para cerrar el mensaje
    cerrarMensaje.onclick = () => {
        mensajeDiv.classList.remove("show");
    };
}

const validarYFinalizarCompra = () => {
    // Obtengo los valores de los inputs
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    // Obtengo el elemento del mensaje de error
    const mensajeError = document.getElementById("mensajeError");
    // Valida si algun campo del formulario esta vacio
    if (nombre === "" || apellido === "" || email === "") {
        mensajeError.style.display = "block";
        mostrarMensaje("Por favor, complete todos los campos del formulario.");
        return;
    } else {
        // Limpia el formulario si todo esta completo
        mensajeError.style.display = "none"; // Oculta el mensaje de error
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("email").value = "";
        // Continua con la finalizacion de la compra
        if (carrito.length === 0) {
            mostrarMensaje("No hay productos en el carrito.");
            return;
        } else {
            mostrarMensaje(`Su total a pagar es de $${totalCarrito()}. En breve le enviaremos un Email para finalizar la compra.`);
            // Vacia el carrito despues de la compra
            carrito = [];
            localStorage.removeItem('carrito'); // Limpia el localStorage
            actualizarCarrito(); // Actualizar la UI del carrito
        }
    }
}
const eCommerce = () => {
    document.getElementById("finalizarCompra").addEventListener("click", validarYFinalizarCompra);
    initBotones();
    actualizarCarrito();
}

eCommerce();
