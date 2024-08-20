const words = ["creative", "brave", "determined", "different"];
let currentIndex = 0;

function cycleWords() {
    const wordElement = document.getElementById('cycling-words');

    // Start fade out animation
    wordElement.style.opacity = 0;

    // Change word after fade out is complete
    setTimeout(() => {
        wordElement.textContent = words[currentIndex];
        currentIndex = (currentIndex + 1);
        if (currentIndex > words.length - 1) {
            currentIndex = 0;
        }

        // Start fade in animation
        wordElement.style.opacity = 1;
    }, 2500); // Change the word after 2.5 seconds
}

cycleWords();
setInterval(cycleWords, 5000);
