/**
 * Checks if the user is authenticated and redirects accordingly.
 */
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('sessionToken');

    if (token) {
        // Optionally, validate the token with the server
        // For simplicity, assume it's valid if present
        window.location.href = 'person-served.html';
    } else {
        window.location.href = 'login.html';
    }
});