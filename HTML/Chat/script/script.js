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
  } from "./configFirebase.js";
  
  let userId = window.localStorage.getItem("userId");
  let name = window.localStorage.getItem("name");
  let email = window.localStorage.getItem("email");
  
  const refUser = ref(db, "user/");
  let currentId;
  
  if (!userId) {
    email = prompt("Qual seu e-mail?");
    const password = prompt("Digite seu password?");
    if (email && password) {
      login(email, password, name);
    }
  }
  
  if (email === "atendimento@gmail.com") {
    loadListClients();
  } else {
    loadMessage(userId);
    setUser(name, email);
  }
  
  function sendMessage(event) {
    event.preventDefault();
    const inputField = document.getElementById("user-input");
    const id = currentId ? currentId : userId;
    const refMessage = ref(db, "messages/" + id);
    const newMessage = push(refMessage);
    const time = getCurrentTime();
  
    set(newMessage, {
      name: currentId ? "Atendimento" : name,
      email: email,
      message: inputField.value,
      time: time,
    });
  
    inputField.value = "";
  }
  
  async function login(email, password) {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      window.localStorage.setItem("userId", res.user.uid);
      window.localStorage.setItem("email", res.user.email);
      window.localStorage.setItem("name", res.user.displayName);
      userId = res.user.uid;
      email = res.user.email;
      name = res.user.displayName;
  
      if (res.user.email === "atendimento@gmail.com") {
        loadListClients();
      } else {
        loadMessage(res.user.uid);
        setUser(name, email);
      }
    } catch (error) {
      const errorCode = error.code;
  
      if (errorCode === "auth/user-not-found") {
        createUser(email, password);
      } else {
        alert("Houve um erro. Tente novamente!");
      }
    }
  }
  
  function loadListClients() {
    const clientListElement = document.getElementById("client-list");
    const containerList = document.getElementById("text-client");
    clientListElement.innerHTML = "";
    containerList.innerHTML = "";
    const headerClients = document.createElement("h3");
    headerClients.innerHTML = "Lista de Clientes";
  
    containerList.appendChild(headerClients);
    onChildAdded(refUser, (snapshot) => {
      const listItem = document.createElement("button");
      listItem.innerText = snapshot.val().name;
      listItem.addEventListener("click", () => {
        currentId = snapshot.val().uid;
        setUser(snapshot.val().name, snapshot.val().email);
        loadMessage(snapshot.val().uid);
      });
      clientListElement.appendChild(listItem);
    });
  }
  async function createUser(email, password) {
    name = prompt("Qual seu nome?");
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      window.localStorage.setItem("userId", res.user.uid);
      window.localStorage.setItem("email", res.user.email);
      window.localStorage.setItem("name", res.user.displayName);
      userId = res.user.uid;
      email = res.user.email;
  
      const newMessage = push(refUser);
  
      loadMessage(res.user.uid);
      setUser(name, email);
  
      set(newMessage, {
        name: name,
        email: email,
        uid: res.user.uid,
      });
    } catch (error) {
      alert("Houve um erro ao criar a conta");
    }
  }
  
  function loadMessage(uid) {
    const messageDiv = document.getElementById("messages");
    messageDiv.innerText = "";
    const refMessageLoad = ref(db, "messages/" + uid);
    onChildAdded(refMessageLoad, (snapshot) => {
      const message = snapshot.val();
      const messageDiv = document.createElement("div");
  
      const messageText = document.createElement("p");
      const messageTime = document.createElement("span");
  
      if (message.email === email) {
        messageDiv.classList.add("self");
        messageText.innerText = `${message.message}`;
        messageTime.innerText = `${message.time}`;
        messageText.appendChild(messageTime);
      } else {
        // Se a mensagem for de outro usuário
        messageDiv.classList.add("other");
        messageText.innerText = `${message.message}`;
        messageTime.innerText = `${message.time}`;
        messageText.appendChild(messageTime);
      }
      messageDiv.appendChild(messageText);
  
      const messagesContainer = document.getElementById("messages");
      const messageContainer2 = document.getElementById("messagesContainer");
      messagesContainer.appendChild(messageDiv);
      messageContainer2.scrollTop = messagesContainer.scrollHeight;
    });
  }
  
  function getCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
    // Adiciona um zero à esquerda se as horas ou minutos forem de um dígito.
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
  
    return `${hours}:${minutes}`;
  }
  
  function setUser(name, email) {
    const userLogged = document.getElementById("user-header");
    userLogged.innerHTML = "";
    const userNameElement = document.createElement("h2");
    const userEmailElement = document.createElement("span");
    userNameElement.innerText = name;
    userEmailElement.innerText = email;
    userLogged.appendChild(userNameElement);
    userLogged.appendChild(userEmailElement);
  }
  
  async function logout() {
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