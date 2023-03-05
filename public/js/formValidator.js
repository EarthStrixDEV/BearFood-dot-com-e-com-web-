const form_register = document.querySelector(".form-register");
const password_strength_label = document.querySelector(
  ".password-strength-lebel"
);
const password_strength_meter = document.querySelector(".password-strength");
const password_strength_meter_level = document.querySelectorAll(".meter")
const email_validator_label = document.querySelector(".email-validator-label");

const username = document.querySelector('.username')
const fname = document.querySelector('.fname')
const lname = document.querySelector('.lname')
const email = document.querySelector('.email')
const password = document.querySelector('.password')

var upperCaseLetter = /[A-Z]/g
var lowerCaseLetters = /[a-z]/g;
var numbers = /[0-9]/g;
var email_letter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

form_register.addEventListener('submit', (event) => {
    event.preventDefault()
    let isEmailError = false;
    let isPasswordError = false;
    if (!email.value.match(email_letter)) {
        email_validator_label.innerHTML = "Email is invalid";
        email_validator_label.style.color = "red";
        isEmailError = true;
    } else {
        email_validator_label.innerHTML = "";
        isEmailError = false;
    }

    if (password.value.length <= 8) {
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
            form_register.submit()
        }, 3000);
    }
})

password.addEventListener('input', (event) => {
    if (event.target.value.length <= 8 && event.target.value.length != 0) {
        password_strength_meter.style.display = "block";
        password_strength_label.innerHTML = "Password must minimum 8 character";
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
          password_strength_label.innerHTML = "Strong";
          for (let i = 0; i < 5; i++) {
            password_strength_meter_level[i].style.backgroundColor = "green";
          }
        } else if (
          event.target.value.match(upperCaseLetter) &&
          event.target.value.match(lowerCaseLetters)
        ) {
          password_strength_label.innerHTML = "Medium";
          for (let i = 0; i < 3; i++) {
            password_strength_meter_level[i].style.backgroundColor = "yellow";
          }
        } else if (
          event.target.value.match(lowerCaseLetters) &&
          event.target.value.match(numbers)
        ) {
          password_strength_label.innerHTML = "Medium";
          for (let i = 0; i < 3; i++) {
            password_strength_meter_level[i].style.backgroundColor = "yellow";
          }
        } else if (
          event.target.value.match(numbers) &&
          event.target.value.match(upperCaseLetter)
        ) {
          password_strength_label.innerHTML = "Medium";
          for (let i = 0; i < 3; i++) {
            password_strength_meter_level[i].style.backgroundColor = "yellow";
          }
        } else {
            password_strength_label.innerHTML = "Weak";
            for (let i = 0; i < 2; i++) {
              password_strength_meter_level[i].style.backgroundColor = "red";
            }
        }
      } 
    } else {
      password_strength_meter.style.display = "none";
      password_strength_label.innerHTML = "";
    }
})
