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
const checkout = document.getElementById("check-out");
const clear_cart = document.getElementById("delete-cart")

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

checkout.addEventListener('submit', (event) => {
    event.preventDefault()
    Swal.fire({
        title: "Do you want to checked out the cart?",
        showCancelButton: true,
        confirmButtonText: "Done",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Checked-Out!", "", "success");
            setTimeout(() => {
                checkout.submit()
            },2000)
        }
    });
})

clear_cart.addEventListener('submit', (event) => {
    event.preventDefault()
    Swal.fire({
        title: "Are you sure?",
        text: "All items have removed from list!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setTimeout(() => {
                clear_cart.submit();
            }, 2000);
        }
    });
})