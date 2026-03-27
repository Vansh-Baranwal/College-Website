/**
 * Processes a user message and returns an AI response using the Mistral API.
 * @param {string} message - The user's input message.
 * @param {Object|Array} [contextData=null] - Optional context data from the database.
 * @returns {Promise<string>} The AI's generated response text.
 */
const generateResponse = async (message, contextData = null) => {
  try {
    const apiKey = process.env.MISTRAL_API_KEY;

    if (!apiKey) {
      throw new Error('MISTRAL_API_KEY is not configured in the environment variables.');
    }

    let systemContent = `You are an official AI assistant for IIT Delhi. Your tone must be formal, precise, and professional.
Focus strictly on academic, campus, and administrative queries. Provide accurate and concise answers.
Do not guess unknown information. If you do not know the answer, politely state your limitation.
Do not engage in irrelevant, casual, or off-topic conversations.`;

    if (contextData) {
      systemContent += `\n\nRelevant Database Context (Use this to answer accurately):\n${JSON.stringify(contextData, null, 2)}`;
    }

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'mistral-small-latest', // Modular: can be easily upgraded to mistral-large-latest etc.
        messages: [
          { role: 'system', content: systemContent },
          { role: 'user', content: message }
        ]
      })
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error('Mistral API error details:', errorData);
        throw new Error(`Mistral API request failed with status ${response.status}`);
    }

    const data = await response.json();
    let replyText = data?.choices?.[0]?.message?.content;

    if (!replyText) {
      throw new Error('Invalid response structure received from Mistral API.');
    }

    // Clean text by stripping basic markdown (links, bold, italic, headers, blockquotes, backticks)
    replyText = replyText
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Extract text from links: [text](url) -> text
      .replace(/[*~`]/g, '')                   // Remove formatting characters (*, ~, `)
      .replace(/^#+\s+/gm, '')                 // Remove heading hashes
      .replace(/_([^_]+)_/g, '$1')             // Remove italic underscores
      .replace(/^>+\s+/gm, '')                 // Remove blockquotes
      .replace(/[\r\n]+/g, ' ')                // Replace newlines/line breaks with a space
      .replace(/\s{2,}/g, ' ')                 // Collapse multiple trailing spaces into one 
      .trim();

    return replyText;
  } catch (error) {
    console.error(`[AI Service Error] ${error.message}\nStack: ${error.stack}`);
    throw new Error('Failed to generate AI response');
  }
};

module.exports = {
  generateResponse

};
