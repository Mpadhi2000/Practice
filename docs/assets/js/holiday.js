// script.js
var checkboxes = document.querySelectorAll("input[type=checkbox]");
var thanksContent = document.getElementById("thanks-content");
var msg = document.getElementById("msg-content");
function enableSelect(checkId, selectId) {
  var checkBox = document.getElementById(checkId);
  var select = document.getElementById(selectId);
  select.disabled = !checkBox.checked;

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].id != checkId) {
      checkboxes[i].checked = false;
    }
  }

  if (checkBox.checked && checkId === "check1") {
    msg.textContent =
      "You’ll recieve the Amazon Gift Card on your email within 2 business days.";
    thanksContent.textContent =
      "You’ll recieve the Amazon Gift Card on your email within 2 business days.";
  } else if (checkBox.checked && checkId === "check2") {
    msg.textContent =
      "You’ll recieve a confirmation of the donation along with the receipt on your email within 2 business days.";
    thanksContent.textContent =
      "You’ll recieve a confirmation of the donation along with the receipt on your email within 2 business days.";
    var event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    console.log("slect dis", select.disabled);
    select.dispatchEvent(event);
  } else {
    msg.textContent = "";
    thanksContent.textContent = "";
  }
}

$(document).ready(function () {
  // $("#myForm").on('submit', function(e){
  //     e.preventDefault();
  //     $("#myModal").modal('show');
  // });

  $("#myForm").on("submit", async function (event) {
    var check1 = $("#check1").is(":checked");
    var check2 = $("#check2").is(":checked");
    var select2 = $("#select2").val();
    var select1 = $("#select1").val();
    var name = $("#name").val();
    var email = $("#email").val();

    console.log("tets", check2, select2, select2 == null);
    if (!check1 && !check2) {
      msg.textContent = "Please select at least one option.";
      event.preventDefault();
      return;
    } else if (check2 && select2 == null) {
      msg.textContent = "Please select a charity for the donation.";
      event.preventDefault();
      return;
    }

    var currentDate = new Date();

    // Extract the different components of the date and time
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    var day = currentDate.getDate();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    // Format the components as desired
    var formattedDateTime =
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    // Output the formatted date and time
    console.log("Current Date and Time: " + formattedDateTime);
    let resp = null;

    if (check1) {
    console.log("resp",resp,select1);

      resp = "I opt for a personal Amazon Gift Card";
    }

    if (check2) {
      console.log("resp",resp,select2);

      resp = select2;
    }
    console.log("resp",resp);
    const state = await sendEmail(formattedDateTime, email, resp, name)
    console.log(state);
    if (state) {
      event.preventDefault();
      $("#myModal").modal("show");
    }else{
      alert("Something went wrong!")
    }
  });
});

async function sendEmail(dateTime, email, responseType, name) {
  // Set the request URL.
  const url = "https://prod-16.centralindia.logic.azure.com:443/workflows/11fdf70b1d234c59b1dd91e4f6ae3870/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wJ14uG-GyoXVwZWf3XDvEkB7eDDlYwpPzgEEmukkHsE";

  // Set the request headers.
  const headers = {
    "Content-Type": "application/json; charset=UTF-8"
  };

  // Set the request body.
  const data = JSON.stringify({
    dateTime: dateTime,
    email: email,
    responseType: responseType,
    name: name,
  });

  try {
    // Send the request.
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: data
    });

    // Check the response status code.
    if (response.status == 201 || response.status == 202) {
      console.log("email sent successfully");
      return true;
    } else {
      console.log("error occurred in sending mail");
      return false;
    }
  } catch (error) {
    console.error("Fetch error: ", error);
    return false;
  }
}


// function sendEmail(dateTime, email, responseType, name) {
//   // Create a new XMLHttpRequest object.
//   var xhr = new XMLHttpRequest();

//   // Set the request method to POST.
//   xhr.open(
//     "POST",
//     "https://prod-15.centralindia.logic.azure.com:443/workflows/11a32a7741ba4320a31d6170633d36ab/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=iOdyunhGSRNFBJ4hvHh8kzGj4J4Cq4Nz2B5uwvAJuaE"
//   );

//   // Set the request headers.
//   xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

//   var data = JSON.stringify({
//     dateTime: dateTime,
//     email: email,
//     responseType: responseType,
//     name: name,
//   });

//   // Send the request.
//   xhr.send(data);

//   xhr.onload = function () {
//     if (xhr.status == 201 || xhr.status == 202) {
//       console.log("email sent successfully");
//       return true;
//     } else {
//       console.log("error occurred in sending mail");
//       return false;
//     }
//   };
// }
// // Get the modal
// var modal = document.getElementById("myModal1");
// var close1 = document.getElementById("close1");

// Function to close the modal
function closeModal() {
  console.log("Button clicked");
  resetForm();
  $("#myModal").modal("hide");
}

function resetForm(){
  $('#name').val('');
  $('#email').val('');
  $('#check1').prop('checked', false);
  $('#check2').prop('checked', false);
  $('#select1').prop('selectedIndex', 0);
  $('#select2').prop('selectedIndex', 0);
}
// // Function to open the modal
// function openModal() {
//   modal.style.display = "block";
//   close1.addEventListener('click',closeModal)

// }

// // Function to make API call
// function callApiAndOpenModal() {
//   // fetch('https://api.example.com/data') // replace with your API endpoint
//   //   .then(response => response.json())
//   //   .then(data => {
//   //     console.log(data); // process your data here
//   //     openModal();
//   //   })
//   //   .catch((error) => {
//   //     console.error('Error:', error);
//   //   });
//     openModal();

// }

// // Update form submission handler
// document.getElementById('myForm').addEventListener('submit', function(event) {
//   event.preventDefault();
//   callApiAndOpenModal();
// });
