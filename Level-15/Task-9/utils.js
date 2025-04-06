import { marked } from 'marked';

export function renderMarkdown(markdown) {
  const html = marked.parse(markdown);
  // Strip HTML tags for CLI display (basic rendering)
  return html.replace(/<[^>]*>?/gm, '');
}
