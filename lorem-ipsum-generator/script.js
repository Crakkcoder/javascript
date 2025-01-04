function generateLorem() {
    const numberOfParagraphs = document.getElementById('paragraphs').value;
    const loremContainer = document.getElementById('lorem-text');
    
    // An array of Lorem Ipsum sentences
    const loremSentences = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ];

    let loremText = '';
    for (let i = 0; i < numberOfParagraphs; i++) {
        let paragraph = '';
        // Add a random number of sentences for each paragraph
        const sentenceCount = Math.floor(Math.random() * 5) + 5; // Between 5 and 10 sentences per paragraph
        for (let j = 0; j < sentenceCount; j++) {
            paragraph += loremSentences[Math.floor(Math.random() * loremSentences.length)] + ' ';
        }
        loremText += `<p>${paragraph.trim()}</p>`;
    }
    
    loremContainer.innerHTML = loremText;
}
