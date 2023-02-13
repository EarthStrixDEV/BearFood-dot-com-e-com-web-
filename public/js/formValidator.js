const form_register = document.querySelector(".form-register");
const password_strength_label = document.querySelector(
  ".password-strength-lebel"
);
const password_strength_meter = document.querySelector(".password-strength");
const password_strength_meter_level = document.querySelectorAll(".meter")
const email_validator_label = document.querySelector(".email-validator-label");

const user_username = document.querySelector('#user_username')
const user_fname = document.querySelector('#user_fname')
const user_lname = document.querySelector('#user_lname')
const user_email = document.querySelector('#user_email')
const user_password = document.querySelector('#user_password')

var upperCaseLetter = /[A-Z]/g
var lowerCaseLetters = /[a-z]/g;
var numbers = /[0-9]/g;
var email_letter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

form_register.addEventListener('submit', (event) => {
    let isError = false;
    if (!user_email.value.match(email_letter)) {
        email_validator_label.innerHTML = "Email is invalid";
        email_validator_label.style.color = 'red';
        isError = true;
    } else {
        email_validator_label.innerHTML = "";
        isError = false;
    }   

    if (user_password.value.length <= 8) {
        alert("Password must minimum 8 character")
        isError = true;
    } else {
        isError = false;
    }

    if (isError) {
        alert("Have something wrong in form!")
    } else {
        alert("Form has submitted!")
    }
})

user_password.addEventListener('input', (event) => {
    if (event.target.value.length <= 8 && event.target.value.length != 0) {
        password_strength_meter.style.display = "block";
        password_strength_label.innerHTML = "Password must minimum 8 character";
        for (let i = 0; i < password_strength_meter_level.length; i++) {
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
          for (let i = 0; i < password_strength_meter_level.length; i++) {
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