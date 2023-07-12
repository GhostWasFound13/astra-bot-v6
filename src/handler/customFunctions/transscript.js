module.exports = ({
//)bot.functionManager.createFunction({
  name: "$transcript",
  type: "djs",
  code: async d => {
    const discordTranscripts = require("discord-html-transcripts");
    const data = d.util.aoiFunc(d);
    const [channel = d.message.channel.id, logchannel = d.message.channel.id] = data.inside.splits;
    let channelid = await d.util.getChannel(d, channel);
    let loggingid = await d.util.getChannel(d, logchannel);
    const attachment = await discordTranscripts.createTranscript(channelid, {
      filename: "transcript.html",
      saveImages: true,
      poweredBy: false,
    });

    const f = await loggingid.send({
      files: [attachment],
    });

    data.result = f;
    return {
      code: d.util.setCode(data),
    };
  }
});
