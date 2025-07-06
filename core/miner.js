// Miner logic
import axios from 'axios';
export async function runMiner({ token, proxy }) {
  const res = await axios.get('https://api.pxmine.com/api/v2/mining/start', {
    headers: {
      Authorization: token,
      'User-Agent': 'Dart/3.7 (dart:io)',
    },
    proxy: proxy ? { host: proxy.split(':')[0], port: Number(proxy.split(':')[1]) } : false,
  });
  return { status: 'OK', token, data: res.data };
}