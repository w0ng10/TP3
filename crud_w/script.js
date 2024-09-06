// Función para cargar los productos desde localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';
    
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para agregar un producto
function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const stock = document.getElementById('productStock').value;
    
    if (name && price && stock) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ name, price: parseFloat(price), stock: parseInt(stock) });
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
        
        // Limpiar campos
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productStock').value = '';
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Función para eliminar un producto
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

// Función para editar un producto
function editProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];
    
    // Rellenar los campos con los datos del producto seleccionado
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    
    // Cambiar el botón para actualizar el producto
    const addButton = document.querySelector('.form-container button');
    addButton.textContent = 'Actualizar';
    addButton.onclick = () => updateProduct(index);
}

// Función para actualizar un producto
function updateProduct(index) {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const stock = document.getElementById('productStock').value;
    
    if (name && price && stock) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products[index] = { name, price: parseFloat(price), stock: parseInt(stock) };
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
        
        // Limpiar campos y restablecer el botón
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productStock').value = '';
        document.querySelector('.form-container button').textContent = 'Agregar';
        document.querySelector('.form-container button').onclick = addProduct;
    } else {
        alert('Por favor, complete todos los campos.');
    }
}

// Cargar productos al cargar la página
window.onload = loadProducts;
