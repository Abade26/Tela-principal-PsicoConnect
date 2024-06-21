import {  
  db,  
  set,  
  ref,  
  push,  
  onChildAdded,  
  createUserWithEmailAndPassword, 
  auth, 
  signInWithEmailAndPassword, 
  updateProfile,
  signOut,
} from "../script/configFirebase.js";

let userId = window.localStorage.getItem("userId");
let name = window.localStorage.getItem("name");
let email = window.localStorage.getItem("email");
const refMessage = ref(db, "messages/"); 
const refUser = ref(db, "user/"); 

if (!userId) {
  email = prompt("Qual seu e-mail?");
  const password = prompt("Digite seu password?");
  if(email && password){
    login(email, password);
  }
}
if(email === "adm@gmail.com"){
  loadListClient();
}

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


async function login(email, password) {
  try {
    const res =  await signInWithEmailAndPassword(auth, email, password);
    userId = res.user.uid; 
    email = res.user.email;
    name = res.user.displayName; 
    window.localStorage.setItem("userId", userId);
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("name", name);

    if(res.user.email === 'adm@gmail.com'){
        loadListClient();
    }
  } catch (error) {
    const errorCode = error.code;

    if(errorCode === 'auth/invalid-login-credentials'){
      createUser(email, password); 
    } else {
      alert('Houve um erro. Tente novamente!');
    }
  }
}

function loadListClient(){
    const clientListElement = document.getElementById("client-list");
    const containerList = document.getElementById("text-client");
    clientListElement.innerHTML = "";
    containerList.innerHTML = "";
    const headerClients =  document.createElement("h3");
    headerClients.innerHTML = "Lista de Clientes";
    
    containerList.appendChild(headerClients);
    onChildAdded(refUser, (snapshot) => {
      const listItem = document.createElement("button");
      listItem.innerText = snapshot.val().name;     
      clientListElement.appendChild(listItem);
    });
}
async function createUser(email, password) {
  name = prompt("Qual seu nome?");
  try {
    const res =  await createUserWithEmailAndPassword(auth, email, password);
    userId = res.user.uid; 
    email = res.user.email;
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    name = res.user.displayName; 
    window.localStorage.setItem("userId", userId);
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("name", name);
    const refUser = ref(db, "user/"); 
    const newMessage = push(refUser);
    set(newMessage, {
      name: name,
      email: email,
      uid: res.user.uid,
    });
  } catch (error) {
    alert("Houve um erro ao criar a conta");
  }
}

function loadMessage() {
  const messageDiv  = document.getElementById("messages");

  onChildAdded(refMessage, (snapshot) =>{
    const elementMessage = document.createElement("p");
    const data = snapshot.val();

    elementMessage.innerText = `Usuário: ${data.name}: ${data.message}`;
    messageDiv.appendChild(elementMessage);
  });
}

loadMessage();

async function logout(){
    try {
      await signOut(auth);
      window.localStorage.removeItem("userId");
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
      location.reload();
    } catch (error) {
      console.log(error);
    }
}

window.sendMessage = sendMessage;
window.logout = logout;
