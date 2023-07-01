module.exports = [{
	name: "ban",
    info: {
        usage: "ban <user> <days> <reason>",
        description: "Bans a given user.",
        aliases: ["command"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks", "banmembers"]
    },
    $if: "old",
    code: `
$if[$isNumber[$replaceText[$message[2];d;]]==false]
$ban[$guildID;$findUser[$message[1];false];0;$replaceText[$get[reason]; ;;1] - Banned by $username[$authorID] ($authorID)]
Banned <@!$findUser[$message[1];false]>. They are the **$ordinal[$banCount]** banned person of this guild.
$let[reason;$replaceText[$replaceText[$checkCondition[$replaceText[$message;$message[1];]==];true;No  reason provided];false;$replaceText[$message;$message[1];]]]
$elseif[$isNumber[$replaceText[$message[2];d;]]==true]
$ban[$guildID;$findUser[$message[1];false];$replaceText[$message[2];d;];$replaceText[$get[reason]; ;;1] - Banned by $username[$authorID] ($authorID)]
Banned <@!$findUser[$message[1];false]> and deleted their messages of the last \`$replaceText[$message[2];d;]\` days. They are the **$ordinal[$banCount]** banned person of this guild.
$onlyIf[$replaceText[$message[2];d;]<8;Invalid command usage. \`$getGuildVar[prefix]ban user deletionDays? reason?\`
Invalid time provided, can't be above 7 days.
]
$let[reason;$replaceText[$replaceText[$checkCondition[$replaceText[$replaceText[$message;$message[1];];$message[2];]== ];true;No reason provided];false;$replaceText[$replaceText[$message;$message[1];];$message[2];]]]
$onlyIf[$checkCondition[$message[2]==||$isNumber[$replaceText[$message[2];d;]]==true]==true;Invalid command usage. \`$getGuildVar[prefix]ban user deletionDays? reason?\`
Invalid time provided.
]
$endelseif
$endif
$setGuildVar[guild_warnings;$getObject[true]]
$let[gobj;$getObject[true]]
$addObjectProperty[case_ban_$getGuildVar[guild_casecount];{ "moderator" : "$authorID", "user" : "$findUser[$message[1];false]", "reason" : "$replaceText[$replaceText[$checkCondition[$replaceText[$replaceText[$message;$message[1];];$message[2];]== ];true;No reason provided];false;$replaceText[$replaceText[$message;$message[1];];$message[2];]]", "datestamp" : "$dateStamp", "deleted" : false, "msg": "$messageURL[$messageID;$channelID]" }]
$createObject[$getGuildVar[guild_warnings]]
$setUserVar[user_warnings;$getObject[true];$get[user]]
$let[uobj;$getObject[true]]
$setGuildVar[guild_casecount;$sum[$getGuildVar[guild_casecount];1]]
$setUserVar[user_warningscount;$sum[$getUserVar[user_warningscount;$get[user]];1];$get[user]]
$addObjectProperty[case_warning_$sum[$getUserVar[user_warningscount;$get[user]];1];{ "moderator" : "$authorID", "user" : "$findUser[$message[1];false]", "reason" : "$replaceText[$replaceText[$checkCondition[$replaceText[$replaceText[$message;$message[1];];$message[2];]== ];true;No reason provided];false;$replaceText[$replaceText[$message;$message[1];];$message[2];]]", "datestamp" : "$dateStamp", "deleted" : false, "msg": "$messageURL[$messageID;$channelID]" }]
$createObject[$getUserVar[user_warnings;$get[user]]]
$disableMentionType[everyone]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$findUser[$message[1];false]]];Invalid command usage. \`$getGuildVar[prefix]ban user deletionDays? reason?\`
You can't ban someone with a higher role.
]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];false]]];Invalid command usage. \`$getGuildVar[prefix]ban user deletionDays? reason?\`
I can't ban someone who's above my highest role.
]
$onlyIf[$findUser[$message[1];false]!=$clientID;Invalid command usage. \`$getGuildVar[prefix]ban user deletionDays? reason?\`
Nice try, but I won't ban myself.
]
$onlyIf[$findUser[$message[1];false]!=$authorID;Invalid command usage. \`$getGuildVar[prefix]ban user deletionDays? reason?\`
You can't ban yourself.
]
$onlyIf[$findUser[$message[1];false]!=;Invalid command usage. \`$getGuildVar[prefix]ban user deletionDays? reason?\`
Invalid user provided.
]
$onlyIf[$hasPerms[$guildID;$authorID;administrator]==true;You require \`administrator\` permissions to use this command.]`
}, {
    name: "unban",
    info: {
        usage: "unban <user>´´",
        description: "Unbans a given user.",
        aliases: ["command"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks", "banmembers"]
    },
    code: `
    $title[Unban]
    $description[Unbanned <@$findUser[$message;false]> successfully.]
    $color[$getVar[color]]
    $addTimestamp
    $footer[$username - $authorID]
    $unban[$guildID;$findUser[$message;false]]
    $onlyIf[$isBanned[906906276712300554;$findUser[$message;false]]==true;User is not banned.]
    $onlyIf[$memberExists[$findUser[$message;false]]==true;Invalid command usage, \`$getGuildVar[prefix]unban user\`]
    $onlyIf[$hasPerms[$guildID;$authorID;banmembers]==true;You require \`banmembers\` permissions to use this command.]`
}]
