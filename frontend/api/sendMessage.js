// This is a 'serverless' API route to handle sending messages to the Hugging Face endpoint 
// for Vercel deployment

const axios = require('axios');

// Call other serverless method to save chat log to Supabase
const saveChatLog = async (chatId, messages) => {
  try {
    await axios.post('/api/saveData', {
      table: 'ChatLog',
      data: {
        id: chatId,
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

  const { message, chatId } = req.body;

  if (!message || !chatId) {
    return res.status(400).json({ error: 'Message and chatId are required' });
  }

  let botResponse = '';
  const updatedMessages = [{ sender: 'user', text: message }];

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
    const response = res.status(500).json({ error: 'Failed to communicate with Hugging Face API' });
    updatedMessages.push({ sender: 'bot', text: response.toString() });
    console.error('Error communicating with Hugging Face API:', error);
    return response;
  } finally {
    // Log the chat history regardless of success or failure
    await saveChatLog(chatId, updatedMessages);
  }
};
