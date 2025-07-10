export function downloadTextFile(content: string, filename: string) {
  if (!content || !filename) {
    console.warn('Missing content or filename for text file download.');
    return;
  }

  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
