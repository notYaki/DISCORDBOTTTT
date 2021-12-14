const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "kick",
  aliases: ["expular"],
  description: "Kickear un Miembro!",
  usage: "Kick <Mention Member>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send(
        `No tienes permiso para hacer eso!`
      );

    let Member = message.mentions.users.first();

    if (!Member)
      return message.channel.send(
        `Menciona a quien quieres expulsar`
      );

    if (!message.guild.members.cache.get(Member.id))
      return message.channel.send(`Escriba una id valida tonto!`);

    if (Member.id === message.author.id)
      return message.channel.send(`No puedes expulsarte at mismo............!`);

    if (Member.id === client.user.id)
      return message.channel.send(`eres gilipollas o que ;-;`);

    if (Member.id === message.guild.owner.user.id)
      return message.channel.send(`No puedes expulsar al owner tonto`);

    let Reason = args.slice(1).join(" ");

    let User = message.guild.member(Member);

    if (!User.kickable)
      return message.channel.send(`No puedo expulsar a ese`);

    try {
      console.log(`Miembro sera expulsado  en nada`);

      setTimeout(function() {
        User.kick({ reason: `${Reason || "No se proporcionó ninguna razón"}` });
      }, 2000);
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`Miembro Expulsado!`)
        .addField(`Moderador`, `${message.author.tag} (${message.author.id}`)
        .addField(`Miembro Expulsado`, `${Member.tag} (${Member.id})`)
        .addField(`Razon`, `${Reason || "No se proporcionó ninguna razón"}`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp();
      if (User && Member.bot === false)
        Member.send(
          `Has sido expulsado de  **${message.guild.name}** Por ${Reason ||
            "No se proporcionó ninguna razón"}`
        );
      message.channel.send(embed);
      console.log(
        `User: ${Member.tag} (${Member.id}) Ha sido  ${
          message.guild.name
        } Por ${Reason || "No se proporcionó ninguna razón"}`
      );
    } catch (error) {
      return message.channel
        .send(
          `No puedo expulsar a ese porque tiene rol mas alot q yp!`
        )
        .then(() => console.log(error));
    }

    //End
  }
};
