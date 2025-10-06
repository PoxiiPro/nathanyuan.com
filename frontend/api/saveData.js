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
    const { id, messages } = data;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Missing or invalid messages field for ChatLog' });
    }

    // Ensure all messages are valid JSON objects
    for (const message of messages) {
      if (typeof message !== 'object' || message === null || !message.sender || !message.text) {
        return res.status(400).json({ error: 'Invalid message format in messages array' });
      }
    }

    try {
      // Check if a record with the same chat ID exists
      const { data: existingChat, error: fetchError } = await supabase
        .from(table)
        .select('id, messages')
        .eq('id', id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // Ignore "row not found" error
        throw fetchError;
      }

      if (existingChat) {
        // Replace the entire messages array (since sendMessage sends complete history)
        const { error: updateError } = await supabase
          .from(table)
          .update({ messages: messages })
          .eq('id', id);

        if (updateError) {
          throw updateError;
        }

        return res.status(200).json({ message: 'Chat history updated successfully' });
      }
    } catch (error) {
      console.error('Error handling ChatLog:', error);
      return res.status(500).json({ error: error.message });
    }

    // If no existing chat found, create a new one
    try {
      const { error } = await supabase.from(table).insert(data);
      
      if (error) {
        throw error;
      }

      return res.status(200).json({ message: 'New chat created successfully' });
    } catch (error) {
      console.error('Error creating new ChatLog:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  try {
    const { error } = await supabase.from(table).insert(data);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
