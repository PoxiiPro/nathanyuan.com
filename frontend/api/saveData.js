import { createClient } from '@supabase/supabase-js';

// Set up connection to backend postgres supabase database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { table, data } = req.body;

  if (!table || !data) {
    return res.status(400).json({ error: 'Missing table or data in request body' });
  }

  if (table === 'BugTickets') {
    const { title, desc, prio } = data;

    if (!title || !desc || !prio) {
      return res.status(400).json({ error: 'Missing required fields for BugTickets' });
    }

    if (!['P0', 'P1', 'P2', 'P3'].includes(prio)) {
      return res.status(400).json({ error: 'Invalid priority value' });
    }
  }

  if (table === 'ChatLog') {
    const { messages, timestamp } = data;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing or invalid messages field for ChatLog' });
    }

    // Validate message format
    for (const message of messages) {
      if (typeof message !== 'object' || message === null || !message.sender || !message.text) {
        return res.status(400).json({ error: 'Invalid message format in messages array' });
      }
    }

    // persist data
    try {
      // Check if a record with this timestamp already exists
      const { data: existingRecord, error: selectError } = await supabase
        .from(table)
        .select('timestamp')
        .eq('timestamp', timestamp)
        .single();

      if (selectError && selectError.code !== 'PGRST116') {
        // PGRST116 is "not found" error, which is expected if no record exists
        throw selectError;
      }

      let result;
      if (existingRecord) {
        // Update existing record
        result = await supabase
          .from(table)
          .update({ messages: data.messages })
          .eq('timestamp', data.timestamp);
      } else {
        // Insert new record
        result = await supabase
          .from(table)
          .insert(data);
      }

      if (result.error) {
        throw result.error;
      }

      return res.status(200).json({ message: 'Chat log saved successfully' });
    } catch (error) {
      console.error('Error saving ChatLog:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  try {
    const { error } = await supabase
      .from(table)
      .upsert(data, { onConflict: ['timestamp'] });

    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
