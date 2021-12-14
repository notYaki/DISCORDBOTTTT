const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "ban",
  aliases: [],
  description: "Banear  un Miembro!",
  usage: "Ban <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        `No tienes permiso para usar eso!`
      );

    let Member = message.mentions.users.first();

    if (!Member)
      return message.channel.send(
        `Profavor menciona el usuario que quieres banear`
      );

    if (!message.guild.members.cache.get(Member.id))
      return message.channel.send(`Profavor ecribe una id valida`);

    if (Member.id === message.author.id)
      return message.channel.send(`No puedes banearte at mismo payaso`);

    if (Member.id === client.user.id)
      return message.channel.send(`Ami no, payaso estupido gilipollas tonto ;-;`);

    if (Member.id === message.guild.owner.user.id)
      return message.channel.send(`No puedes banear a faisal, tonto`);

    let Reason = args.slice(1).join(" ");

    let User = message.guild.member(Member);

    if (!User.bannable) return message.channel.send(`I Can't Ban That Member!`);

    try {
      console.log(`Member Is Going To Get Ban!`);
      setTimeout(function() {
        User.ban({ reason: `${Reason || "No se proporcionó ninguna razón!"}` });
      }, 2000);
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`Miembro  Baneado!`)
        .addField(`Moderador`, `${message.author.tag} (${message.author.id}`)
        .addField(`miembro baneado`, `${Member.tag} (${Member.id})`)
        .addField(`Razon`, `${Reason || "No se proporcionó ninguna razón!"}`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp();
      if (User && Member.bot === false)
        Member.send(
          `Has sido baneado de  **${message.guild.name}** Por ${Reason ||
            "No se proporcionó ninguna razón!"}`
        );
      message.channel.send(embed);
      console.log(
        `User: ${Member.tag} (${Member.id}) Ha sido baneado de ${
          message.guild.name
        } por ${Reason || "No se proporcionó ninguna razón!"}`
      );
    } catch (error) {
      return message.channel
        .send(
          `No puedo banear ese miembro porque tiene un rol mas alto que el mio!`
        )
        .then(() => console.log(error));
    }

    //End
  }
};
