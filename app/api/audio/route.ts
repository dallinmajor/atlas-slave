import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const passthroughHeaders = [
  'content-type',
  'content-length',
  'content-range',
  'accept-ranges',
  'cache-control',
  'etag',
  'last-modified',
];

const getSafePath = (rawPath: string) => {
  if (!rawPath || rawPath.includes('..')) {
    return '';
  }

  return rawPath
    .split('/')
    .map((segment) => {
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return segment;
      }
    })
    .join('/');
};

const handleProxy = async (request: NextRequest) => {
  const filePath = getSafePath(request.nextUrl.searchParams.get('path') ?? '');

  if (!filePath) {
    return NextResponse.json({ error: 'Invalid asset path' }, { status: 400 });
  }

  const r2BaseUrl = (
    process.env.CLOUD_FLARE_R2_BASE_URL ||
    process.env.VITE_CLOUD_FLARE_R2_BASE_URL ||
    ''
  ).replace(/\/$/, '');

  if (!r2BaseUrl) {
    return NextResponse.json(
      {
        error: 'Missing Cloudflare base URL env var',
        hint: 'Set CLOUD_FLARE_R2_BASE_URL (or VITE_CLOUD_FLARE_R2_BASE_URL) in Vercel Project Settings.',
      },
      { status: 500 },
    );
  }

  const upstreamUrl = `${r2BaseUrl}/${filePath}`;
  const upstreamHeaders: Record<string, string> = {};
  const rangeHeader = request.headers.get('range');

  if (rangeHeader) {
    upstreamHeaders.Range = rangeHeader;
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: request.method,
      headers: upstreamHeaders,
    });

    const headers = new Headers();
    passthroughHeaders.forEach((headerName) => {
      const value = upstreamResponse.headers.get(headerName);
      if (value) {
        headers.set(headerName, value);
      }
    });

    if (request.method === 'HEAD') {
      return new NextResponse(null, {
        status: upstreamResponse.status,
        headers,
      });
    }

    const body = await upstreamResponse.arrayBuffer();
    return new NextResponse(body, {
      status: upstreamResponse.status,
      headers,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown proxy failure';
    return NextResponse.json(
      { error: 'Failed to load asset', detail: message },
      { status: 502 },
    );
  }
};

export const GET = handleProxy;
export const HEAD = handleProxy;