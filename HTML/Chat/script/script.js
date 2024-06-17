import { db, set, ref } from "../script/configFirebase.js";

let name = window.localStorage.getItem("name");
let email = window.localStorage.getItem("email");

if (!name && !email) {
  name = prompt("Qual seu nome?");
  email = prompt("Qual seu e-mail?");
  window.localStorage.setItem("name", name);
  windows.localStorage.setItem("email", email);
}

function sendMessage(event) {
  event.preventDefault();
  const inputField = document.getElementById('user-input');

  set(ref(db, "messages/"), {
    name: name,
    email: email,
    message: inputField.value
  });
}

window.sendMessage = sendMessage;
