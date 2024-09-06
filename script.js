const prodGuitarras = [
    {nombre: "Guitarra Eléctrica Leonard Strato Color Roja", precio: 200000},
    {nombre: "Guitarra Electrica Jay Turser Legacy", precio: 350000},
    {nombre: "Guitarra Eléctrica Stagg Tipo Telecaster Vintage", precio: 150000},
    {nombre: "Guitarra EpiPhone Les Paul Special Cherry Sunburst", precio: 550000},
]

const prodBajos = [
    {nombre: "Bajo Leonard Lb252 Wh Precision Color Blanco", precio: 180000},
    {nombre: "Bajo Cort Action Precision Jazz, Color Negro", precio: 850000},
    {nombre: "Bajo Electrico Ibanez Gsr180bem Blue Metallic", precio: 450000},
    {nombre: "Bajo Electrico Sx Sh Series Jb", precio: 220000},
]

const prodBaterias = [
    {nombre: "Bateria Pearl Roadshow Jr. Series 5 Cuerpos", precio: 850000},
    {nombre: "Bateria Yamaha Rdp2f5sLG Serie Rydeen Gris", precio: 760000},
    {nombre: "Bateria Sonor Stage 5 Cuerpos Aqx", precio: 980000},
    {nombre: "Batería Yamaha Sbp2f5rb Stage Custom", precio: 820000},
]

const carrito = []

//función que tiene como parametros "producto" para guardar el producto elegido, y "cantidad" para indicar la cantidad que quiere el usuario del producto. Luego suma al carrito el producto con su respectivo precio y cantidad.
const agregarAlCarrito = (producto, cantidad) => {
    const sumarElemento = {
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad
    }
    carrito.push(sumarElemento)
}

//función que utiliza un ciclo for para recorrer el largo del carrito para identificar los productos, los precios y la cantidad elegida para hacer su respectiva suma y multiplicacion y retornar el total de ello.
const totalCarrito = () => {
    let total = 0
    for(let i= 0; i < carrito.length; i++) {
        total += carrito[i].precio * carrito[i].cantidad
    }
    return total
}

//función que, al dar la bienvenida a la tienda, utiliza un while, para primero preguntarle al usuario la categoria, y luego utilizando el condicional if y else if para que el usuario elija el producto y cantidad del mismo, y que, al finalizar esta selección, se pregunte si quiere seguir sumando productos al carrito, o sino dar el total del mismo.
const eCommerse = () => {
    alert("Bienvenido a la Tienda de Musica")
    let loop = true
    while(loop) {
        let elegirCategoria = prompt("En que Categoria quiere acceder? Ingrese el numero de la categoria: \n - [1] Guitarras \n - [2] Bajos \n - [3] Baterias")
        if (elegirCategoria == 1) {
            let producto = prompt("Que producto quiere agregar al carrito? Elija el producto segun su codigo \n -[0] Guitarra Eléctrica Leonard Strato Color Roja $200.000 \n -[1] Guitarra Electrica Jay Turser Legacy $350.000 \n -[2] Guitarra Eléctrica Stagg Tipo Telecaster Vintage $150.000 \n -[3] Guitarra EpiPhone Les Paul Special Cherry Sunburst $550.000")
            let cantidad = parseInt(prompt("Que cantidad de este producto quiere?"))
            agregarAlCarrito(prodGuitarras[producto], cantidad)
        } else if (elegirCategoria == 2) {
            let producto = prompt("Que producto quiere agregar al carrito? Elija el producto segun su codigo \n -[0] Bajo Leonard Lb252 Wh Precision Color Blanco $180.000 \n -[1] Bajo Cort Action Precision Jazz, Color Negro $850.000 \n -[2] Bajo Electrico Ibanez Gsr180bem Blue Metallic $450.000 \n -[3] Bajo Electrico Sx Sh Series Jb $220.000")
            let cantidad = parseInt(prompt("Que cantidad de este producto quiere?"))
            agregarAlCarrito(prodBajos[producto], cantidad)
        } else if (elegirCategoria == 3) {
            let producto = prompt("Que producto quiere agregar al carrito? Elija el producto segun su codigo \n -[0] Bateria Pearl Roadshow Jr. Series 5 Cuerpos $850.000 \n -[1] Bateria Yamaha Rdp2f5sLG Serie Rydeen Gris $760.000 \n -[2] Bateria Sonor Stage 5 Cuerpos Aqx $980.000 \n -[3] Batería Yamaha Sbp2f5rb Stage Custom $820.000")
            let cantidad = parseInt(prompt("Que cantidad de este producto quiere?"))
            agregarAlCarrito(prodBaterias[producto], cantidad)
        } else {
            alert("No existe esa categoria")
        }
        loop = confirm("Desea seguir agregando mas productos al carrito?")
    }
    alert("Su total a pagar es de $" + totalCarrito())
}

eCommerse()