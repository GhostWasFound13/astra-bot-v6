module.exports = [{
    name: "leave",
    info: {
        usage: "leave",
        description: "Will make the bot leave the current Voice Channel.",
        aliases: ["none"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks", "connect"]
    },
    code: `
    $leaveVC
    $reply
 $description[$getVar[leave_music]]
 $footer[request by $clientID]
 $color[$getVar[color]]
    $onlyIf[$voiceID[$authorID]!=||$voiceID[$clientID]==$voiceID[$authorID];You can't disconnect me without being connected to the same Voice Channel.]
    $onlyIf[$voiceID[$clientID]!=;I'm not connected to any Voice Channel.]`
}]
