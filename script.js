const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);

const correctLetters = ['w', 'i', 'a', 'r', 'd'];
const wrongLetters = [];

function displayWord() {
    //deklariere das neue Wort
    wordEl.innerHTML =
        ` 
    ${selectedWord //nehme das ausgewählte Wort
            .split('') //mach ein Char-Array draus
            .map( //mit den Elementen im Char-Array passiert folgendes
                letter => //für jedes Element im Char-Array printe folgendes:
                    `
            <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''} 
            </span> 
            `//füge ein span ein, in dem Span soll folgender Inhalt sein:
                //gucke im Array correctLetters, prüfe, ob der Buchstabe aus dem Char-Array im correctLetters enthalten ist. Wenn ja, dann printe ihn, sonst printe ein leeres Zeichen. An sich wird quasi das korrekte Wort schon geprinted, also jedes Zeichen ist schon an der richtigen Stelle. Das Char selbst wird nur richtig gezeigt, wenn das If-Statement true ist. 
            )
            .join('')}
`;
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    console.log(innerWord);
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congrats, you won!';
        popup.style.display = 'flex';
    }
}

//Update the wrong letters
function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost.';
        popup.style.display = 'flex';
    }
}

//Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//Keydown letter press
window.addEventListener('keydown', e => {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
        } else {
            showNotification();
        }
    } else {
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);

            updateWrongLettersEl();
        } else {
            showNotification();
        }
    }

});

//Restart game
playAgainBtn.addEventListener('click', () => {
    //Empty Arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
});

displayWord();

