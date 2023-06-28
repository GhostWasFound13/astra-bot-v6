module.exports = async (client) => {
    const config = require("./config.js");

    await client.variables({
        /* Color for all embeds. */
        color: "Blue",
        /* Client Prefix */
        prefix: config.prefix,
        /* API Key */
        apiKey: config.apiKey,
        /* Moderation System */
        user_warnings: {},
        user_warningscount: 0,
        guild_warnings: {},
        guild_casecount: 0,
    });
};
