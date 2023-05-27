document.getElementById("username").addEventListener("input", function(ev){
    let userInput = ev.currentTarget;
    let username = userInput.value;
    if (username.length >= 3) {
        console.log('valid');
    }else{
        console.log('invalid');
    }
})
document.getElementById("email").addEventListener("input", function(ev){
    let userInput = ev.currentTarget;
    let email = userInput.value;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        console.log('valid');
    }else{
        console.log('invalid');
    }
})

document.getElementById("password").addEventListener("input", function(ev){
    let userInput = ev.currentTarget;
    let password = userInput.value;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (passwordRegex.test(password)) {
        console.log('valid');
    }else{
        console.log('invalid');
    }
})

document.getElementById("confirmPassword").addEventListener("input", function(ev){
    let userInput = ev.currentTarget;
    let confirmPassword = userInput.value;
    let password = document.getElementById("password").value;
    if (confirmPassword === password) {
        console.log('match');
    }else{
        console.log('not match');
    }
})
document.getElementById("age").addEventListener("input", function(ev){
    let userInput = ev.currentTarget;
    let age = parseInt(userInput.value);
    if (isNaN(age) || age < 13) {
        console.log('invalid age');
    } else {
        console.log('valid age');
    }
});

document.getElementById("tos").addEventListener("click", function(ev){
    let checkbox = ev.currentTarget;
    if (!checkbox.checked) {
        console.log('You must agree to the TOS');
    } else {
        console.log('TOS agreed');
    }
});

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
}

function isValidConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}
