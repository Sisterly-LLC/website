// js/contact.js

document.addEventListener("DOMContentLoaded", function () {
    // Get references to DOM elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const hiddenIframe = document.getElementById('hidden_iframe');
    const formMessages = document.getElementById('form-messages'); // For inline messages
    const loadingIndicator = document.getElementById('loading-indicator'); // Loading indicator (ensure it's added in HTML if used)

    // CAPTCHA elements
    const captchaQuestion = document.getElementById('captcha-question');
    const captchaAnswerInput = document.getElementById('captcha-answer');
    const captchaError = document.getElementById('captcha-error');

    // Flag to track form submission
    let submitted = false;

    // Variables to store CAPTCHA values
    let correctCaptchaAnswer = 0;

    /**
     * Function to generate a random integer between min and max (inclusive)
     * @param {number} min 
     * @param {number} max 
     * @returns {number}
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Function to generate a random math question and set the correct answer
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

        let question = `What is ${num1} ${operator} ${num2}?`;
        captchaQuestion.textContent = question;

        // Calculate the correct answer
        if (operator === '+') {
            correctCaptchaAnswer = num1 + num2;
        } else if (operator === '-') {
            correctCaptchaAnswer = num1 - num2;
        }
    }

    /**
     * Function to validate the CAPTCHA answer
     * @returns {boolean}
     */
    function validateCaptcha() {
        const userAnswer = captchaAnswerInput.value.trim();

        if (userAnswer === '') {
            // No answer entered; hide error message and remove classes
            captchaError.style.display = 'none';
            captchaAnswerInput.classList.remove('is-danger');
            captchaAnswerInput.classList.remove('is-success');
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
     * Function to validate the entire form
     * @returns {boolean}
     */
    function validateForm() {
        const inputs = contactForm.querySelectorAll("input, textarea");
        let allValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                allValid = false;
            }
        });

        // Additionally, check CAPTCHA
        if (!validateCaptcha()) {
            allValid = false;
        }

        submitBtn.disabled = !allValid;
        return allValid;
    }

    // Generate CAPTCHA on page load
    generateCaptcha();

    // Attach input event listeners to all form fields for real-time validation
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.addEventListener("input", function () {
            // If the input is the CAPTCHA answer, validate it
            if (input.id === 'captcha-answer') {
                validateCaptcha();
            }
            validateForm();
        });
    });

    // Initial validation on page load in case some fields are already filled
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

        // Show loading indicator (if implemented)
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }

        // Set the submitted flag to true
        submitted = true;
    });

    // Listen for the hidden iframe to load after form submission
    hiddenIframe.addEventListener('load', function () {
        if (submitted) {
            // Hide loading indicator
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }

            // Display inline success message
            if (formMessages) {
                formMessages.innerHTML = '<p style="color:green;">Form submitted successfully!</p>';
            }

            // Reset the form fields
            contactForm.reset();

            // Reset CAPTCHA
            generateCaptcha();

            // Remove success and danger classes from CAPTCHA input
            captchaAnswerInput.classList.remove('is-success');
            captchaAnswerInput.classList.remove('is-danger');

            // Disable the submit button again after reset
            submitBtn.disabled = true;

            // Reset the submitted flag
            submitted = false;
        }
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