let item_section = document.querySelectorAll('.item-section')
let item = document.getElementById('item')
let text_image = document.querySelector('.text-image')
let add_to_cart = document.querySelectorAll('.add-to-cart')

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

for (let i = 0; i < add_to_cart.length; i++) {
    add_to_cart[i].addEventListener('click', (event) => {
        Swal.fire({
            icon: 'success',
            title: 'Add Item',
            text: 'Add to Cart Successfully!'
        })
    })
}