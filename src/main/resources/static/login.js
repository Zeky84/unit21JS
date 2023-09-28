// we moved script here to the bottom of the page so that the DOM is loaded before we try to access it
var submitBtn = document.querySelector("#submitBtn");
//   console.log(`submitBtn is ${submitBtn}`);
//   console.log(submitBtn);
//   submitBtn.addEventListener("click", submitBtnClick);
//   submitBtn.addEventListener("mouseover", function () {
//     //this function does not have a name because is an inline function
//     alert("mouse over");
//   });

//   function submitBtnClick() {
//     // this function has name because is an independent function
//     alert("button clicked by the user");
//   }

//   var usernameTextBox = document.querySelector("#username");
//   usernameTextBox.addEventListener("focus", function () { // this when the user clicks on the usernameTextBox
//     console.log("usernameTextBox has focus");
//   });
var users = []; // this is an array of JSON objects or var users = new Array();
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
    console.log("Input is valid, procced with form submission");
    var user = {// this is a JSON object
      'username': usernameTextBox.value,
      'password': passwordTextBox.value,
    };
    users.push(user);
    console.log(users);
  }

});
usernameTextBox.addEventListener('blur', () => { // blur means when having marked the usernameTextBox and then click somewhere else outside of the usernameTextBox
  //------------ THE CODE BELOW IS FOR THE FETCH API WHEN DOING GET REQUEST ----------------
  //    fetch(`http://localhost:8080/users/exists?username=${usernameTextBox.value}&password=${passwordTextBox.value}`)
  //    .then(function(response) {
  //      console.log(response);
  //        return response.json(); // this return the body of the response(takes the whole body and return it as a JSON object)
  //    })
  //    .then(function(data) { // this holds values true or false and is related to the response.json() above
  //      console.log(data);
  //      if (data == true) {
  //        alert("User exists");
  //      } else {
  //        alert("User does not exist");
  //      }
  //    })
  //----------------------------------------------------------------------------------------------------------------
  //------------ THE CODE BELOW IS FOR THE FETCH API WHEN DOING POST REQUEST ----------------
  var user = { // this is a JSON object to be added to the body of the request
    'username': usernameTextBox.value,
    'password': passwordTextBox.value,
    };
  fetch(`http://localhost:8080/users/exists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user), // this is the body of the request
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
});