export default async function handler(req: any, res: any) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const rawPath = req.query?.path;
  const filePath = Array.isArray(rawPath)
    ? rawPath.join('/')
    : typeof rawPath === 'string'
      ? rawPath
      : '';

  if (!filePath || filePath.includes('..')) {
    res.status(400).json({ error: 'Invalid asset path' });
    return;
  }

  const r2BaseUrl = (process.env.CLOUD_FLARE_R2_BASE_URL || '').replace(/\/$/, '');
  if (!r2BaseUrl) {
    res.status(500).json({ error: 'Missing CLOUD_FLARE_R2_BASE_URL' });
    return;
  }

  const upstreamUrl = `${r2BaseUrl}/${filePath}`;
  const upstreamHeaders: Record<string, string> = {};
  const rangeHeader = req.headers?.range;

  if (typeof rangeHeader === 'string' && rangeHeader.length > 0) {
    upstreamHeaders.Range = rangeHeader;
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: req.method,
      headers: upstreamHeaders,
    });

    const passthroughHeaders = [
      'content-type',
      'content-length',
      'content-range',
      'accept-ranges',
      'cache-control',
      'etag',
      'last-modified',
    ];

    passthroughHeaders.forEach((headerName) => {
      const value = upstreamResponse.headers.get(headerName);
      if (value) {
        res.setHeader(headerName, value);
      }
    });

    res.status(upstreamResponse.status);

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    const bodyBuffer = Buffer.from(await upstreamResponse.arrayBuffer());
    res.end(bodyBuffer);
  } catch {
    res.status(502).json({ error: 'Failed to load asset' });
  }
}
