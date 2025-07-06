// Terminal UI display
export function printBanner() {
  console.clear();
  console.log('==============================');
  console.log(' PX NETWORK AUTO MINING BOT ');
  console.log('==============================');
}

export function updateDashboard(account) {
  console.log(`\n[>] ${account.token.slice(0, 20)}...`);
}

export function logActivity(result) {
  const time = new Date().toLocaleString();
  console.log(`[${time}] ${result.status} - ${result.token.slice(0, 20)}...`);
}