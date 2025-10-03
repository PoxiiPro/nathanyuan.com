// This is a 'serverless' API route to handle sending messages to the Hugging Face endpoint 
// for Vercel deployment

const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Hugging Face API endpoint and token
    const hfEndpoint = process.env.HF_CHAT_ENDPOINT;
    const hfAuthToken = process.env.HF_AUTH_TOKEN;

    if (!hfEndpoint || !hfAuthToken) {
      return res.status(500).json({ error: 'Hugging Face credentials are not configured' });
    }

    // Send the message to the Hugging Face endpoint
    const response = await axios.post(
      hfEndpoint,
      { message },
      {
        headers: {
          Authorization: `Bearer ${hfAuthToken}`,
        },
      }
    );

    // Return the response from Hugging Face
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error communicating with Hugging Face API:', error);
    return res.status(500).json({ error: 'Failed to communicate with Hugging Face API' });
  }
};
