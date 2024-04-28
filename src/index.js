// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


// Create a new REST client
const rest = new REST({ version: '10' }).setToken(token);


// Create a new client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, readyClient => {
    console.log(`${readyClient.user.tag} has arose from the ashes!`);
});

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        console.log("heyfang");
        interaction.reply('wotamelon!');
    }
});

// Prints out the message content to the console
/*
client.on('messageCreate', (message) => {
    console.log(message.author.tag + ': ' + message.content + '   (' + message.createdAt.toDateString() + ')');
    }
);
*/


// Log in to Discord with your client's token
client.login(token);

async function main (){
    const commands = [
        {
            name: 'ping',
            description: 'Replies with Pong!',
        },
    ];
    try{

        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');

    } catch (error){
        console.error(error);
    }
}

main();