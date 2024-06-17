import { db, set, ref } from "../script/configFirebase.js";

let name = prompt("Qual seu nome?");
let email = prompt("Qual seu e-mail?");

if (name && email) {
  console.log(name, email);
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
