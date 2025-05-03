// === AWS Lex Chatbot Configuration ===
const REGION = 'us-east-1'; // Change to your Lex bot's region
const IDENTITY_POOL_ID = 'us-east-1:c0708bc5-b6e0-4975-86b4-79c9d1848b67'; // <-- Replace this
const BOT_NAME = 'TravelBotTemplate'; // e.g., 'BookTrip'
const BOT_ALIAS = 'TestBotAlias'; // Or a specific alias
const lexUserId = 'webUser-' + Date.now();
let sessionAttributes = {};

AWS.config.region = REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: IDENTITY_POOL_ID
});

AWS.config.credentials.get(function(err) {
  if (err) {
    console.error('Cognito credential error:', err);
  } else {
    console.log('Cognito identity ID:', AWS.config.credentials.identityId);
  }
});


const lexruntime = new AWS.LexRuntime();

function sendMessage() {
  const inputField = document.getElementById('user-input');
  const message = inputField.value.trim();
  if (message === '') return;

  addMessage('user', message);
  inputField.value = '';

  const params = {
    botAlias: BOT_ALIAS,
    botName: BOT_NAME,
    inputText: message,
    userId: lexUserId,
    sessionAttributes: sessionAttributes
  };

  lexruntime.postText(params, function(err, data) {
    if (err) {
      console.error('Lex error:', err);
      addMessage('bot', '⚠️ Error: Could not connect to bot.');
    } else {
      sessionAttributes = data.sessionAttributes;
      addMessage('bot', data.message || '(No message returned)');
    }
  });
}

function addMessage(sender, text) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message', sender);
  messageElement.textContent = text;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
