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
        /* Moderation System */
        user_warnings: {},
        user_warningscount: 0,
        guild_warnings: {},
        guild_casecount: 0,
    });
};
