const socket = io();

const formUser = document.querySelector("#formUser");
const inputUser = document.querySelector("#inputUser");
const messages = document.querySelector("#messages");
const formMessage = document.querySelector("#formMessage");
const inputMessage = document.querySelector("#inputMessage");
const userContianer = document.querySelector("#userContainer");

const throwDice = document.querySelector("#throwDice");
const diceContainer = document.querySelector("#diceContainer");
const diceThrows = document.querySelector("#diceThrows");

let myUser;

formUser.addEventListener("submit", function (e) {
  e.preventDefault();
  myUser = inputUser.value;
  userContianer.innerHTML = "<h2>Välkommen " + myUser + "</h2>";
  document.getElementById("user").style.display = "none";
  document.getElementById("message").style.display = "block";
});

formMessage.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputMessage.value) {
    socket.emit("chatMessage", { user: myUser, message: inputMessage.value });
    inputMessage.value = "";
  }
});

socket.on("newChatMessage", function (msg) {
  let item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
});

throwDice.addEventListener("click", function (e) {
  e.preventDefault();
  let myDiceThrow = Math.floor(Math.random() * 6 + 1);
  if (myDiceThrow) {
    socket.emit("rollTheDice", { user: myUser, diceRoll: myDiceThrow });
  }
  console.log(myDiceThrow);
});

socket.on("newDiceRoll", function (roll) {
  console.log(roll);
  let item = document.createElement("li");
  item.innerHTML = roll;
  diceThrows.appendChild(item);
  console.log(item);
});
