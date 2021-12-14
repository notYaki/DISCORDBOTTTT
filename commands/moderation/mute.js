const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "mute",
  aliases: [],
  description: "Mutear un Usurio!",
  usage: "Mute <Mention User> | <Reason>",
  run: async (client, message, args) => {
    //Start
    message.delete();

        if (!message.member.hasPermission("MANAGE_SERVER"))
      return message.channel.send(
        `No tienes permiso para mutearlo!`
      );
    
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.channel.send(`Please Mention A User!`);

    let Role = message.guild.roles.cache.find(role => role.name === "Muted").id;

    if (!Role)
      return message.channel.send(
        `Porfa crea un role de muted : Muted`
      );

    if (Member.roles.cache.has(Role)) {
      return message.channel.send(`Ese miembro ya esta muteado no mas no le han avisado!`);
    }

    let Reason = args.slice(1).join(" ");

    let Embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Member Muted!`)
      .addField(`Moderador`, `${message.author.tag} (${message.author.id}`)
      .addField(`Miembro Muteado`, `${Member.user.tag} (${Member.user.id})`)
      .addField(`Razon`, `${Reason || "No se proporcionó ninguna razón!"}`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    if (Role && !Member.roles.cache.has(Role)) {
      Member.roles.add([Role]);
      return message.channel.send(Embed);
    } else {
      return message.channel.send(`Algo ha salido mal intenta luego`);
    }

    //End
  }
};
