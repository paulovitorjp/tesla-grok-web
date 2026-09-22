// Lightweight Markdown-to-HTML renderer
// No external dependencies — safe for Tesla in-car browser ad blocker

function renderMarkdown(text) {
  if (!text) return '';

  let html = text
    // Escape HTML entities first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Code blocks (triple backticks)
    .replace(/```(\w*)\n([\s\S]*?)```/g, (m, lang, code) => {
      return '<pre><code class="language-' + lang + '">' + code.trim() + '</code></pre>';
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    // Line breaks
    .replace(/\n/g, '<br>');

  return html;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { renderMarkdown };
}
