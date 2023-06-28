module.exports = ({
    name: "$createAutomodRule",
    type: "djs",
    code: async (d) => {
      const data = d.util.aoiFunc(d);
      const client = require("../clientReady");
      const [guildID, ruleName, triggerType = "1", eventType = "1", actionType = "1", enableRule = "true", ...rest] = data.inside.splits;
  
      const triggerTypeInt = parseInt(triggerType);
      const eventTypeInt = parseInt(eventType);
      const actionTypeInt = parseInt(actionType);
      const guild = client.guilds.cache.get(guildID);
  
      if (isNaN(triggerTypeInt) || isNaN(eventTypeInt) || isNaN(actionTypeInt)) {
        return d.aoiError.fnError(d, "custom", {}, "Invalid argument(s). Expected integers for triggerType, eventType, and actionType.");
      }
  
      const triggerMetadata = {
        keywordFilter: rest.slice(0, rest.length - (rest.length > 2 ? 2 : 0)),
        regexPatterns: [],
        presets: [],
        allowList: [],
        mentionTotalLimit: null,
      };
  
      const actions = [
        {
          type: actionTypeInt,
          reason: "Auto moderation rule",
          metadata: {},
        },
      ];
  
      const exemptRoles = rest.length > 1 ? rest[rest.length - 2].split(",") : [];
      const exemptChannels = rest.length > 1 ? rest[rest.length - 1].split(",") : [];
  
      const autoModRule = await guild.autoModerationRules.create({
        name: ruleName,
        eventType: eventTypeInt,
        triggerType: triggerTypeInt,
        triggerMetadata,
        actions,
        enabled: enableRule === "true",
        exempt_roles: exemptRoles,
        exempt_channels: exemptChannels,
      });
  
      return {
        code: d.util.setCode(data),
      };
    },
});
