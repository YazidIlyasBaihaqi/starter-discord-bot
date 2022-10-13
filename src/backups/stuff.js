
const filePath = path.join(__dirname, "./commands");
const files = await fs.readdir(filePath);
for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) await registerCommands(client, path.join(dir, file));
    if (file.endsWith('.js')) {
        const Command = require(path.join(filePath, file));
        console.log(path.join(filePath, file))
        if (Command instanceof Function) {
            Command(bot, guild, Constants, Eris)
        }
    }
}


// bot.on("interactionCreate", (interaction) => {
//     if (interaction instanceof Eris.CommandInteraction) {
//         console.log(interaction)
//         switch (interaction.data.name) {
//             case "test_edit_command":
//                 interaction.createMessage("interaction recieved");
//                 return bot.editCommand(interaction.data.id, {
//                     name: "edited_test_command",
//                     description: "Test command that was edited by running test_edit_command"
//                 });
//             case "test_delete_command":
//                 interaction.createMessage("interaction recieved");
//                 return bot.deleteCommand(interaction.data.id);
//             default: {
//                 return interaction.createMessage("interaction recieved");
//             }
//         }
//     }
// });

async function registerCommands(dir) {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) await registerCommands(client, path.join(dir, file));
        if (file.endsWith('.js')) {
            const Command = require(path.join(filePath, file));
            console.log(path.join(filePath, file))
            if (Command instanceof Function) {
                Command(bot, Eris)
            }
        }
    }
}

async function registerEvents(dir) {
    const filePath = path.join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        if (file.endsWith('.js')) {
            const Event = require(path.join(filePath, file));
            if (Event instanceof Function) {
                return Event()
            }
        }
    }
}

// bot.on("ready", () => { // When the bot is ready
//     (async () => {
//         await registerCommands("./commands");
//         const database_guild = await Guilds.find();
//         database_guild.map(function (guild) {
//             return bot.registerGuildPrefix(guild.guildID, guild.prefix)
//         })
//         console.log(bot.guildPrefixes)
//     })();
//     console.log(`${bot.user} ready`);
//     // Log "Ready!"
// });
