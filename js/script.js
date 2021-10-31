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
const keyCodes = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86, 66, 78, 77]
    /*
        Generating keyboard layout
    */
let row1 = document.createElement('div');
let row2 = document.createElement('div');
let row3 = document.createElement('div');
row1.classList.add('keyboard__row');
row2.classList.add('keyboard__row');
row3.classList.add('keyboard__row');


alphabet.forEach((value, index) => {
    let letter = document.createElement('p');
    //letter.setAttribute('id', 'letter' + value);
    letter.setAttribute('data-keycode', keyCodes[index])
    letter.innerHTML = value;
    if (index < 9) {
        row1.appendChild(letter);
    } else if (index >= 9 && index < 17) {
        row2.appendChild(letter);
    } else if (index >= 16 && index < alphabet.length) {
        row3.appendChild(letter);
    }
})

rotors.appendChild(row1);
keyboard.appendChild(row1.cloneNode(true));
plugboard.appendChild(row1.cloneNode(true));
rotors.appendChild(row2);
keyboard.appendChild(row2.cloneNode(true));
plugboard.appendChild(row2.cloneNode(true));
rotors.appendChild(row3);
keyboard.appendChild(row3.cloneNode(true));
plugboard.appendChild(row3.cloneNode(true));

/*
    Light ciphered keyboard
    TODO
*/

/*
    Sounds of keyboard and key listeners
*/

const keyboardLetters = document.querySelectorAll(".main__keyboard p");
const audio = document.querySelector('audio');
audio.loop = false;

function letterPressed(letter) {
    letter.target.classList.toggle('letter--active');
    if (!audio) return;
    audio.currentTime = 0;
    audio.play()
}
keyboardLetters.forEach((el) => {
    el.addEventListener('mousedown', (elem) => {
        letterPressed(elem);
    })
})

keyboardLetters.forEach((el) => {
    el.addEventListener('mouseup', (elem) => {
        elem.target.classList.toggle('letter--active');

    })
})


document.addEventListener('keydown', (event) => {
    let code = event.code || event.keyCode;
    console.log(code)
    let letter = document.querySelector('.main__keyboard p[data-keycode=' + code);
    console.log(letter)

})