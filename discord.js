import Discord, { Channel, MessageEmbed } from "discord.js";
const client = new Discord.Client();
import "dotenv/config";
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  if (message.content === "-delete") {
    let fetched;
    fetched = await message.channel.messages.fetch({ limit: 100 });
    message.channel.bulkDelete(fetched, true);
    console.log(fetched);
  }
});
client.login(process.env.BOT_TOKEN);
