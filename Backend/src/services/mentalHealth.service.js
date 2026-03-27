/**
 * Utility to detect and respond to mental health keywords in user messages.
 */

const MENTAL_HEALTH_KEYWORDS = ['stress', 'depressed', 'anxiety', 'overwhelmed'];

const checkMentalHealthIntent = (message) => {
  if (!message || typeof message !== 'string') return null;

  const lowerMsg = message.toLowerCase();
  
  const hasKeyword = MENTAL_HEALTH_KEYWORDS.some(keyword => lowerMsg.includes(keyword));

  if (hasKeyword) {
    return "I hear you, and it's completely okay to feel this way. Please remember you don't have to carry this alone—consider speaking with a campus counselor or reaching out to the student helpline for support. We're here for you.";
  }

  return null;
};

module.exports = {
  checkMentalHealthIntent
};
