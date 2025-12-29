const mineflayer = require('mineflayer');
console.log('Starting...');
const args = process.argv.slice(2);
const HOST = args[0] || 'localhost';
const PORT = parseInt(args[1] || '25565');
const USERNAME = '24ATERNOSBOT';
const VERSION = false;
function createBot () {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: VERSION
  });
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    switch (message) {
      case ';start':
        bot.chat('24 ATERNOS > Bot started! - Made By Minet15');
        bot.setControlState('forward', true);
        bot.setControlState('jump', true);
        bot.setControlState('sprint', true);
        break;
      case ';stop':
        bot.chat('24 ATERNOS > Bot stopped! - Made By Minet15');
        bot.clearControlStates();
        break;
    }
  });
  bot.on('spawn', () => {
    bot.chat('Bot > Spawned');
  });
  bot.on('death', () => {
    bot.chat('Bot > I died, respawn');
  });
  bot.on('kicked', (reason, loggedIn) => console.log('Kicked:', reason, loggedIn));
  bot.on('error', err => console.log('Error:', err));
  bot.on('end', () => {
    console.log('Disconnected, reconnecting...');
    setTimeout(createBot, 5000);
  });
}
createBot();
