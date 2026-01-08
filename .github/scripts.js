
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const bookingForm = document.getElementById("BookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const guests = document.getElementById("guests").value;

    let isValid = true;

    if (name.length < 3) {
      showError("nameError", "Please enter at least 3 characters.");
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError("emailError", "Please enter a valid email address.");
      isValid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      showError("phoneError", "Please enter a 10-digit phone number.");
      isValid = false;
    }

    if (!date) {
      showError("dateError", "Please choose a date.");
      isValid = false;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(date);
      if (selectedDate < today) {
        showError("dateError", "Date cannot be in the past.");
        isValid = false;
      }
    }

    if (!time) {
      showError("timeError", "Please select a time.");
      isValid = false;
    }

    const guestsNum = parseInt(guests, 10);
    if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 20) {
      showError("guestsError", "Guests must be between 1 and 20.");
      isValid = false;
    }

    if (isValid) {
      document.getElementById("formSuccess").textContent =
        "Thank you! Your booking request has been submitted.";
      bookingForm.reset();
    }
  });
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
  });
  const success = document.getElementById("formSuccess");
  if (success) success.textContent = "";
}

function showError(id, message) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = message;
  }
}
