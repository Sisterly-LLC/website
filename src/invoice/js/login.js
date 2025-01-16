// scripts/login.js

document.addEventListener("DOMContentLoaded", function () {
    // Get references to DOM elements
    const contactForm = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessages = document.getElementById('form-messages'); // For inline messages

    // Email input elements
    const lastNameInput = document.getElementById('lastName');
    const passwordInput = document.getElementById('passcode');

    /**
     * Validates the entire form.
     * Checks the validity of all input and textarea fields, including CAPTCHA and Email.
     * Enables or disables the submit button based on the validation results.
     * @returns {boolean} True if the entire form is valid, false otherwise.
     */
    function validateForm() {
        // Check overall form validity using HTML5 validation
        const formIsValid = contactForm.checkValidity()

        // Enable or disable the submit button
        submitBtn.disabled = !formIsValid;

        return formIsValid;
    }

    // Attach input event listeners to all form fields for real-time validation
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            validateForm();
        });
    });

    // Initial form validation in case some fields are pre-filled
    validateForm();
});

/**
 * Handles the login form submission.
 * Sends credentials to the backend and processes the response.
 */
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const passcode = document.getElementById('passcode').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const loginMessage = document.getElementById('loginMessage');

    // Clear previous messages
    loginMessage.textContent = '';

    if (!passcode || !lastName) {
        loginMessage.textContent = 'Please enter both passcode and last name.';
        return;
    }

    // Prepare data
    const data = { passcode, lastName };

    try {
        const data = new URLSearchParams({
            lastName: 'Doe',
            passcode: '12345',
        });

        fetch('https://script.google.com/macros/s/AKfycbxRA4rWTwQ-xDibArYs3E-g4QU18q-3pIobrd75Nwnfzf8OlmiaSgNN99RJHDYyyqsAxA/exec?path=login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: data.toString(),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        const result = await response.json();

        if (result.status === 'success') {
            // Save the session token in localStorage
            localStorage.setItem('sessionToken', result.token);

            // Redirect to person-served.html
            window.location.href = 'person-served.html';
        } else {
            // Display error message
            loginMessage.textContent = result.message;
        }
    } catch (error) {
        console.error('Error during login:', error);
        loginMessage.textContent = 'An error occurred. Please try again later.';
    }
});