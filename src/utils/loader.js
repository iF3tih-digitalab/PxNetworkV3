import fs from 'fs';

export function loadAccounts() {
  const walletFile = './data/wallets.txt';
  const proxyFile = './data/proxy.txt';

  const tokens = fs.existsSync(walletFile) ? fs.readFileSync(walletFile, 'utf-8').split(/\r?\n/).filter(x => x) : [];
  const proxies = fs.existsSync(proxyFile) ? fs.readFileSync(proxyFile, 'utf-8').split(/\r?\n/).filter(x => x) : [];

  return tokens.map((token, i) => ({
    token: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
    proxy: proxies[i] || null
  }));
}
