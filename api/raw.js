export default async function handler(req, res) {
  const { file } = req.query;

  if (!file) {
    return res.status(400).send('Missing file parameter.');
  }

  const url = `https://raw.githubusercontent.com/rastyczecode/transcript-host/main/public/transcripts/${file}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).send('Failed to fetch file.');
    }

    const html = await response.text();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Server error.');
  }
}
