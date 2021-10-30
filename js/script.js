/*
    Handlers for DOM Elements
*/

const rotors = document.querySelector("#enigmaRotors");
const keyboard = document.querySelector("#enigmaKeyboard");
const plugboard = document.querySelector("#enigmaPlugboard");

/*
    Array with alphabet - qwerty order
*/

const alphabet = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

/*
    Generating keyboard layout
*/

function generateLayout(DOMnode, className) {
    alphabet.forEach((value) => {
        let letter = document.createElement('p');
        letter.setAttribute('id', 'letter' + value);
        letter.classList.add(className)
        letter.innerHTML = value;
        DOMnode.appendChild(letter);
    })
}

generateLayout(rotors, 'rotors__letter');
generateLayout(keyboard, 'keyboard__letter');
generateLayout(plugboard, 'plugboard__letter');