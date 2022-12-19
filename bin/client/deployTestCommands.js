require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { readdirSync } = require('fs');
const applicationId = process.env.APP_ID;
const guildId = process.env.TEST_GUILD_ID;

const commandArray = [];

const commandFolders = readdirSync('./src/commands');

for (const folder of commandFolders) {
  const commandFiles = readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`../../src/commands/${folder}/${file}`);
    commandArray.push(command.data.toJSON());

    console.log(`Pushed ${command.data.name} to an array`);
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  console.log('...Attempting to put test guild commands');
  try {
    rest.put(Routes.applicationGuildCommands(applicationId, guildId), { body: commandArray });
  }
  catch (err) {
    console.error(err);
  }
  console.log(`Successfully put ${commandArray.length} commands to the test server`);