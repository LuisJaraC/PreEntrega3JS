let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);


const carritoVacio = document.querySelector("#carrito-vacio")
const carritoProductos = document.querySelector("#carrito-productos")
const carritoAcciones = document.querySelector("#carrito-acciones")
const carritoComprado = document.querySelector("#carrito-comprado")
const botonVaciar = document.querySelector(".carrito-vaciar")
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector(".carrito-acciones-comprar")

let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")

function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0){


        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
        carritoProductos.innerHTML = " ";
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.id}">
                <div class="carrito-producto-title">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio*producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}" ><i class="bi bi-trash3"></i></button>
            `;
            carritoProductos.append(div);
    
        });
        
    }else {
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e){

    Toastify({
        text: "Producto eliminado",
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
            border: "solid #000000",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    let idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
    
    productosEnCarrito.splice(index, 1)

    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito (){

    Swal.fire({
        title: "Deseas vaciar tu carrito?",
        icon: "question",
        html: `se eliminarán ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: `Si`,
        cancelButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
            cargarProductosCarrito();
        }
      });
}


function actualizarTotal(){
    total.innerText = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio*producto.cantidad), 0);
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito (){

    Swal.fire({
        title: "Deseas comprar estos productos?",
        text: "Estas seguro de no incluir ningun otro producto?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonText: "Deseo seguir comprando",
        confirmButtonText: "Comprar"
      }).then((result) => {
        if (result.isConfirmed) {
            carritoVacio.classList.remove("disabled");
            carritoProductos.classList.add("disabled");
            carritoAcciones.classList.add("disabled");
            carritoComprado.classList.add("disabled");
          Swal.fire({
            title: "Felicidades!, tu pedido se ha hecho",
            text: "Te adjuntaremos el detalle y link de pago a tu correo.",
            icon: "success"
          });
        }
      });

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    
}
