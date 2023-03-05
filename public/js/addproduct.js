let date_add_item = document.querySelector(".date-add-item");
let form_add_product = document.querySelector('form');
let image_url = document.querySelector("#prod_image");
let preview_image = document.querySelector('img[alt="preview"]')
let date = new Date()

date_add_item.value = date.toLocaleDateString() + " " + date.toLocaleTimeString()

form_add_product.addEventListener('submit', (event) => {
    event.preventDefault()
    Swal.fire({
        icon: 'success',
        title: 'Add product',
        text: 'Add your product successfully!'
    })
    setTimeout(() => {
        form_add_product.submit()
    }, 2000);
})

image_url.addEventListener('input', (event) => {
    event.preventDefault()
    preview_image.src = event.target.value;
})