let item_section = document.querySelectorAll('.item-section')
let item = document.getElementById('item')
let text_image = document.querySelector('.text-image')
let add_item_form = document.querySelectorAll(
  "form[action='/cart/adding-cart']"
);
let name_product = document.querySelectorAll(".name-product");
let price_product = document.querySelectorAll('.price_product')
let id_product = document.querySelectorAll('.id_product')
let description_product = document.querySelectorAll('.description_product')
let cart_prod_date = document.querySelectorAll(".cart_prod_date");

item_section.forEach((item) => {
    item.addEventListener('mouseover', (e) => {
        item.style.transform = "translateY(-3%)"
        item.style.transition = "all 0.35s ease-in-out"
        e.preventDefault()
    })

    item.addEventListener('mouseout', (e) => {
        item.style.transform = "translateY(0)"
        item.style.transition = "all 0.7s ease-in-out"
        e.preventDefault()
    })
})

item.addEventListener('mouseover', (e) => {
    text_image.style.visibility = "visible"
    e.preventDefault()
})

text_image.addEventListener('mouseout', (e) => {
    text_image.style.visibility = "hidden"
    e.preventDefault()
})

for (let i = 0; i < add_item_form.length; i++) {
    add_item_form[i].addEventListener('submit', (event) => {
        Swal.fire({
            icon: "success",
            title: "Add item",
            text: "Added item to cart successfully!"
        })
        setTimeout(() => {
            add_item_form[i].submit();
        }, 3000);
    })
}

let dt = new Date()
cart_prod_date.forEach((cart_prod_date) => {
    cart_prod_date.value = `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`
})