const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "unmute",
  aliases: [],
  description: "Unmute A User!",
  usage: "Unmute <Mention User>",
  run: async (client, message, args) => {
    //Start
    message.delete();

        if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        `No puedes usar ese comando !`
      );
    
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`Profavor menciona a un usuario!`);

    let Role = message.guild.roles.cache.find(role => role.name === "Muted").id;

    if (!Role)
      return message.channel.send(
        `El miembro ha sido desmuteado`
      );

    if (!Member.roles.cache.has(Role)) {
      return message.channel.send(`Es miembro no esta muteado`);
    }

    let Embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Miembro Desmuteado!`)
      .addField(`Moderador`, `${message.author.tag} (${message.author.id}`)
      .addField(`Miembro Demuteado`, `${Member.user.tag} (${Member.user.id})`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    if (Role && Member.roles.cache.has(Role)) {
      Member.roles.remove([Role]);
      return message.channel.send(Embed);
    } else {
      return message.channel.send(`Algio salio mal intenta luego`);
    }

    //End
  }
};
