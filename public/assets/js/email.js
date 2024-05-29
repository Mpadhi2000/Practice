function sendEmail(dateTime, email, caseStudy) {
  // Create a new XMLHttpRequest object.
  var xhr = new XMLHttpRequest();

  // Set the request method to POST.
  xhr.open(
    "POST",
    "https://prod-20.centralindia.logic.azure.com:443/workflows/7fd2c14c6621486793da99fdd9b395db/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RgBmh4PTUZcu6Q9citwQd7Jje2AfMW8GJ0rcjudo8QQ"
  );

  // Set the request headers.
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

  var data = JSON.stringify({
    dateTime: dateTime,
    email: email,
    caseStudy: caseStudy,
  });

  // Send the request.
  xhr.send(data);

  // Check the response status code.
  if (xhr.status === 201 || xhr.status === 202) {
    console.log("email sent successfully");
    // The email was sent successfully.
    return true;
  }
  // The email was not sent successfully.
  console.log("error occured in sending mail");
  return false;
}

$(document).ready(function () {
  // Open the modal programmatically
  $("#subscribeLink").click(function () {
    $("#subscribeModal").modal("show");
  });

  $("#subscribeLinkReport").click(function () {
    $("#subscribeModal").modal("show");
  });

  // Handle form submission
  $("#subscribeForm").submit(function (event) {
    event.preventDefault(); // Prevent form from submitting

    // Get the email value
    var email = $("#emailInput").val();

    // Validate email address
    if (!validateEmail(email)) {
      displayErrorMessage("Please enter a valid email address.");
      return;
    }
    var emailDomain = email.split("@")[1].split(".")[0].toLowerCase();
    console.log(emailDomain);
    if (!isValidOrganizationEmail(emailDomain)) {
      displayErrorMessage("Please enter a valid organization email.");
      return;
    }
    // Get the current page URL
    var pageUrl = window.location.href;

    // Extract the last part of the URL and remove the ".html" extension
    var pageName = pageUrl.split("/").pop().replace(".html", "");

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

    sendEmail(formattedDateTime, email, pageName);

    // Define the PDF URLs based on the page name
    var pdfUrl = "";

    switch (pageName) {
      // case "vonage-casestudy":
      //   pdfUrl = "assets/downloads/VonageOverallCaseStudy.pdf";
      //   break;
      case "vonage-optimization":
        pdfUrl = "assets/downloads/Vonage-ResponsePointCaseStudy-B2B Data.pdf";
        break;
      case "atlas-casestudy":
        pdfUrl = "assets/downloads/Atlas-ResponsePoint-Case-Study-SQL.pdf";
        break;
      case "lead-qualification-roi":
        pdfUrl = "assets/downloads/LeadQualification_ROI.pdf";
        break;
      case "strong-b2b-leads":
        pdfUrl = "assets/downloads/Strong_B2B_Leads.pdf";
        break;
      case "telemarketing-roi":
        pdfUrl = "assets/downloads/Telemarketing_ROI.pdf";
        break;
      case "telemarketing-sale":
        pdfUrl = "assets/downloads/Telemarketing_Sale.pdf";
        break;
      // case "symantec-casestudy":
      //   pdfUrl = "assets/downloads/SymantecCaseStudy.pdf";
      //   break;
      // case "intuit-casestudy":
      //   pdfUrl = "assets/downloads/IntuitCaseStudy.pdf";
      //   break;
      // case "cyberinc-casestudy":
      //   pdfUrl = "assets/downloads/CyberIncCaseStudy.pdf";
      //   break;
      case "komprise-casestudy":
        pdfUrl =
          "assets/downloads/Komprise-ResponsePointCaseStudy-CRM-Tech-Platform.pdf";
        break;
      case "reports":
        pdfUrl =
          "assets/downloads/2024-The-State-of-B2B-LeadGen-Benchmark-Report-by-ResponsePoint.pdf";
        break;
      default:
        pdfUrl = "";
        break;
    }

    // Open the PDF file in a new tab/window
    window.open(pdfUrl, "_blank");
    // Close the modal
    $("#subscribeModal").modal("hide");
    resetModal();
  });

  // Display the error message
  function displayErrorMessage(message) {
    $("#emailInput").addClass("is-invalid");
    $("#errorContainer").text(message);
    $("#errorContainer").show();
  }
  // Email validation function
  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Check if the email domain is valid
  function isValidOrganizationEmail(domain) {
    return !genericEmails.includes(domain);
  }

  // Reset input field and hide error message
  function resetModal() {
    $("#emailInput").val("");
    $("#emailInput").removeClass("is-invalid");
    $("#errorContainer").text(""); // Clear the error message text
    $("#errorContainer").hide();
  }

  // Event listener for input change
  $("#emailInput").on("input", function () {
    $("#emailInput").removeClass("is-invalid");
    $("#errorContainer").text(""); // Clear the error message text
    $("#errorContainer").hide();
  });

  // Event listener for modal close
  $("#subscribeModal").on("hidden.bs.modal", function () {
    resetModal();
  });
});

var genericEmails = [
  "gmail",
  "yahoo",
  "hotmail",
  "aol",
  "msn",
  "wanadoo",
  "orange",
  "comcast",
  "live",
  "rediffmail",
  "free",
  "gmx",
  "web",
  "yandex",
  "ymail",
  "libero",
  "outlook",
  "uol",
  "bol",
  "mail",
  "cox",
  "sbcglobal",
  "sfr",
  "verizon",
  "googlemail",
  "ig",
  "bigpond",
  "terra",
  "neuf",
  "alice",
  "rocketmail",
  "att",
  "laposte",
  "facebook",
  "bellsouth",
  "charter",
  "rambler",
  "tiscali",
  "shaw",
  "sky",
  "earthlink",
  "optonline",
  "freenet",
  "t-online",
  "aliceadsl",
  "virgilio",
  "home",
  "qq",
  "telenet",
  "me",
  "voila",
  "planet",
  "tin",
  "ntlworld",
  "arcor",
  "frontiernet",
  "hetnet",
  "zonnet",
  "club-internet",
  "juno",
  "optusnet",
  "blueyonder",
  "bluewin",
  "skynet",
  "sympatico",
  "windstream",
  "mac",
  "centurytel",
  "chello",
  "aim",
];
