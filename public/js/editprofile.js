const update_data_form = document.querySelector(
  "form[action='/users/editCustomer']"
);

update_data_form.addEventListener('submit', (event) => {
    event.preventDefault()
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            setTimeout(() => {
                update_data_form.submit()
            },2000)
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
            return false;
        }
    });
    console.log(event.target);
})