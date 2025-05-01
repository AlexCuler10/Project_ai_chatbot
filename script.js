function sendMessage() {
    const inputField = document.getElementById('user-input');
    const message = inputField.value.trim();
    if (message === '') return;
  
    addMessage('user', message);
    inputField.value = '';
  
    // Simulate bot response (later you’ll replace this with actual backend fetch)
    setTimeout(() => {
      addMessage('bot', "This is a sample response from the bot.");
    }, 500);
  }
  
  function addMessage(sender, text) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  