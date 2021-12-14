const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "clear",
  aliases: ["purge", "limpiar"],
  description: "Limpiar tus mensages!",
  usage: "Clear <Message Amount>",
  run: async (client, message, args) => {
    //Start
    message.delete();
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "No tienes permiso para usar ese comando "
      );

    if (!args[0])
      return message.channel.send(`Porfafor escribe cuantos mensajes quieres que borre!`);

    if (isNaN(args[0]))
      return message.channel.send(`Diga un numero tonto!`);

    if (args[0] < 4)
      return message.channel.send(
        `Borralos tu payaso ${args[0]} Que no son tantos !`
      );

    if (args[0] > 100)
      return message.channel.send(
        `No puedo borrar  ${args[0]} Por el limite de discord`
      );

    let Reason = args.slice(1).join(" ") || "No se proporcionó ninguna razón";

    message.channel.bulkDelete(args[0]).then(Message => {
      let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`Mensages Boraddos!`)
        .addField(`Moderador`, `${message.author.tag} (${message.author.id}`)
        .addField(`Canal`, `${message.channel.name} (${message.channel.id}`)
        .addField(`Mensages Borrados`, `${Message.size}`)
        .addField(`Razon`, `${Reason}`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp();
      return message.channel
        .send(embed)
        .then(msg => msg.delete({ timeout: 10000 }));
    });

    //End
  }
};