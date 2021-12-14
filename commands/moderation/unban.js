const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "unban",
  aliases: [],
  description: "Desbanear un Miembro!",
  usage: "Unban <Member ID>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        `No tienes permiso para hacer eso`
      );

    if (!args[0])
      return message.channel.send(
        `Porfavor dame una id del miembro que quieres desbanear!`
      );

    if (isNaN(args[0])) return message.channel.send(`Profa dame una id valida!`);

    if (args[0] === message.author.id)
      return message.channel.send(`si quieres que te banee hazlo otra vez y veras tonto`);

    if (args[0] === message.guild.owner.user.id)
      return message.channel.send(`que haces tio`);

    if (args[0] === client.user.id)
      return message.channel.send(`No ves que estoy aqui tonto!`);

    let FetchBan = await message.guild.fetchBans();

    let Member;
    Member =
      FetchBan.find(
        b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      FetchBan.get(args[0]) ||
      FetchBan.find(
        bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase()
      );

    if (!Member)
      return message.channel.send(
        "Profa dame una id valida o el miembro no esta baneado"
      );

    let Reason = args.slice(1).join(" ") || "No se proporcionó ninguna razón!";

    try {
      message.guild.members.unban(Member.user.id, Reason);
    } catch (error) {
      return message.channel.send(
        `No puedo desbanear ese miembro o no esta baneado `
      );
    }

    let embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Miembro Desbaneado!`)
      .addField(`Moderador`, `${message.author.tag} (${message.author.id}}`)
      .addField(`Miembro Desbaneado`, `${Member.user.tag} (${Member.user.id}`)
      .addField(`Razon`, `${Reason || "No se proporcionó ninguna razón!"}`)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

    return message.channel.send(embed);

    //End
  }
};