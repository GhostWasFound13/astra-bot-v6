module.exports =  [{
    name: "warn",
    info: {
        usage: "warn <user> <reason>",
        description: "Will warn a given user.",
        aliases: ["none"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code: `
  $title[Warned!]
  $description[Warned <@$get[user]> for \`$get[r]\`]
  $addTimeStamp
  $reply
  $color[$getVar[color]]
  $footer[$username - $authorID]

  $setGuildVar[guild_warnings;$getObject[true]]
  $let[gobj;$getObject[true]]
  $addObjectProperty[case_warning_$getGuildVar[guild_casecount];{ "moderator" : "$authorID", "user" : "$get[user]", "reason" : "$get[r]", "datestamp" : "$dateStamp", "deleted" : false, "msg": "$messageURL[$messageID;$channelID]" }]
  $createObject[$getGuildVar[guild_warnings]]
  $setUserVar[user_warnings;$getObject[true];$get[user]]
  $let[uobj;$getObject[true]]
  $setGuildVar[guild_casecount;$sum[$getGuildVar[guild_casecount];1]]
  $setUserVar[user_warningscount;$sum[$getUserVar[user_warningscount;$get[user]];1];$get[user]]
  $addObjectProperty[case_warning_$sum[$getUserVar[user_warningscount;$get[user]];1];{ "moderator" : "$authorID", "user" : "$get[user]", "reason" : "$get[r]", "datestamp" : "$dateStamp", "deleted" : false, "msg": "$messageURL[$messageID;$channelID]" }]
  $createObject[$getUserVar[user_warnings;$get[user]]]
  $let[r;$replaceText[$replaceText[$checkCondition[$message[2]==];true;No reason provided.];false;$replaceText[$replaceText[$replaceText[$message;$get[user];;1];<@;;1];> ;;1]]]
  $onlyIf[$clientID!=$get[user];After all I've done for you.. wow..]
  $onlyIf[$memberExists[$get[user]]==true;I was unable to find that user.]
  $let[user;$findUser[$message[1];false]]
  $onlyIf[$hasAnyPerm[$guildID;$authorID;moderatemembers;manageguild;administrator]==true;You require the \`moderatemembers\` permissions to use this command.]`
  }]
