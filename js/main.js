let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data =>{
        productos = data;
        cargarProductos(productos)
    })


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

    Toastify({
        text: "Producto agregado",
        duration: 2500,
        destination: "",
        newWindow: false,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #1d1d92, #808080",
          borderRadius: "2rem",
          border: "solid #000000"
        },
        onClick: function(){} // Callback after click
      }).showToast();

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

actualizarNumerito();
/*
<div class="producto">
                    <img class="producto-imagen" src="./img/bristol original.jpg" alt="tabaco bristol original">
                    <div class="producto-detalles">
                        <h3 class="producto-pie">Bristol Original</h3>
                        <p class="producto-precio">$5000</p>
                        <button class="producto-agregar">Agregar</button>
                    </div>
                </div> */