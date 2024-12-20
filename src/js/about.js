// about.js

document.addEventListener('DOMContentLoaded', () => {
    // Function to open modal
    function openModal(modal) {
        modal.classList.add('is-active');
    }

    // Function to close modal
    function closeModal(modal) {
        modal.classList.remove('is-active');
    }

    // Get modals
    const stephanieModal = document.getElementById('stephanie-modal');
    const heatherModal = document.getElementById('heather-modal');

    // Get images
    const stephanieImg = document.getElementById('stephanie-img');
    const heatherImg = document.getElementById('heather-img');

    // Get close buttons
    const closeButtons = document.querySelectorAll('.modal-close, .modal-background');

    // Event listeners to open modals
    if (stephanieImg && stephanieModal) {
        stephanieImg.addEventListener('click', () => openModal(stephanieModal));
    }

    if (heatherImg && heatherModal) {
        heatherImg.addEventListener('click', () => openModal(heatherModal));
    }

    // Event listeners to close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (stephanieModal.classList.contains('is-active')) {
                closeModal(stephanieModal);
            }
            if (heatherModal.classList.contains('is-active')) {
                closeModal(heatherModal);
            }
        });
    });

    // Close modal on Esc key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (stephanieModal.classList.contains('is-active')) {
                closeModal(stephanieModal);
            }
            if (heatherModal.classList.contains('is-active')) {
                closeModal(heatherModal);
            }
        }
    });
});