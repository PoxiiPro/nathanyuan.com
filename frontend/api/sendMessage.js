// This is a 'serverless' API route to handle sending messages to the Hugging Face endpoint 
// for Vercel deployment

const axios = require('axios');
const saveDataUrl = process.env.SAVE_DATA_URL;

// Call other serverless method to save chat log to Supabase
const saveChatLog = async (sessionTimestamp, messages) => {
  try {
    await axios.post(saveDataUrl, {
      table: 'ChatLog',
      data: {
        timestamp: sessionTimestamp,
        messages,
      },
    });
    console.log("Saving chat log")
  } catch (error) {
    console.error('Failed to save chat log:', error);
  }
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, sessionTimestamp, currentMessages } = req.body;

  if (!message || !sessionTimestamp) {
    return res.status(400).json({ error: 'Message and sessionTimestamp are required' });
  }

  let botResponse = '';
  // Use the complete conversation history from the frontend (already includes the user message)
  const updatedMessages = currentMessages ? [...currentMessages] : [{ sender: 'user', text: message }];

  try {
    // Hugging Face API endpoint and token
    const hfEndpoint = process.env.HF_CHAT_ENDPOINT;
    const hfAuthToken = process.env.HF_AUTH_TOKEN;
    const auth_token = process.env.AUTH_TOKEN;

    if (!hfEndpoint || !hfAuthToken) {
      return res.status(500).json({ error: 'Hugging Face credentials are not configured' });
    }

    // Send the message to the Hugging Face endpoint
    const response = await axios.post(
      hfEndpoint,
      { message },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    );

    botResponse = response?.data?.response;
    updatedMessages.push({ sender: 'bot', text: botResponse });

    // Return the response from the chatbot to front end
    return res.status(200).json({ response: botResponse });
  } catch (error) {
    console.error('Error communicating with Hugging Face API:', error);
    updatedMessages.push({ sender: 'bot', text: 'Failed to get a response from the bot.' });
    return res.status(500).json({ error: 'Failed to communicate with Hugging Face API' });
  } finally {
    // Log the chat history regardless of success or failure
    await saveChatLog(sessionTimestamp, updatedMessages);
  }
};
