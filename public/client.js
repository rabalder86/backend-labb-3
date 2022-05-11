const socket = io();

const formUser = document.querySelector('#formUser');
const inputUser = document.querySelector('#inputUser');
const message = document.querySelector('.message');
const formMessage = document.querySelector('#formMessage');
const inputMessage = document.querySelector('#inputMessage');
const userContainer = document.querySelector('#userContainer');

const throwDice = document.querySelector('#throwDice');
const diceThrows = document.querySelector('#diceThrows');

let myUser;

formUser.addEventListener('submit', function (e) {
    e.preventDefault();
    myUser = inputUser.value;
    userContainer.innerHTML = '<h2>Welcome ' + myUser + '</h2>';
    document.getElementById('user').style.display = 'none';
    document.getElementById('message').style.display = 'block';
});

formMessage.addEventListener('submit', function (e) {
    e.preventDefault();
    if (inputMessage.value) {
        socket.emit('chatMessage', {
            user: myUser,
            message: inputMessage.value,
        });
        inputMessage.value = '';
    }
});

socket.on('newChatMessage', function (msg) {
    let item = document.createElement('li');
    item.textContent = msg;
    message.appendChild(item);
});

let sumOfNumber = [];
throwDice.addEventListener('click', function (e) {
    let myDiceThrow = Math.floor(Math.random() * 6 + 1);
    sumOfNumber.push(myDiceThrow);
    let sum = sumOfNumber.reduce((a, b) => {
        return a + b;
    });
    socket.emit('rollTheDice', {
        user: myUser,
        diceRoll: myDiceThrow,
        sumOfRolls: sum,
    });
    console.log(myDiceThrow, sum);
});

socket.on('newDiceRoll', function (roll) {
    console.log(roll);
    let item = document.createElement('li');
    item.innerHTML = roll;
    diceThrows.appendChild(item);
});
