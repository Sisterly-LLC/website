// js/contact.js

document.addEventListener("DOMContentLoaded", function () {
    // Get references to DOM elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const hiddenIframe = document.getElementById('hidden_iframe');
    const formMessages = document.getElementById('form-messages'); // For inline messages

    // CAPTCHA elements
    const captchaQuestion = document.getElementById('captcha-question');
    const captchaAnswerInput = document.getElementById('captcha-answer');
    const captchaError = document.getElementById('captcha-error');

    // Email input elements
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');

    // Flag to track form submission
    let submitted = false;

    // Variable to store the correct CAPTCHA answer
    let correctCaptchaAnswer = 0;

    /**
     * Generates a random integer between min and max (inclusive).
     * @param {number} min - The minimum integer.
     * @param {number} max - The maximum integer.
     * @returns {number} A random integer between min and max.
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generates a random math CAPTCHA question and sets the correct answer.
     */
    function generateCaptcha() {
        let num1 = getRandomInt(1, 10);
        let num2 = getRandomInt(1, 10);
        const operators = ['+', '-'];
        const operator = operators[getRandomInt(0, operators.length - 1)];

        // Ensure no negative results for subtraction
        if (operator === '-' && num2 > num1) {
            [num1, num2] = [num2, num1]; // Swap to make num1 >= num2
        }

        const question = `What is ${num1} ${operator} ${num2}?`;
        captchaQuestion.textContent = question;

        // Calculate the correct answer
        correctCaptchaAnswer = operator === '+' ? num1 + num2 : num1 - num2;
    }

    /**
     * Validates the CAPTCHA answer.
     * Displays an error message only if the user has entered an answer and it's incorrect.
     * @returns {boolean} True if the CAPTCHA is valid, false otherwise.
     */
    function validateCaptcha() {
        const userAnswer = captchaAnswerInput.value.trim();

        if (userAnswer === '') {
            // No answer entered; hide error message and remove validation classes
            captchaError.style.display = 'none';
            captchaAnswerInput.classList.remove('is-danger', 'is-success');
            return false; // Field is required
        }

        const parsedAnswer = parseInt(userAnswer, 10);

        if (parsedAnswer === correctCaptchaAnswer) {
            // Correct answer
            captchaError.style.display = 'none';
            captchaAnswerInput.classList.remove('is-danger');
            captchaAnswerInput.classList.add('is-success');
            return true;
        } else {
            // Incorrect answer
            captchaError.style.display = 'block';
            captchaAnswerInput.classList.remove('is-success');
            captchaAnswerInput.classList.add('is-danger');
            return false;
        }
    }

    /**
     * Validates the email input field.
     * Adds or removes visual feedback based on the validity of the email.
     * Only marks as error if the field is populated and invalid.
     * @returns {boolean} True if the email is valid or empty, false otherwise.
     */
    function validateEmail() {
        const emailValue = emailInput.value.trim();

        if (emailValue === '') {
            // Email field is empty; remove validation classes and hide error message
            emailInput.classList.remove('is-danger', 'is-success');
            emailError.style.display = 'none';
            return false; // Field is required
        }

        if (emailInput.validity.valid) {
            // Valid email
            emailInput.classList.remove('is-danger');
            emailInput.classList.add('is-success');
            emailError.style.display = 'none';
            return true;
        } else {
            // Invalid email
            emailInput.classList.remove('is-success');
            emailInput.classList.add('is-danger');
            emailError.style.display = 'block';
            return false;
        }
    }

    /**
     * Validates the entire form.
     * Checks the validity of all input and textarea fields, including CAPTCHA and Email.
     * Enables or disables the submit button based on the validation results.
     * @returns {boolean} True if the entire form is valid, false otherwise.
     */
    function validateForm() {
        // Validate individual fields
        const isEmailValid = validateEmail();
        const isCaptchaValid = validateCaptcha();

        // Check overall form validity using HTML5 validation
        const formIsValid = contactForm.checkValidity() && isEmailValid && isCaptchaValid;

        // Enable or disable the submit button
        submitBtn.disabled = !formIsValid;

        return formIsValid;
    }

    // Generate CAPTCHA on page load
    generateCaptcha();

    // Attach input event listeners to all form fields for real-time validation
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            if (input.id === 'captcha-answer') {
                validateCaptcha();
            }
            if (input.id === 'email') {
                validateEmail();
            }
            validateForm();
        });
    });

    // Initial form validation in case some fields are pre-filled
    validateForm();

    // Handle form submission
    contactForm.addEventListener("submit", function (e) {
        // Prevent form submission if CAPTCHA is incorrect
        if (!validateCaptcha()) {
            e.preventDefault();
            captchaError.style.display = 'block';
            captchaAnswerInput.classList.add('is-danger');
            return;
        }

        // Optionally, you can add a loading indicator here if desired
        // Example:
        // submitBtn.textContent = 'Sending...';
        // submitBtn.disabled = true;
    });

    // Listen for the hidden iframe to load after form submission
    hiddenIframe.addEventListener('load', function () {
        if (submitted) {
            // Display inline success message
            if (formMessages) {
                formMessages.innerHTML = '<p style="color:green;">Form submitted successfully!</p>';
            }

            // Reset the form fields
            contactForm.reset();

            // Reset CAPTCHA
            generateCaptcha();

            // Remove validation classes from CAPTCHA and Email inputs
            captchaAnswerInput.classList.remove('is-success', 'is-danger');
            captchaError.style.display = 'none';

            emailInput.classList.remove('is-success', 'is-danger');
            emailError.style.display = 'none';

            // Disable the submit button again after reset
            submitBtn.disabled = true;

            // Reset the submitted flag
            submitted = false;
        }
    });

    // Optional: Track form submission
    contactForm.addEventListener("submit", function (e) {
        submitted = true;
    });

    // Scroll to contact section when CTA button is clicked
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function (event) {
            event.preventDefault();
            const contactSection = document.querySelector('#contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});