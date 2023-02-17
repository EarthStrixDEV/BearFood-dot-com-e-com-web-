let date_add_item = document.querySelector(".date-add-item");
let form_add_product = document.querySelector(".form-add-product");
let date = new Date()

date_add_item.value = date.toLocaleDateString() + " " + date.toLocaleTimeString()

/* form_add_product.addEventListener('submit', (event) => {
    event.preventDefault()
    Swal.fire({
        icon: 'success',
        title: 'Add product',
        text: 'Add product successfully!'
    })
}) */