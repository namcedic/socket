// /static/app.js

const socket = io('http://localhost:3000');
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');
const userName = document.getElementById('userName');

//get old messages from the server
const messages = [];
function getMessages() {
  fetch('http://localhost:3002/api/chat')
    .then((response) => response.json())
    .then((data) => {
      loadDate(data);
      data.forEach((el) => {
        messages.push(el);
      });
    })
    .catch((err) => console.error(err));
}
getMessages();

//When a user press the enter key,send message.
msgBox.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    sendMessage({ userName: userName.value, text: e.target.value });
    e.target.value = '';
  }
});

//Display messages to the users
function loadDate(data) {
  let messages = '';
  console.log(data[0].userName);
  console.log(data[0].text);
  data.map((message) => {
    messages += ` <li class="bg-success p-2 rounded mb-2 text-light">
      <span class="fw-bolder">${message.userName}</span>
      ${message.text}
    </li>`;
  });
  msgCont.innerHTML = messages;
}

//socket.io
//emit sendMessage event to send message
function sendMessage(message) {
  socket.emit('sendMessage', message);
}
//Listen to recMessage event to get the messages sent by users
socket.on('recMessage', (message) => {
  // messages.push(message);
  loadDate(message);
});
