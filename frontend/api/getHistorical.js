const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ticker, start, end } = req.query || {};
  if (!ticker || !start || !end) return res.status(400).json({ error: 'Ticker, start, and end are required' });

  try {
    // Hugging Face API endpoint and token
    const hfEndpoint = process.env.HF_HISTORICAL_ENDPOINT;
    const auth_token = process.env.AUTH_TOKEN;

    if (!hfEndpoint || !auth_token) {
      return res.status(500).json({ error: 'Hugging Face credentials are not configured' });
    }

    // Call Hugging Face inference endpoint for historical data
    const hfResp = await axios.get(hfEndpoint, {
      params: { ticker, start, end },
      headers: {
        Authorization: `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    const hfData = hfResp?.data || {};

    return res.status(200).json(hfData);
  } catch (err) {
    const message = `Failed to get historical data from Hugging Face: ${err.message} \n ${err.stack}`;
    return res.status(message.status || 500).json({
      error: message,
      status: message.status || 500,
      code: message.code || null,
     });
  }
};