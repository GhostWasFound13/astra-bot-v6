module.exports = async (client) => {
    const config = require("./config.js");

    await client.variables({
        /* Color for all embeds. */
        color: "Blue",
        /* Client Prefix */
        prefix: config.prefix,
        /* API Key */
        apiKey: config.apiKey,
        /* music System */
        leave_music: "left the voice channel.",
        autoplay: "false",
      music_channelID: "null",
      music_player: "null",
      yes_emoji: "✅",
      volume: "100",
      authorbutton: "0",
      play_pause: "none",
      loop: "none",
        /* Moderation System */
        user_warnings: {},
        user_warningscount: 0,
        guild_warnings: {},
        guild_casecount: 0,
        /* ticket system */
        tick_e: "false",
        tick_r: "",
        tick: "false",
        tick_c: "0",
       transcript_channel: "$channelID",
       tick_describe: "Hey, this is your ticket. Support will arrive shortly.",
       panel_title: "Open a ticket",
       ticket_title: "Ticket",
       panel_desc: "Click the button to open a ticket!",
       button_name: "Open ticket",
       ch_name: "tick",
       auto_tran: "false"
    });
};
