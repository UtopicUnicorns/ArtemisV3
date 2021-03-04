////////////////////////////////////
//We define Category name, Command name, Description
//Permission level and full explanation here
////////////////////////////////////
module.exports = {
  category: "server",
  name: "react",
  description: "react",
  permission: "1",
  explain: "react",

  ////////////////////////////////////
  //We pass trough some predefined things
  //Within this command we can work with Client, raw content and a config file
  ////////////////////////////////////
  async execute(msg, client, CONFIG, npm, mmbr) {
    ////////////////////////////////////
    //We fetch the channel here
    //We can easely send with this const
    ////////////////////////////////////
    const snd = await client.channels.cache.get(msg.channel_id);

    ////////////////////////////////////
    //Defining the arguments here
    //Splits can happen later if needed
    ////////////////////////////////////
    const prefix = await CONFIG.PREFIX("PREFIX", msg.guild_id);
    const comName = module.exports.name;
    const arguments = await msg.content.slice(
      prefix.length + comName.length + 1
    );

    ////////////////////////////////////
    //Main command starts here
    //Comments might get smaller here
    ////////////////////////////////////
    const gld = await client.guilds.cache.get(msg.guild_id); //Get guild
    if (!gld) return;

    let msgID = arguments.split("--message=");

    if (!msgID[1]) return snd.send("You have not entered a message id!");

    try {
      let fetchMsg = await client.channels.cache
        .get(msg.channel_id)
        .messages.fetch(msgID[1]);
    } catch (err) {
      return snd.send(
        "The message ID you provided is invalid or not in this channel!"
      );
    }

    let fetchMsg = await client.channels.cache
      .get(msg.channel_id)
      .messages.fetch(msgID[1]);

    if (!fetchMsg)
      return snd.send(
        "The message ID you provided is invalid or not in this channel!"
      );

    let args = msgID[0].split(" ");

    for (let i of args) {
      em = i
        .replace("<", "")
        .replace("@", "")
        .replace("&", "")
        .replace("!", "")
        .replace(">", "")
        .replace(/ /g, "");
      if (em) {
        if (em.startsWith(":")) {
          em = em.split(":");

          if (em[2]) {
            em = em[2];

            emoji = client.emojis.cache.get(em);

            try {
              await fetchMsg.react(emoji);
            } catch (err) {
              console.log("");
            }
          }
        } else {
          emoji = em;

          try {
            await fetchMsg.react(emoji);
          } catch (err) {
            console.log("");
          }
        }
      }
    }
  },
};
