/**
 * Get plain text from Sanity portable text blocks (for length checks, etc.)
 */
export function getBlockContentPlainText(blocks: unknown): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  return (blocks as { children?: { text?: string }[] }[])
    .map((b) => {
      if (b.children && Array.isArray(b.children)) {
        return b.children.map((c) => c.text ?? '').join('');
      }
      return '';
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
