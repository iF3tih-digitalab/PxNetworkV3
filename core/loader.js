// Loader module for wallets and proxies
import fs from 'fs';
export function loadWalletsAndProxies() {
  const wallets = fs.readFileSync('./data/wallets.txt', 'utf-8').split('\n').filter(Boolean);
  let proxies = [];
  try {
    proxies = fs.readFileSync('./data/proxy.txt', 'utf-8').split('\n').filter(Boolean);
  } catch {}
  return wallets.map((token, i) => ({ token, proxy: proxies[i] || null }));
}