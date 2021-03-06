////////////////////////////////////
//When a member leaves guild
//this module gets triggered
////////////////////////////////////
module.exports = {
  eventTrigger: async function (c, client, CONFIG, npm) {
    let msg = c.d;

    const gld = await client.guilds.cache.get(msg.guild_id);
    if (!gld) return;

    let embed = new Discord.MessageEmbed()
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${msg.user.id}/${msg.user.avatar}`
      )
      .setColor("DARK_RED")
      .setDescription("Member left")
      .addField("Member:", `${msg.user.username}#${msg.user.discriminator}`)
      .addField("ID:", `${msg.user.id}`)
      .setTimestamp();

    try {
      if ((await getLogs.get(msg.guild_id).gmemdelete) == "ON")
        await client.channels.cache
          .get(await getGuild.get(msg.guild_id).logsChannel)
          .send({ embed });
    } catch (err) {
      console.log("");
    }
  },
};
