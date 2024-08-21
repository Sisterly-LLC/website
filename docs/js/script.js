const words = ["creative.", "brave.", "determined.", "different.", "Sisterly."];



let currentIndex = 0;
const wordElement = document.getElementById('cycling-words');
const duration = 5000; // 5 seconds

function cycleWords() {
    // Fade out
    wordElement.style.transition = 'opacity 2.5s ease-in-out';
    wordElement.style.opacity = 0;

    setTimeout(() => {
        wordElement.textContent = words[currentIndex];

        const wordmarkClass = "wordmark";
        if (currentIndex == 4) {
            wordElement.classList.add(wordmarkClass);
        } else {
            wordElement.classList.remove(wordmarkClass);
        }

        // Fade in
        wordElement.style.transition = 'opacity 2.5s ease-in-out';
        wordElement.style.opacity = 1;

        // Update the word after fade out
        currentIndex += 1;
        if (currentIndex >= words.length) {
            currentIndex = 0; // Reset index if it exceeds the word count
        }
    }, duration / 2); // Timing to match the fade-out duration

    // Schedule the next word change
    setTimeout(cycleWords, duration);
}

// Start the initial animation
setTimeout(cycleWords, duration / 2);
