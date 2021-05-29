const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const client = new Client({ intents: [Intents.NON_PRIVILEGED] });
const wait = require("util").promisify(setTimeout);
const fs = require("fs");
const { token } = require("./config.json");

// This bot uses the #message-components branch of monbrey's discord.js fork which adds support for message components

client.on(`ready`, () => {
  console.log(`click click click`);
  client.user.setActivity(`in ${client.guilds.cache.size} servers`);
});

client.on(`message`, async (msg) => {
  // if (msg.author.id !== `279032930926592000`) return;
  if (msg.content == `!counter`) {
    await msg.channel.send({
      content: "Click this",
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: "Click me!",
              style: 1,
              custom_id: "primary",
            },
          ],
        },
      ],
    });
  }
});

client.on(`interaction`, async (interaction) => {
  let raw = fs.readFileSync("./count.json");
  let jsonData = JSON.parse(raw);
  if (
    !interaction.isMessageComponent() &&
    interaction.componentType !== "BUTTON"
  )
    return;
  if (interaction.customID === "primary") {
    jsonData.count++;
    await interaction.update("Click this", {
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: `${jsonData.count}`,
              style: 1,
              custom_id: "primary",
            },
          ],
        },
      ],
    });
    fs.writeFileSync("./count.json", JSON.stringify(jsonData, null, 2));
  }
});

client.login(token);
