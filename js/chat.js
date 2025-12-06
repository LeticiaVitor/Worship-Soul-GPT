const chatContainer = document.getElementById("chat-container");
const input = document.getElementById("msg");
const btnSend = document.getElementById("send");

/* usuario */
function addUserMessage(text) {
  const div = document.createElement("div");
  div.classList.add("msg-user");
  div.textContent = text;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

/* conversa da IA*/
function addAIMessage(text) {
  const div = document.createElement("div");
  div.classList.add("msg-ai");
  chatContainer.appendChild(div);

  let i = 0;
  function type() {
    if (i < text.length) {
      div.textContent += text.charAt(i);
      i++;
      setTimeout(type, 25);
    }
  }
  type();

  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addTypingIndicator() {
  const dot = document.createElement("div");
  dot.classList.add("typing");
  chatContainer.appendChild(dot);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return dot;
}

btnSend.addEventListener("click", () => {
  const msg = input.value.trim();
  if (msg === "") return;

  addUserMessage(msg);
  input.value = "";

  // pensando
  const typing = addTypingIndicator();


  setTimeout(() => {
    typing.remove();
    addAIMessage("Olá! Sou a IA biblica");
  }, 1000);
});