const form = document.getElementById("login-form");

function validate() {

  const username = "Ahsan";
  const password = "Ahsan";

  const inputUsername = document.getElementById("email").value;
  const inputPassword = document.getElementById("pwd").value;

  if (inputUsername === username && inputPassword === password) {
    alert("Authentication successful!");

    window.location.href = "home.html";

    // You could redirect the user to a new page or perform other actions here
  } else {
    alert("Incorrect username or password.");
  }
}




// $(document).ready(function() {
//   $('.view-detailsafterclick').click(function() {
//     $('.product-details').show();
//   });
// });



