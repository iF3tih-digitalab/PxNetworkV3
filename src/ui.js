import blessed from 'blessed';
import contrib from 'blessed-contrib';
import { loadAccounts } from './utils/loader.js';
import { runMiner } from './utils/miner.js';
import { getProfile } from './utils/profile.js';

export async function startUI() {
  const screen = blessed.screen();
  const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

  const logs = grid.set(0, 6, 12, 6, contrib.log, {
    label: 'Logs',
    fg: 'green',
    selectedFg: 'green'
  });

  const detail = grid.set(0, 0, 12, 6, blessed.box, {
    label: 'PX Account Info',
    content: 'Loading...',
    tags: true,
    border: { type: 'line' },
    style: { border: { fg: 'cyan' } }
  });

  screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

  const accounts = loadAccounts();
  let index = 0;

  async function showAccount(i) {
    const acc = accounts[i];
    detail.setContent(`{bold}Account ${i + 1}/${accounts.length}{/bold}
Token: ${acc.token.slice(0, 25)}...
Proxy: ${acc.proxy || 'None'}`);

    screen.render();

    try {
      const profile = await getProfile(acc);
      detail.setContent(`{bold}Account ${i + 1}/${accounts.length}{/bold}
Email: ${profile.email}
Points: ${profile.points}
Last Mining: ${profile.last_mining}
Token: ${acc.token.slice(0, 25)}...
Proxy: ${acc.proxy || 'None'}`);
    } catch (e) {
      logs.log(`Error fetch profile: ${e.message}`);
    }

    try {
      const result = await runMiner(acc);
      logs.log(`[${i + 1}] ${result.status}: ${result.message}`);
    } catch (err) {
      logs.log(`[${i + 1}] ERROR: ${err.message}`);
    }

    screen.render();
  }

  screen.key(['left'], () => {
    index = (index - 1 + accounts.length) % accounts.length;
    showAccount(index);
  });

  screen.key(['right'], () => {
    index = (index + 1) % accounts.length;
    showAccount(index);
  });

  await showAccount(index);
}
