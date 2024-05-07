document.getElementById('ContactUsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting via the browser

    var name = document.getElementById('ContactUsName');
    var email = document.getElementById('ContactUsEmail');
    var phone = document.getElementById('ContactUsPhone');
    var terms = document.getElementById('ContactUsTerms');

    // Validate name
    if (name.value === '') {
        document.getElementById('nameError').innerHTML = 'Name is required.';
        return false;
    } else {
        document.getElementById('nameError').innerHTML = '';
    }

    // Validate email
    if (email.value === '') {
        document.getElementById('emailError').innerHTML = 'Email is required.';
        return false;
    } else {
        document.getElementById('emailError').innerHTML = '';
    }

    // Validate phone
    if (phone.value === '') {
        document.getElementById('phoneError').innerHTML = 'Phone number is required.';
        return false;
    } else {
        document.getElementById('phoneError').innerHTML = '';
    }

     // Validate terms
     if (!terms.checked) {
         document.getElementById('termsError').innerHTML = 'You must accept the terms and conditions.';
         return false;
     } else {
         document.getElementById('termsError').innerHTML = '';
     }

     // If all fields are valid, send the form data
     var xhr = new XMLHttpRequest();
     var url = 'https://prod-16.centralindia.logic.azure.com:443/workflows/dbd911b72cd543698e494263419220e4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JaU1DLdatywR6mNIVdaZZ0oaMQpVqdCmD_4xW3U92sY'; // Replace with your URL

     xhr.open('POST', url, true);
     xhr.setRequestHeader('Content-Type', 'application/json');

     xhr.onreadystatechange = function () {
         if (xhr.readyState === 4 && xhr.status === 200) {
             // The request has been processed successfully
             console.log(xhr.responseText);
         }
     };

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

     
     var data = {
         Name: name.value,
         Business_Email: email.value,
         Phone: phone.value,
         Other_Feedback: document.getElementById('ContactUsDesc').value,
         dateTime: formattedDateTime // Current date and time
     };

     xhr.send(JSON.stringify(data));
});

// Add change event listeners to hide error messages
[name, email, phone].forEach(function(field) {
    field.addEventListener('change', function() {
        document.getElementById(field.id + 'Error').innerHTML = '';
    });
});
