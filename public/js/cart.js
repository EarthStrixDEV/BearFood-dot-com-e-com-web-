/* 
add-count-btn add-count-decrease
*/
const add_count_btn = document.querySelectorAll(".add-count-btn");
const add_count_decrease = document.querySelectorAll(".add-count-decrease");
const add_count_increase = document.querySelectorAll(".add-count-increase");
const add_count_number = document.querySelectorAll(".add-count-number");
const body = document.querySelector('body')
const tbody = document.querySelector('tbody')
const tr = tbody.querySelectorAll('tr')
const checkout = document.getElementById("checkout");

for (let i = 0; i < add_count_increase.length; i++) {
    add_count_increase[i].addEventListener('click', (event) => {
        let count_number = parseInt(add_count_number[i].innerText)
        add_count_number[i].innerText = `${count_number + 1}`; 
    })
    add_count_decrease[i].addEventListener('click', (event) => {
        let count_number = parseInt(add_count_number[i].innerText);
        if (count_number != 0) {
          add_count_number[i].innerText = `${count_number - 1}`;
        } else {
          return;
        }
    })
}

checkout.addEventListener('click', (event) => {
    const form_cart = document.createElement('form')
    form_cart.setAttribute('action', '')
    form_cart.setAttribute('method', 'post')
    for (let i = 0; i < tr.length; i++) {
        const product_id_logs = document.createElement("input")
        product_id_logs.setAttribute('type', 'hidden')
        product_id_logs.setAttribute('value','')
        form_cart.appendChild(product_id_logs)
    }
    body.appendChild(form_cart)
})