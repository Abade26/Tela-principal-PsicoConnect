import { db, set, ref, push, onChildAdded } from "../script/configFirebase.js";

let name = window.localStorage.getItem("name");
let email = window.localStorage.getItem("email");

if (!name && !email) {
  name = prompt("Qual seu nome?");
  email = prompt("Qual seu e-mail?");
  window.localStorage.setItem("name", name);
  window.localStorage.setItem("email", email);
}
const refMessage = ref(db, "messages/");

function sendMessage(event) {
  event.preventDefault();
  const inputField = document.getElementById('user-input');
  const newMessage = push(refMessage);

  set(newMessage, {
    name: name,
    email: email,
    message: inputField.value
  });

  inputField.value = "";
}
loadMessage();
function loadMessage(){
  const messageDiv  = document.getElementById("messages");


onChildAdded(refMessage, (snapshot) =>{
    const elementMessage = document.createElement("p");
    const data = snapshot.val();
    console.log(data);
    elementMessage.innerText = `Usuário: ${data.name}: ${data.message}`;
    messageDiv.appendChild(elementMessage);
})
  

}

window.sendMessage = sendMessage;
