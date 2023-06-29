module.exports = [{
    name: "panel", 
    info: {
        usage: "warn <user> <reason>",
        description: "Will warn a given user.",
        aliases: ["none"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code: `
$title[1;Support Buttons] $description[1;Here is the ticket panel for support Team] $color[1;Blue] 
$addButton[1;Transcript;primary;transcript;false]
$addButton[1;Close;danger;close;false] 
$addButton[1;Claim;primary;claim;$if[$channelTopic==none;false;true]] 
$onlyif[$advancedTextSplit[$getChannelVar[tick];-;1]==true;{newEmbed:{title:Error}{description:This channel is not a ticket}{color:Red}}{extraOptions:{delete:5s}}]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{
    name: "set-role", 
    info: {
        usage: "warn <user> <reason>",
        description: "Will warn a given user.",
        aliases: ["none"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    aliases: ['ticket-role','tick-role'], 
    code: `
$setGuildVar[tick_r;$findRole[$message[1]]] I set $roleName[$findRole[$message[1]]] as a ticket role 
$onlyif[$roleExists[$findRole[$message[1]]]==true;Please provide a valid role] 
$onlyPerms[administrator;You don't have \`ADMIN\` perms{extraOptions:{delete:5s}}]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{ 
    name: "set-category", 
    aliases: ['ticket-category','tick-category'], 
   info: {
        usage: "set-category (category)?,",
        description: "create ticket category",
        aliases: ["none"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    }, 
    code: `
$setGuildVar[tick_c;$findChannel[$message[1]]] I set <#$findChannel[$message[1]]> as a ticket category 
$onlyif[$channelType[$findChannel[$message[1]]]==category;Please sepcify a category channel] 
$onlyif[$channelExists[$findChannel[$message[1]]]==true;Please provide a valid channel] 
$onlyPerms[administrator;You don't have \`ADMIN\` perms{extraOptions:{delete:5s}}]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{
    name: "remove-ticket-role", 
    aliases: ['remove-tick-role','remove-role'], 
    info: {
        usage: "removed ticket role",
        description: "Will warn a
            ",
        aliases: ["none"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code: `
    
$setGuildVar[tick_r;] Successfully removed the ticket role 
$onlyPerms[administrator;You don't have \`ADMIN\` perms]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{ 
    name: "remove-category",
    code: `
$setGuildVar[tick_c;] Successfully removed the ticket category 
$onlyPerms[administrator;You don't have \`ADMIN\` perms]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{ 
        name: "ticket", 
        aliases: ['tick-panel','ticket-panel'], 
        code: `
$channelSendMessage[$channelID;Successfully setup the ticket panel] 
$usechannel[$findChannel[$message[1];yes]] 
$color[1;ed3491] $title[1;$getGuildVar[panel_title]] $description[1;$getGuildVar[panel_desc]] $footer[1;$username[$clientID] ticket system;$userAvatar[$clientID]] 
$addButton[1;$getGuildVar[button_name];primary;tick;false;ðŸ“¨]
$onlyIf[$message[1]!=;Plz enter a valid channel\n\`!!ticket [mention channel]\`]
$onlyif[$getGuildVar[tick_r]!=;Plz set ticket role by using \`!!set-role [@role]\`]
$onlyif[$getGuildVar[tick]==true;Ticket system is disabled, tell an admin to run \`$getGuildVar[prefix]enable-ticket\`{extraOptions:{delete:5s}}]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{
    name: "enable-ticket", 
    info: {
        usage: "warn <user> <reason>",
        description: "Will warn a given user.",
        aliases: ["none"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code: `
$setGuildVar[tick;true] 
Successfully enabled ticket system 
$onlyPerms[administrator;You don't have \`ADMIN\` perms]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{ 
    name: "disable-ticket", 
    info: {
        usage: "warn <user> <reason>",
        description: "Will warn a given user.",
        aliases: ["none"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code: `
$setGuildVar[tick;false] 
Successfully disabled ticket system 
$onlyPerms[administrator;You don't have \`ADMIN\` perms]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{ 
    name: "claim", 
    code: `
$setChannelTopic[$channelID;ðŸ–ï¸ This channel/ticket has been claimed by <@$authorID>] 
$modifyChannelPerms[$channelID;$guildID;-sendmessages] 
$modifyChannelPerms[$channelID;$authorID;+sendmessages] 
$modifyChannelPerms[$channelID;$advancedTextSplit[$getChannelVar[tick];-;2];+sendmessages] 
$title[1;Claimed] $description[1;This channel/ticket has been claimed by <@$authorID>] $color[1;Blue] 
$onlyif[$channelTopic==none;{newEmbed:{title:Error}{description:This ticket is already claimed}{color:Red}}] 
$onlyif[$getUserVar[tick]!=$channelID;{newEmbed:{title:Error}{description:You can't claim your own ticket}{color:Red}}{extraOptions:{delete:5s}}] 
$onlyIf[$hasRoles[$guildID;$authorID;$findRole[$getGuildVar[tick_r]]]==true;You need $roleName[$getGuildVar[tick_r]] role to use this command{extraOptions:{delete:5s}}]
$onlyif[$advancedTextSplit[$getChannelVar[tick];-;1]==true;{newEmbed:{title:Error}{description:This channel is not a ticket}{color:Red}}{extraOptions:{delete:5s}}]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{
    name: "transcript-channel",
    aliases: ["trans-ch", "tran-ch"],
    info: {
        usage: "transcript-channel <channel>",
        description: "setup transcript channel.",
        aliases: ["trans-ch"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code: `
$sendMessage[Transcript Channel has been set to <#$getGuildVar[transcript_channel]>
$setGuildVar[transcript_channel;$mentionedChannels[1;true]]
$onlyPerms[administrator;You don't have \`ADMIN\` perms]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{
    name: "transcript",
   info: {
        usage: "transcript <>",
        description: "transscript idk.",
        aliases: ["none"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    }, 
    code: `
$djsEval[(async () => {
  const discordTranscripts = require("discord-html-transcripts");
  const channel = client.channels.cache.get("$channelID");
  const ch = client.channels.cache.get("$getGuildVar[transcript_channel]");
  const attachment = await discordTranscripts.createTranscript(channel, {
      filename: "transcript.html",
      saveImages: true, 
      poweredBy: false
  });
  ch.send({
    files: [attachment]
  });
})();false]


$sendMessage[Creating Transcript...]
$onlyIf[$getGuildVar[transcript_channel]!=;Plz set the transcript channel using \`!!tran-ch [mentionchannel]\`]
$onlyIf[$hasRoles[$guildID;$authorID;$findRole[$getGuildVar[tick_r]]]==true;You need $roleName[$getGuildVar[tick_r]] role to use this command{extraOptions:{delete:5s}}]
$onlyif[$advancedTextSplit[$getChannelVar[tick];-;1]==true;{newEmbed:{title:Error}{description:This channel is not a ticket}{color:Red}}{extraOptions:{delete:5s}}]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
}, {
    name: "transcript",
    type: "interaction",
    prototype: "button",
    code: `
$djsEval[(async () => {
 const discordTranscripts = require("discord-html-transcripts");


  const channel = client.channels.cache.get("$interactionData[channel.id]");

  const ch = client.channels.cache.get("$getGuildVar[transcript_channel]");

  const attachment = await discordTranscripts.createTranscript(channel, {
      filename: "transcript.html",
      saveImages: true, 
      poweredBy: false
  });

  ch.send({
    files: [attachment]
  });

})();false]


$interactionReply[Creating Transcript...]

$onlyIf[$getGuildVar[transcript_channel]!=;Plz set the transcript channel using \`!!tran-ch [mentionchannel]\`]

$onlyIf[$hasRoles[$guildID;$authorID;$findRole[$getGuildVar[tick_r]]]==true;You need $roleName[$getGuildVar[tick_r]] role to use this command{extraOptions:{delete:5s}}]

$onlyif[$advancedTextSplit[$getChannelVar[tick];-;1]==true;{newEmbed:{title:Error}{description:This channel is not a ticket}{color:Red}}{extraOptions:{delete:5s}}]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
}, {
    name: "close", 
    code: `
$djsEval[(async () => {
 const discordTranscripts = require("discord-html-transcripts");


  const channel = client.channels.cache.get("$channelID");

  const ch = client.channels.cache.get("$getGuildVar[transcript_channel]");

  const attachment = await discordTranscripts.createTranscript(channel, {
      filename: "transcript.html",
      saveImages: true, 
      poweredBy: false
  });

  ch.send({
    files: [attachment]
  });

})();false]
$onlyIf[$getGuildVar[auto_tran]==true;]
$deleteChannel[$channelID] 
$wait[10s] 
$channelSendMessage[$channelID;{newEmbed:{title:Close Ticket}{description:ðŸ”’ This ticket will close in 10s}{color:Red}}] 

$onlyif[$advancedTextSplit[$getChannelVar[tick];-;1]==true;{newEmbed:{title:Error}{description:This channel is not a ticket}{color:Red}}{extraOptions:{delete:5s}}]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{ 
    name: "close", 
    type: "interaction", 
    prototype: "button", 
    code: `
$djsEval[(async () => {

 const discordTranscripts = require("discord-html-transcripts");

  const channel = client.channels.cache.get("$interactionData[channel.id]");

  const ch = client.channels.cache.get("$getGuildVar[transcript_channel]");

  const attachment = await discordTranscripts.createTranscript(channel, {

      filename: "transcript.html",

      saveImages: true, 

      poweredBy: false

  });

  ch.send({

    files: [attachment]

  });

})();false]
$onlyIf[$getGuildVar[auto_tran]==true;]
$deleteChannel[$channelID] 
$wait[10s] 
$interactionReply[;{newEmbed:{title:Close Ticket}{description:ðŸ”’ This ticket will close in 10s}{color:Red}}]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{ 
    name: "claim", 
    type: "interaction", 
    prototype: "button", 
    code: `
$setChannelTopic[$channelID;This channel/ticket has been claimed by <@$authorID>] 
$modifyChannelPerms[$channelID;$guildID;-sendmessages] 
$modifyChannelPerms[$channelID;$authorID;+sendmessages] 
$modifyChannelPerms[$channelID;$advancedTextSplit[$getChannelVar[tick];-;2];+sendmessages] 
$interactionReply[;{newEmbed:{title:Claimed}{description:This channel/ticket has been claimed by <@$authorID>}{color:Blue}}]
$onlyif[$channelTopic==none;{newEmbed:{title:Error}{description:$channelTopic}{color:Red}}{extraOptions:{delete:5s}}] 
$onlyIf[$hasRoles[$guildID;$authorID;$findRole[$getGuildVar[tick_r]]]==true;You need $roleName[$getGuildVar[tick_r]] role to use this command{extraOptions:{delete:5s}}]
$onlyif[$getUserVar[tick]!=$channelID;{newEmbed:{title:Error}{description:You can't claim your own ticket}{color:Red}}{extraOptions:{delete:5s}}] 
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{
    name: "tick", 
    type: "interaction",
    prototype: "button", 
    code: `
$interactionModal[Hello there!;tick; {actionRow: {textInput:Why you want to make a ticket?:1:Reason:true:Ticket Opening Reason}}] 
$onlyif[$channelExists[$getUserVar[tick]]==false;You already have a ticket <#$getUserVar[tick]>{options:{ephemeral}}{extraOptions:{interaction}}] 
$onlyif[$hasPerms[$guildID;$clientID;administrator]==true;I don't have \`ADMIN\` perms]
$onlyif[$getGuildVar[tick]==true;Ticket system is disabled, tell an admin to run \`$getGuildVar[prefix]enable-ticket\`{extraOptions:{delete:5s}}]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
},{
    name: "tick", 
    type: "interaction", 
    prototype: "modal", 
    $if: "old", 
    code: `
$modifyChannelPerms[$get[id];$getGuildVar[tick_r];+viewchannel] 
$onlyif[$roleExists[$getGuildVar[tick_r];$guildID]==true;] 
$modifyChannelPerms[$get[id];$authorID;+viewchannel] 
$modifyChannelPerms[$get[id];$guildID;-viewchannel] 
$editMessage[$get[msg];<@$authorID> and <@&$getGuildVar[tick_r]> {newEmbed:{thumbnail:$nonEscape[$guildIcon[$guildID]]}{title:$getGuildVar[ticket_title]- $userTag}{color:Blue}{description:$get[tick_descr]}{footer:$username[$clientID] ticket system:$userAvatar[$clientID]}{timestamp}}{actionRow:{button:Claim:primary:claim:false:ðŸ–ï¸}{button:Close:danger:close:false:ðŸ”’}};$get[id]] 
$wait[1s] 
$let[msg;$channelSendMessage[$get[id];{newEmbed:{title:Ticket ~ $userTag}{color:Blue}}{actionRow:{button:Claim:primary:claim:false:ðŸ–ï¸}{button:Close:danger:close:false:ðŸ”’}};true]] 
$interactionReply[Created! <#$get[id]>;;;;everyone;true] 
$setUserVar[tick;$get[id]] 
$setChannelVar[tick;true-$authorID;$get[id]]
$let[tick_descr;$getGuildVar[tick_describe]\n\nTicket Subject:\n$textInputValue[Reason]] 
$if[$channelExists[$getGuildVar[tick_c]]==true] 
$let[id;$createChannel[$guildID;$getGuildVar[ch_name]-$userTag;text;true;$getGuildVar[tick_c]]] 
$else 
$let[id;$createChannel[$guildID;tick-$userTag;text;true]] 
$endif
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]`
}, {
    name: "set-ticket-msg",
    aliases: "set-tick-msg",
    info: {
        usage: "set-ticket-msg <msg>",
        description: "Will set ticket msg,",
        aliases: ["set-tick-msg"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code: `
$sendMessage[Successfully set Ticket Panel Message as:\n$getGuildVar[tick_describe]]
$setGuildVar[tick_describe;$message]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]
$onlyIf[$message!=;Enter a valid Message]
$onlyPerms[administrator;You don't have \`ADMIN\` perms]
`
}, {
    name: "set-ticket-title",
    aliases: "set-tick-title",
    info: {
        usage: "set-ticket-title <ticket title>",
        description: "Will setup ticket title",
        aliases: ["set-tick-title"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code:`
$sendMessage[Successfully set Ticket Title as:\n$getGuildVar[ticket_title]]

$setGuildVar[ticket_title;$message]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]
$onlyIf[$message!=;Enter a valid Message]

$onlyPerms[administrator;You don't have \`ADMIN\` perms]`
}, {
    name: "set-tick-button",
    info: {
        usage: "set-tick-button",
        description: "setup button?.",
        aliases: ["none"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code: `
$sendMessage[Successfully set Ticket Panel Button Name as:\n$getGuildVar[button_name]]
$setGuildVar[button_name;$message]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]
$onlyIf[$message!=;Enter a valid Message]
$onlyPerms[administrator;You don't have \`ADMIN\` perms]`
}, {
    name: "set-panel-title",
    info: {
        usage: "set-panel-title <title>",
        description: "set panel title for ticket duh.",
        aliases: ["none"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code: `
$sendMessage[Successfully set Ticket Panel Title as:\n$getGuildVar[panel_title]]
$setGuildVar[panel_title;$message]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]
$onlyIf[$message!=;Enter a valid Message]
$onlyPerms[administrator;You don't have \`ADMIN\` perms]`
}, {
    name: "set-panel-description",
    aliases: "set-panel-desc",
   info: {
        usage: "set-panel-description <descriptions>",
        description: "setl panel descriptioms.",
        aliases: ["set-panel-desc"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    }, 
    code: `
$sendMessage[Successfully set Ticket Panel Description as:\n$getGuildVar[panel_desc]]
$setGuildVar[panel_desc;$message]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]
$onlyIf[$message!=;Enter a valid Message]
$onlyPerms[administrator;You don't have \`ADMIN\` perms]`
}, {
    name: "ticket-channel-name",
    aliases: "tick-ch-name",
    info: {
        usage: "ticket-channel-name <channel>",
        description: "set ticket channel",
        aliases: ["tick-ch-name"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code: `
$sendMessage[Successfully set Ticket Channel Name as as:\n\`$getGuildVar[ch_name]-$userTag\`]
$setGuildVar[ch_name;$message]
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]
$onlyIf[$message[1]!=;Enter a valid Message]
$onlyPerms[administrator;You don't have \`ADMIN\` perms]`
}, {
    name: "auto-transcript",
    aliases: "auto-tran",
    info: {
        usage: "auto-transcript",
        description: "auto-transcript",
        aliases: ["auto-tran"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    $if: "old",
    code: `
$if[$getGuildVar[auto_tran]==false]
$sendMessage[Auto Transcript **enabled!**\nThe Ticket will be automatically transcripted on closing.]
$setGuildVar[auto_tran;true]
$elseIf[$getGuildVar[auto_tran]==true]
$sendMessage[Auto Transcript **disabled!**\nThe Ticket will be not be automatically transcripted on closing.]
$setGuildVar[auto_tran;false]
$endelseif
$endIf
$suppressErrors[Something went wrong!{extraOptions:{delete:5s}}]
$onlyPerms[administrator;You don't have \`ADMIN\` perms]`
}]
