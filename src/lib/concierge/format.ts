export function formatCadenceReply(content: string): string {
  let text = content;

  text = text.replace(/^#{1,6}\s+/gm, "");
  text = text.replace(/^\s*[-*]\s+/gm, "");

  return text.replace(/\n{3,}/g, "\n\n").trim();
}
