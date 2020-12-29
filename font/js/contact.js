const messageError = document.querySelector(".error-message");
const contactForm = document.querySelector("#form");

// get value from the form

const getInputValue = (id) => {
  return document.getElementById(id).value;
};

const submitMessage = () => {
  let name = getInputValue("name");
  let email = getInputValue("email");
  let message = getInputValue("message");
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', message);
  fetch('/', {
    method: 'POST',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  }).then(() => {
      document.querySelector(".alert").style.display = "block";
       setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
  }, 3000);
  contactForm.reset();
  }).catch((error) =>
    alert(error))
};
// save a message

// Validate form

const validateForm = (e) => {
  e.preventDefault();
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (getInputValue("name").trim() === "") {
    messageError.style.display = "block";
    messageError.textContent = "name can not be empty";
    document.getElementById("name").style.border = "2px solid red";
    setTimeout(() => {
      messageError.style.display = "none";
    }, 3000);
    return false;
  } else if (getInputValue("name").trim().length < 3) {
    messageError.style.display = "block";
    messageError.textContent = "name must be at least 3 characters";
    document.getElementById("name").style.border = "2px solid red";
    setTimeout(() => {
      messageError.style.display = "none";
    }, 3000);

    return false;
  } else if (!getInputValue("email").trim().match(mailformat)) {
    messageError.style.display = "block";
    messageError.textContent = "You have entered an invalid email address!";
    document.getElementById("email").style.border = "2px solid red";

    setTimeout(() => {
      messageError.style.display = "none";
    }, 3000);

    return false;
  } else if (getInputValue("message").trim() === "") {
    messageError.style.display = "block";
    messageError.textContent = "message can not be empty";
    document.getElementById("message").style.border = "2px solid red";

    setTimeout(() => {
      messageError.style.display = "none";
    }, 3000);
    return false;
  } else if (getInputValue("message").trim().length < 30) {
    messageError.style.display = "block";
    messageError.textContent = "message must be at least 30 characters";
    document.getElementById("message").style.border = "2px solid red";

    setTimeout(() => {
      messageError.style.display = "none";
    }, 3000);
    return false;
  } else {
    submitMessage();
    document.getElementById("name").style.border = "0px solid red";
    document.getElementById("email").style.border = "0px solid red";
    document.getElementById("message").style.border = "0px solid red";

    return true;
  }
};
contactForm.addEventListener("submit", validateForm);