const UPSTREAM = 'https://api.favorit-parts.ru/hs/hsprice/';

export default async function handler(req, res) {
  const queryIndex = req.url.indexOf('?');
  const query = queryIndex === -1 ? '' : req.url.slice(queryIndex);

  let upstream;
  try {
    upstream = await fetch(`${UPSTREAM}${query}`, {
      headers: { accept: 'application/json' },
    });
  } catch {
    res.status(502).json({ error: 'Не удалось связаться с сервером.' });
    return;
  }

  const body = await upstream.text();
  res.status(upstream.status);
  res.setHeader('content-type', upstream.headers.get('content-type') || 'application/json');
  res.send(body);
}
