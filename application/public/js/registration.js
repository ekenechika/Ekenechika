var username = document.forms[0].username.value;
var password = document.forms[0].password.value;
var cpassword = document.forms[0].cpassword.value;

var regex_username = /^[a-zA-Z]\w{2,}$/;
var regex_password = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[/*\-+!@#$^&~\[\]]).{8,}$/;

document.forms[0].username.addEventListener("input", function () {
    var username = document.forms[0].username.value; // Get the value of the input field
    if (!regex_username.test(username)) {
        document.getElementById("username-warning").textContent = "Username must begin with a letter and contain at least 3 alphanumeric characters.";
    } else {
        document.getElementById("username-warning").textContent = "";
    }
});

document.forms[0].password.addEventListener("input", function () {
    var password = document.forms[0].password.value;
    if (!regex_password.test(password)) {
        document.getElementById("password-warning").textContent = "Password must be 8 or more characters and contain at least one uppercase letter, one number, and one special character (/ * - + ! @ # $ ^ & ~ [ ]).";
    } else {
        document.getElementById("password-warning").textContent = "";
    }
});

document.forms[0].cpassword.addEventListener("input", function () {
    var password = document.forms[0].password.value;
    var cpassword = document.forms[0].cpassword.value;
    if (password != cpassword) {
        document.getElementById("cpassword-warning").textContent = "Passwords do not match.";
    } else {
        document.getElementById("cpassword-warning").textContent = "";
    }
});
