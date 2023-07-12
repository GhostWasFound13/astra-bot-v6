module.exports = [{
    name: "play",
    aliases: "p",
    info: {
        usage: "play <song>",
        description: "Plays a given song.",
        aliases: ["p"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks", "connect", "speak"]
    },
    $if: "old",
    code: `
    $awaitMessages[$channelID;$authorID;25s;everything;selecttrack;Cancelled current selection.;{"messageID": "$get[id]", "songs": "$uri[$get[songlist];encode]", "channelID": "$channelID"}]
    
    $let[messageID;$sendMessage[{newEmbed:{title:Pick one of the following songs#COLON#}{description:
- 1. **$advancedTextSplit[$get[songs];$authorID;1]** 
- 2. **$advancedTextSplit[$get[songs];$authorID;2]**
- 3. **$advancedTextSplit[$get[songs];$authorID;3]**
- 4. **$advancedTextSplit[$get[songs];$authorID;1]**
- 5. **$advancedTextSplit[$get[songs];$authorID;1]**
    }{color:$getVar[color]}};true]]
    $let[songlist;$search[youtube;$message;{title} && {duration} && {id};5;$authorID]]
    $let[songs;$search[youtube;$message;[{title}]({url}) && {duration} && {id};5;$authorID]]

    $if[$checkCondition[$voiceID[$clientID]==||$hasPlayer==false]==true]
    $joinVC[$voiceID]
    $endif

    $onlyIf[$voiceID[$authorID]!=;You need to join a Voice Channel before trying to play something!]
    `
}, {
    name: "selecttrack",
    type: "awaited",
    $if: "old",
    code: `
    $playTrack[https://www.youtube.com/watch?v=$advancedTextSplit[$uri[$advancedTextSplit[$awaitData[songs];$authorID;$message];decode;&&;3];youtube]
    $sendMessage[{newEmbed:{title:Added $advancedTextSplit[$uri[$advancedTextSplit[$awaitData[songs];$authorID;$message];decode];&&;1] to the queue.}{color:$getVar[color]}}]
    $if[$checkCondition[$voiceID[$clientID]==||$hasPlayer==false]==true]
    $joinVC[$voiceID]
    $endif
    $onlyIf[$isNumber[$message]==true||$message<=5;That isn't a valid input.]`
}]
