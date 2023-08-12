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
    Plugboard pairs
*/

let plugboardPairs = [];

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
    letter.setAttribute('data-keycode', "Key" + value)
    letter.setAttribute('data-clicked', "off")
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
    Plugboard highlight
*/
let plugBoardColors = [
    '#4e1b6f',
    '#a8b499',
    '#2da31a',
    '#ca6690',
    '#7d8b96',
    '#ff6f61',
    '#007acc',
    '#6bbb69',
    '#ffd700',
    '#c72138',
    '#e06236',
    '#304c7a',
    '#b3df7f'
]

let usedColors = [];
let plugBoardKeys = plugboard.querySelectorAll(".main__plugboard p");
let pairCounter = 1;
let colorCounter = 0;
let wasSomethingRemoved = false;
plugBoardKeys.forEach((el) => {
    el.addEventListener('mousedown', (elem) => {
        if(el.getAttribute('data-clicked') == 'off') {
            el.setAttribute('data-clicked', 'on');
            if(pairCounter == 1) {
                plugboardPairs.push([el.innerHTML])
                pairCounter++;
                el.style.setProperty('--plugColor', plugBoardColors[plugboardPairs.length - 1]);
            } else {
                plugboardPairs[plugboardPairs.length - 1].push(el.innerHTML);
                pairCounter--;
                if(wasSomethingRemoved) {
                    el.style.setProperty('--plugColor', plugBoardColors[plugboardPairs.length - 2]);
                } else {
                    el.style.setProperty('--plugColor', plugBoardColors[plugboardPairs.length - 1]);
                    wasSomethingRemoved = false;
                }
                usedColors.push(plugBoardColors[plugBoardColors.length - 1]);
                plugBoardColors.pop();
            }
            
            
            
        } else {
            el.style.setProperty('--plugColor', '#000000');
            el.setAttribute('data-clicked', 'off');
            let indexes = pairElement(plugboardPairs, el.innerHTML);
            /*
                indexes[1] index in plugboardPairs
                indexes[0] index in array in plugboardPairs

            */
            console.log(plugboardPairs[indexes[1]][(indexes[0]+1)%2])
            let secondLetter = plugboard.querySelector('.main__plugboard p[data-keycode="Key' + plugboardPairs[indexes[1]][(indexes[0]+1)%2] + '"]');
            let color = secondLetter.style.getPropertyValue('--plugColor');
            
            plugBoardColors.push(color);
            usedColors.splice(usedColors.indexOf(color), 1);

            secondLetter.style.setProperty('--plugColor', '#000000');
            secondLetter.setAttribute('data-clicked', 'off');
            plugboardPairs.splice(pairElement(plugboardPairs, el.innerHTML)[1] , 1);
            wasSomethingRemoved = true;
            
        }

        
    })
})


let pairElement = (arr, key) => {
    let indexesArray = [];
    arr.forEach((el, i) => {
        if(el.indexOf(key) > -1) {
            indexesArray.push(el.indexOf(key));
            indexesArray.push(i)
        }
    })

    return indexesArray;
}

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
    console.log(event)
    let code = event.code || event.keyCode;
    console.log(code)
    let letter = document.querySelector('.main__keyboard p[data-keycode="' + code + '"]');
    console.log(letter)

})