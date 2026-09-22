// Grok interaction layer
// Handles communication with the Grok API

const GrokClient = {
  apiEndpoint: null, // Set this to your Grok API endpoint
  apiKey: null,      // Set this to your API key (never hardcode in production)

  async sendMessage(message, conversationHistory = []) {
    if (!this.apiEndpoint) {
      // Demo mode — return a placeholder response
      return this._demoResponse(message);
    }

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.apiKey
        },
        body: JSON.stringify({
          messages: [
            ...conversationHistory,
            { role: 'user', content: message }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Grok API error: ' + response.status);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Grok API call failed:', error);
      throw error;
    }
  },

  _demoResponse(message) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('**Demo Mode**\n\nI received your message: "' + message + '"\n\nTo connect to real Grok, set `GrokClient.apiEndpoint` and `GrokClient.apiKey` in your configuration.');
      }, 600);
    });
  },

  isOnline() {
    return navigator.onLine;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GrokClient };
}
