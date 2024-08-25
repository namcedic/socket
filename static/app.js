// /static/app.js

// for test only
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNlZHJpY0BleGFtcGxlLmNvbSIsImlkIjo1LCJmaXJzdE5hbWUiOiJDZWRyaWMiLCJsYXN0TmFtZSI6Ik1yIiwiaWF0IjoxNzI0Mzg3MDY1fQ.9WDdT1OLYyvgCBTd_qa6Lbmift2xWv0LxRSL7btGjcw';

const socket = io('http://localhost:3000', {
  extraHeaders: {
    Authorization: `Bearer ${token}`,
  },
});
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');

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
    sendMessage(e.target.value);
    getAllMessages();
    e.target.value = '';
  }
});

//Display messages to the users
function loadDate(data) {
  let messages = '';
  data.map((message) => {
    messages += ` <li class="bg-success p-2 rounded mb-2 text-light">
      <span class="fw-bolder">${message.user.firstName} ${message.user.lastName}</span>
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

function getAllMessages() {
  socket.emit('getAllMessages');
}

//Listen to recMessage event to get the messages sent by users
socket.on('receiveMessage', (message) => {
  // messages.push(message);
  loadDate(message);
});
