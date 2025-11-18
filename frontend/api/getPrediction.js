const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ticker, daysAhead, modelType } = req.body || {};
  if (!ticker) return res.status(400).json({ error: 'Ticker is required' });

  try {
    // Hugging Face API endpoint and token
    const hfEndpoint = process.env.HF_PREDICT_ENDPOINT;
    const auth_token = process.env.AUTH_TOKEN;

    if (!hfEndpoint || !auth_token) {
      return res.status(500).json({ error: 'Hugging Face credentials are not configured' });
    }

    // Helper: compute last 12 months range
    const endDate = new Date();
    const end = endDate.toISOString().slice(0, 10);
    const startDate = new Date(endDate);
    startDate.setFullYear(startDate.getFullYear() - 1);
    const start = startDate.toISOString().slice(0, 10);

    // Build payload for hugging face model -- keep generic so the HF model can accept it
    const payload = {
      inputs: {
        ticker,
        daysAhead: Number(daysAhead) || 1,
        model: modelType || 'linear',
        start,
        end,
      }
    };

    // Call Hugging Face inference endpoint
    const hfResp = await axios.post(hfEndpoint, payload, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    const hfData = hfResp?.data || {};

    // Pass HF response through to frontend. If HF returned FastAPI-style fields, normalize for DemoPage.
    const out = { ...hfData };
    if (hfData.historicalData && !hfData.history) out.history = hfData.historicalData;
    if ((hfData.prediction !== undefined) && (out.predicted === undefined && out.predictedPrice === undefined)) out.predicted = hfData.prediction;

    return res.status(200).json(out);
  } catch (err) {
    console.error('getPrediction error', err?.response?.data || err?.message || err);
    const message = err|| 'Failed to get prediction from Hugging Face';
    return res.status(500).json({ error: message });
  }
};
