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
} from "../script/configFirebase.js";

// Inicializa as variáveis de usuário a partir do localStorage
let userId = window.localStorage.getItem("userId");
let name = window.localStorage.getItem("name");
let email = window.localStorage.getItem("email");

// Função principal para gerenciar o login e o armazenamento de usuário
if (!userId) {
  email = prompt("Qual seu e-mail?");
  const password = prompt("Digite seu password?");
  if(email && password){
    login(email, password);
  }
}

const refMessage = ref(db, "messages/"); 

// Função para enviar mensagem
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

// Função de login
async function login(email, password) {
  try {
    const res =  await signInWithEmailAndPassword(auth, email, password);
    userId = res.user.uid; // Atualiza userId
    email = res.user.email;
    name = res.user.displayName; // Atualiza name
    window.localStorage.setItem("userId", userId);
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("name", name);
  } catch (error) {
    const errorCode = error.code;

    if(errorCode === 'auth/invalid-login-credentials'){
      createUser(email, password); 
    } else {
      alert('Houve um erro. Tente novamente!');
    }
  }
}

// Função para criar novo usuário
async function createUser(email, password) {
  name = prompt("Qual seu nome?");
  try {
    const res =  await createUserWithEmailAndPassword(auth, email, password);
    userId = res.user.uid; // Atualiza userId
    email = res.user.email;
    await updateProfile(auth.currentUser, {
      displayName: name,
    });
    name = res.user.displayName; // Atualiza name
    window.localStorage.setItem("userId", userId);
    window.localStorage.setItem("email", email);
    window.localStorage.setItem("name", name);
  } catch (error) {
    alert("Houve um erro ao criar a conta");
  }
}

// Função para carregar mensagens
function loadMessage() {
  const messageDiv  = document.getElementById("messages");

  onChildAdded(refMessage, (snapshot) =>{
    const elementMessage = document.createElement("p");
    const data = snapshot.val();

    elementMessage.innerText = `Usuário: ${data.name}: ${data.message}`;
    messageDiv.appendChild(elementMessage);
  });
}

// Inicializa a função para carregar mensagens
loadMessage();

// Torna a função sendMessage acessível globalmente
window.sendMessage = sendMessage;
