// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Options, userMention } = require('discord.js');
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

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'thank') {
        const user = options.getUser('user');
        if (user) {
            await interaction.reply(`thenk you *:)* \nheres a wotamelo for ya :watermelon:, <@${user.id}>!`);
        } else {
            await interaction.reply('puck off...');
        }
    }
});

// Prints out the message content in the console
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
            name: 'thank',
            description: 'Thanks user with watermelon',
            options: [{
                name: 'user',
                type: 6,
                description: 'specify user',
                required: false,
            }],
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