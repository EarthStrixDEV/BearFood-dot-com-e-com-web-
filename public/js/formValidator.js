const form_register = document.querySelectorAll(".form-register");
const password_strength_label = document.querySelectorAll(
  ".password-strength-lebel"
);
const password_strength_meter = document.querySelectorAll(".password-strength");
const password_strength_meter_level = document.querySelectorAll(".meter")
const email_validator_label = document.querySelectorAll(".email-validator-label");

const username = document.querySelectorAll('.username')
const fname = document.querySelectorAll('.fname')
const lname = document.querySelectorAll('.lname')
const email = document.querySelectorAll('.email')
const password = document.querySelectorAll('.password')

var upperCaseLetter = /[A-Z]/g
var lowerCaseLetters = /[a-z]/g;
var numbers = /[0-9]/g;
var email_letter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

for (let i = 0; i < form_register.length; i++) {
    form_register[i].addEventListener('submit', (event) => {
        event.preventDefault()
        let isEmailError = false;
        let isPasswordError = false;
        if (!email[i].value.match(email_letter)) {
            email_validator_label[i].innerHTML = "Email is invalid";
            email_validator_label[i].style.color = "red";
            isEmailError = true;
        } else {
            email_validator_label[i].innerHTML = "";
            isEmailError = false;
        }
    
        if (password[i].value.length <= 8) {
            isPasswordError = true;
        } else {
            isPasswordError = false;
        }
    
        if (isEmailError || isPasswordError) {
            Swal.fire({
                icon: "error",
                title: "Register Failed",
                text: "Something went wrong in form!",
            });
            return false;
        } else {
            Swal.fire({
                icon: "success",
                title: "Register Success!",
                text: "You have registered Member!"
            })
            setTimeout(() => {
                form_register[i].submit()
            }, 3000);
        }
    })
}

password[0].addEventListener('input', (event) => {
    if (event.target.value.length <= 8 && event.target.value.length != 0) {
        password_strength_meter[0].style.display = "block";
        password_strength_label[0].innerHTML = "Password must minimum 8 character";
        for (let i = 0; i < 5; i++) {
            password_strength_meter_level[i].style.backgroundColor = "#33333324";
        }
    } else if (event.target.value.length >= 8) {
      if (
        event.target.value.match(upperCaseLetter) ||
        event.target.value.match(lowerCaseLetters) ||
        event.target.value.match(numbers)
      ) {
        if (
          event.target.value.match(upperCaseLetter) &&
          event.target.value.match(lowerCaseLetters) &&
          event.target.value.match(numbers)
        ) {
          password_strength_label[0].innerHTML = "Strong";
          for (let i = 0; i < 5; i++) {
            password_strength_meter_level[i].style.backgroundColor = "green";
          }
        } else if (
          event.target.value.match(upperCaseLetter) &&
          event.target.value.match(lowerCaseLetters)
        ) {
          password_strength_label[0].innerHTML = "Medium";
          for (let i = 0; i < 3; i++) {
            password_strength_meter_level[i].style.backgroundColor = "yellow";
          }
        } else if (
          event.target.value.match(lowerCaseLetters) &&
          event.target.value.match(numbers)
        ) {
          password_strength_label[0].innerHTML = "Medium";
          for (let i = 0; i < 3; i++) {
            password_strength_meter_level[i].style.backgroundColor = "yellow";
          }
        } else if (
          event.target.value.match(numbers) &&
          event.target.value.match(upperCaseLetter)
        ) {
          password_strength_label[0].innerHTML = "Medium";
          for (let i = 0; i < 3; i++) {
            password_strength_meter_level[i].style.backgroundColor = "yellow";
          }
        } else {
            password_strength_label[0].innerHTML = "Weak";
            for (let i = 0; i < 2; i++) {
              password_strength_meter_level[i].style.backgroundColor = "red";
            }
        }
      } 
    } else {
      password_strength_meter[0].style.display = "none";
      password_strength_label[0].innerHTML = "";
    }
})
password[1].addEventListener('input', (event) => {
    if (event.target.value.length <= 8 && event.target.value.length != 0) {
        password_strength_meter[1].style.display = "block";
        password_strength_label[1].innerHTML = "Password must minimum 8 character";
        for (let i = 5; i < 10; i++) {
            password_strength_meter_level[i].style.backgroundColor = "#33333324";
        }
    } else if (event.target.value.length >= 8) {
      if (
        event.target.value.match(upperCaseLetter) ||
        event.target.value.match(lowerCaseLetters) ||
        event.target.value.match(numbers)
      ) {
        if (
          event.target.value.match(upperCaseLetter) &&
          event.target.value.match(lowerCaseLetters) &&
          event.target.value.match(numbers)
        ) {
          password_strength_label[1].innerHTML = "Strong";
          for (let i = 5; i < 10; i++) {
            password_strength_meter_level[i].style.backgroundColor = "green";
          }
        } else if (
          event.target.value.match(upperCaseLetter) &&
          event.target.value.match(lowerCaseLetters)
        ) {
          password_strength_label[1].innerHTML = "Medium";
          for (let i = 5; i < 8; i++) {
            password_strength_meter_level[i].style.backgroundColor = "yellow";
          }
        } else if (
          event.target.value.match(lowerCaseLetters) &&
          event.target.value.match(numbers)
        ) {
          password_strength_label[1].innerHTML = "Medium";
          for (let i = 5; i < 8; i++) {
            password_strength_meter_level[i].style.backgroundColor = "yellow";
          }
        } else if (
          event.target.value.match(numbers) &&
          event.target.value.match(upperCaseLetter)
        ) {
          password_strength_label[1].innerHTML = "Medium";
          for (let i = 5; i < 8; i++) {
            password_strength_meter_level[i].style.backgroundColor = "yellow";
          }
        } else {
            password_strength_label[1].innerHTML = "Weak";
            for (let i = 5; i < 7; i++) {
              password_strength_meter_level[i].style.backgroundColor = "red";
            }
        }
      } 
    } else {
      password_strength_meter[1].style.display = "none";
      password_strength_label[1].innerHTML = "";
    }
})
