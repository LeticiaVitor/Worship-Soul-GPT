const chatContainer = document.getElementById("chat-container");
const input = document.getElementById("msg");
const btnSend = document.getElementById("send");

  //usuario
function addUserMessage(text) {
  const div = document.createElement("div");
  div.classList.add("msg-user");
  div.textContent = text;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

//ia
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

btnSend.addEventListener("click", async () => {
  const msg = input.value.trim();
  if (msg === "") return;

  addUserMessage(msg);
  input.value = "";

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      btnSend.click();
    }
  });

  // pensando
  const typing = addTypingIndicator();


  setTimeout(async () => {
    try {
      const answer = await sendMessage(msg);
      typing.remove();
      addAIMessage(answer);
    } catch (error) {
      typing.remove();
      addAIMessage("Desculpe, houve um erro, tente denovo :)");
      console.error(error);
    }
  }, 1000);
});

const sendBtn = document.getElementById("send");
const ola = document.getElementById("olaUsuario");

sendBtn.addEventListener("click", () => {
    if (!ola) return;

    ola.classList.add("sumindo");

    setTimeout(() => {
        ola.remove();
    }, 600);
});


async function sendMessage(texto) {
  const response = await fetch('http://localhost:8001/perguntar', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({question_text: texto}),
  });

  const data = await response.json();
  return data.ai_answer;
}