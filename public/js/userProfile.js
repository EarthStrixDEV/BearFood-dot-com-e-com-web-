const btn_show_edit = document.querySelector(".edit-address-btn");
const address_edit_box = document.querySelector('.edit-address')

btn_show_edit.addEventListener('click', (event) => {
    if (address_edit_box.classList.contains('toggle')) {
        address_edit_box.style.display = "none";
        address_edit_box.classList.remove('toggle')
    } else {
        address_edit_box.style.display = "block";
        address_edit_box.classList.add('toggle')
    }
})