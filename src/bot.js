require('dotenv').config();

const Embeds = require('./utilities/Embeds');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { readdirSync } = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers] });

client.commands = new Collection();
client.devCommands = new Collection();
client.events = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
client.modals = new Collection();
client.embeds = Embeds;

client.botSettings = new Collection();
client.modWarnings = new Collection();
client.modMutes = new Collection();
client.modBans = new Collection();

client.testWarnings = new Collection();
client.testBans = new Collection();

client.embedCache = new Collection();

require('./properties/settingsProperties')(client.botSettings);
require('./properties/warningProperties')(client.modWarnings);
//require('./properties/kickProperties')(client.modKicks);
//require('./properties/banProperties')(client.modBans);

const functionFolders = readdirSync('./src/functions');

for (const folder of functionFolders) {
  const functionFiles = readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));

  switch (folder) {
    case 'client':
      for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
      }
      break;
  
    default:
      break;
  }
}

client.syncCommands();
client.handleEvents();
client.syncComponents();
client.login(process.env.TOKEN);