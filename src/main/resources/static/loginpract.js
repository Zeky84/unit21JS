
var submitBtn = document.querySelector("#submitBtn");
var registerBtn = document.querySelector("#registerBtn");

var usernameTextBox = document.querySelector("#username");
var passwordTextBox = document.querySelector("#password");

submitBtn.addEventListener("click", () => { // same like inline function but with equivalent of lambda expression
  if (usernameTextBox.value == "" && passwordTextBox.value == "") {
    alert("Please enter username and password");
  } else if (usernameTextBox.value == "" && passwordTextBox.value != "") {
    alert("Please enter username");
  } else if (usernameTextBox.value != "" && passwordTextBox.value == "") {
    alert("Please enter password");
  } else {
    fetch(`http://localhost:8080/users/exists?username=${usernameTextBox.value}&password=${encodeURIComponent(passwordTextBox.value)}`)
      .then(function (response) {
        console.log(response);
        return response.json(); // this return the body of the response(takes the whole body and return it as a JSON object)
      })
      .then(function (data) { // this holds values true or false and is related to the response.json() above
        console.log(data);
        if (data == true) {
          alert("User exists. Welcome back " + usernameTextBox.value + " !");
        } else {
          alert("User does not exist or have a wrong password. Please register first");
        }
      })
  };
});
registerBtn.addEventListener('click', () => {
  var user = { // this is a JSON object to be added to the body of the request
    'username': usernameTextBox.value,
    'password': passwordTextBox.value,
  };
  if (usernameTextBox.value == "" && passwordTextBox.value == "") {
    alert("Please create username and password");
  } else if (usernameTextBox.value == "" && passwordTextBox.value != "") {
    alert("Please create username");
  } else if (usernameTextBox.value != "" && passwordTextBox.value == "") {
    alert("Please create password");
  } else {
    if (
      passwordTextBox.value.length >= 8 &&        // Requires at least 8 characters
      /[A-Z]/.test(passwordTextBox.value) &&                   // Requires at least one uppercase letter
      /[a-z]/.test(passwordTextBox.value) &&                   // Requires at least one lowercase letter
      /\d/.test(passwordTextBox.value) &&                      // Requires at least one digit
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password) // Requires at least one symbol
    ) {fetch(`http://localhost:8080/users/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user), // this is the body of the request
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          if (data == true) {
            alert("User created successfully");
          } else {
            alert("Username already exists. Find another one");
          }
        })
    } else {
      alert(
        "Password must be at least 8 characters long, contain at least one uppercase"+
         "letter, one lowercase letter, one digit, and one symbol." +"<<<"+
         `${passwordTextBox.value}`+ ">>>"+"is not a valid password"
      );
    }
  }
});