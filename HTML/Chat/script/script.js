import {  db,  set,  ref,  push,  onChildAdded,  createUserWithEmailAndPassword, 
  auth, signInWithEmailAndPassword, updateProfile,
} from "../script/configFirebase.js";

let userId = window.localStorage.getItem("userId");
let name = window.localStorage.getItem("name");
let email = window.localStorage.getItem("email");

if (!userId) {
  email = prompt("Qual seu e-mail?");
  const password = prompt("Digite seu password?");
  if(email && password){
    login(email, password, name);
  }

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

async function login(email, password, name) {
  try {
    const res =  await signInWithEmailAndPassword(auth, email, password);
    window.localStorage.setItem("userId", res.user.uid);
    window.localStorage.setItem("email", res.user.email);
    window.localStorage.setItem("name", res.user.displayName);
    email = res.user.email;
    name = res.user.displayName;
  } catch (error) {
    const errorCode = error.code;

    if(errorCode === 'auth/invalid-login-credentials'){
      createUser(email, password); 
    } else {
      alert('Houve um erro. Tente novamente!');
    }

  }
}
async function createUser(email, password) {
  name = prompt("Qual seu nome?");
  try {
   const res =  await createUserWithEmailAndPassword(auth, email, password);
   email = res.user.email;
   updateProfile(auth.currentUser, {
      displayName: name,
   });
   email = res.user.email;
   window.localStorage.setItem("email", res.user.email);
  window.localStorage.setItem("name", res.user.displayname);
   window.localStorage.setItem("userId", res.user.uid);
  } catch (error) {
     alert("Houve um erro ao criar a conta");
  }
   
}
loadMessage();
function loadMessage(){
  const messageDiv  = document.getElementById("messages");


onChildAdded(refMessage, (snapshot) =>{
    const elementMessage = document.createElement("p");
    const data = snapshot.val();
  
    elementMessage.innerText = `Usuário: ${data.name}: ${data.message}`;
    messageDiv.appendChild(elementMessage);
})
  
}
window.sendMessage = sendMessage;
