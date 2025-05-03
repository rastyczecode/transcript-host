import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed');

  try {
    const { content, filename } = req.body;
    if (!content || !filename) return res.status(400).json({ error: 'Missing data' });

    const safeName = filename.replace(/[^\w\-\.]/gi, '_');
    const transcriptsDir = path.join(process.cwd(), 'public', 'transcripts');
    if (!fs.existsSync(transcriptsDir)) fs.mkdirSync(transcriptsDir, { recursive: true });

    fs.writeFileSync(path.join(transcriptsDir, safeName), content, 'utf8');
    return res.status(200).json({ url: `/transcripts/${safeName}` });

  } catch (err) {
    console.error('Upload failed:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
