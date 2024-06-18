import { db, set, ref, push, onChildAdded, auth,
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "../script/configFirebase.js";


let userId = window.localStorage.getItem("uid");
let name;
let email;

if (!userId) {
  name = prompt("Qual seu nome?");
  email = prompt("Qual seu e-mail?");
  const password = prompt("Digite seu password?");
 
  login(email, password, name);
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
async function login(email, password, name){''
  try {
    const res =  await signInWithEmailAndPassword(auth, email, password);
    window.localStorage.setItem("userId", res.user.uid);
    email = res.user.email;
  } catch (error) {
    const errorCode = error.code;

    if(errorCode === 'auth/user-not-found'){
      createUser(email, password); 
    }
    else{
      alert('Houve um erro. Tente novamente!');
    }
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
}

async function createUser(email, password) {
  name = prompt("Qual seu nome?");
  try {
   const res =  await createUserWithEmailAndPassword(auth, email, password);
   email = res.user.email;
   window.localStorage.setItem("userId", res.user.uid);
   window.localStorage.setItem("name", name);
  } catch (error) {
     console.log(error.code, error.message);
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
