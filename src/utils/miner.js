import axios from 'axios';

export async function runMiner({ token, proxy }) {
  const headers = {
    Authorization: token,
    'User-Agent': 'Dart/3.7 (dart:io)',
    'Accept-Encoding': 'gzip'
  };

  const config = {
    headers,
    ...(proxy && { proxy: { host: proxy.split(':')[0], port: parseInt(proxy.split(':')[1]) } })
  };

  const res = await axios.get('https://api.pxmine.com/api/v2/mining/start', config);
  return { status: 'OK', message: res.data || 'Success' };
}
