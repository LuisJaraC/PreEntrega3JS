const productos =[
    {
        id: "Bristol-Original",
        titulo: "Bristol Original",
        imagen: "./img/bristol original.jpg",
        precio: 5000
    },
    {
        id: "Bristol-Caramelo",
        titulo: "Bristol Caramelo",
        imagen: "./img/bristol caramelo.png",
        precio: 5000
    },
    {
        id: "Bristol-Uva",
        titulo: "Bristol Uva",
        imagen: "./img/bristol uva.png",
        precio: 5000
    },
    {
        id: "Amsterdamer-Uva",
        titulo: "Amsterdamer Uva",
        imagen: "./img/Amsterdamer_Uva.jpg",
        precio: 4700
    },
    {
        id: "Amsterdamer-Vainilla",
        titulo: "Amsterdamer Vainilla",
        imagen: "./img/amsterdamer vanilla.jpg",
        precio: 4700
    },
    {
        id: "Amsterdamer-Manzana",
        titulo: "Amsterdamer Manzana",
        imagen: "./img/Amsterdamer apple.jpg",
        precio: 4700
    },
    {
        id: "Choice-Uva",
        titulo: "Choice Uva",
        imagen: "./img/choice-uva.jpg",
        precio: 4000
    },
    {
        id: "Choice-Chocolate-Negro",
        titulo: "Choice Chocolate Negro",
        imagen: "./img/choice dark chocolate.jpg",
        precio: 4000
    },
    {
        id: "Choice-Original",
        titulo: "Choice Original",
        imagen: "./img/choice original.png",
        precio: 4000
    },
]



const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");

function cargarProductos(){
    productos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-pie">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `
        contenedorProductos.append(div)
    })
    actualizarBotonAgregar();
}

cargarProductos();

function actualizarBotonAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    
}else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad ++;
        
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    
    actualizarNumerito();
   
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
} 

const numerito = document.querySelector("#numerito")
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito

}
/*
<div class="producto">
                    <img class="producto-imagen" src="./img/bristol original.jpg" alt="tabaco bristol original">
                    <div class="producto-detalles">
                        <h3 class="producto-pie">Bristol Original</h3>
                        <p class="producto-precio">$5000</p>
                        <button class="producto-agregar">Agregar</button>
                    </div>
                </div> */