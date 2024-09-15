document.addEventListener('DOMContentLoaded', function() {
    const agregarBtn = document.getElementById('agregar-btn');
    const productoSelect = document.getElementById('producto');
    const cantidadInput = document.getElementById('cantidad');
    const pedidoLista = document.getElementById('pedido-lista');
    const totalPrecio = document.getElementById('total-precio');
    const enviarPedidoBtn = document.getElementById('enviar-pedido-btn');
    const clienteForm = document.getElementById('cliente-form');
    const errorMsg = document.getElementById('error-msg');

    let total = 0;

    function actualizarTotal() {
        totalPrecio.textContent = total.toFixed(3);
    }

    function agregarProducto() {
        const producto = productoSelect.options[productoSelect.selectedIndex];
        const productoNombre = producto.textContent;
        const productoPrecio = parseFloat(producto.getAttribute('data-price'));
        const cantidad = parseInt(cantidadInput.value, 10);
        const subtotal = productoPrecio * cantidad;

        const li = document.createElement('li');
        li.innerHTML = `${productoNombre} x ${cantidad} - $${subtotal.toFixed(3)} <button class="eliminar-btn">Eliminar</button>`;
        pedidoLista.appendChild(li);

        total += subtotal;
        actualizarTotal();

        // Limpiar campos
        productoSelect.selectedIndex = 0;
        cantidadInput.value = 1;
    }

    function eliminarProducto(e) {
        if (e.target.classList.contains('eliminar-btn')) {
            const li = e.target.parentElement;
            const precioTexto = li.textContent.match(/- \$(\d+\.\d+)/);
            if (precioTexto) {
                const precio = parseFloat(precioTexto[1]);
                total -= precio;
                actualizarTotal();
                li.remove();
            }
        }
    }

    function validarCliente() {
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (nombre && apellido && telefono && email) {
            errorMsg.style.display = 'none';
            enviarPedidoBtn.disabled = false; // Habilitar el botón de enviar pedido
        } else {
            errorMsg.style.display = 'block'; // Mostrar el mensaje de error
            enviarPedidoBtn.disabled = true; // Deshabilitar el botón de enviar pedido
        }
    }

    function enviarPedido() {
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const email = document.getElementById('email').value.trim();

        if (nombre && apellido && telefono && email) {
            errorMsg.style.display = 'none'; // Ocultar mensaje de error

            // Recolectar datos del pedido
            const productos = [];
            const productosSeleccionados = document.querySelectorAll('#pedido-lista li');
            productosSeleccionados.forEach((producto) => {
                productos.push(producto.textContent);
            });

            const total = totalPrecio.textContent;

            // Crear el enlace mailto
            const mailtoLink = `mailto:contactotiendadepan@gmail.com?subject=Nuevo Pedido de ${nombre} ${apellido}&body=Nombre: ${nombre}%0D%0AApellido: ${apellido}%0D%0ATeléfono: ${telefono}%0D%0AEmail: ${email}%0D%0A%0D%0APedido:%0D%0A${productos.join('%0D%0A')}%0D%0A%0D%0ATotal: $${total}`;

            // Abrir el cliente de correo
            window.location.href = mailtoLink;
        } else {
            errorMsg.style.display = 'block'; // Mostrar mensaje de error
        }
    }

    agregarBtn.addEventListener('click', agregarProducto);
    pedidoLista.addEventListener('click', eliminarProducto);
    clienteForm.addEventListener('input', validarCliente);
    enviarPedidoBtn.addEventListener('click', enviarPedido);
});
