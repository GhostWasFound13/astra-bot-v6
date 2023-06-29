module.exports = [{
    name: "case",
    aliases: ["cases"],
    $if: "old",
    info: {
        usage: "cases <user> <case_number>",
        description: "Will check cases for a given user or display all cases.",
        aliases: ["cases"],
        type: "text",
        permissions: ["sendmessages", "viewchannel", "embedlinks"]
    },
    code: `
    $if[$memberExists[$findMember[$message[1];false]]==true]
    $ifAwaited[$isNumber[$message[2]]==true;{execute:findCasesUser};{execute:displayCasesUser}]
    $let[object_forward;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_2]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_2]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_2]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_2]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
    $let[object;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_1]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
    $createObject[$getUserVar[user_warnings;$findMember[$message[1];false]]]
    $elseif[$memberExists[$findMember[$message[1];false]]==false]
    $ifAwaited[$isNumber[$message[1]]==true;{execute:findCasesGuild};{execute:displayCasesGuild}]
      $let[object_forward;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_2]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_2]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_2]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_2]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
    $let[object;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_1]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
    $createObject[$getGuildVar[guild_warnings]]
    $endelseif
    $endif
    $onlyIf[$hasAnyPerm[$guildID;$authorID;moderatemembers;manageguild;administrator]==true;You require the \`moderatemembers\` permissions to use this command.]`
  }, {
    name: "findCasesUser",
    type: "awaited",
    code: `
    $title[$username[$findMember[$message[1];false]]'s Moderation History]
  $description[- Date: <t:$truncate[$divide[$getObjectProperty[case_$get[object]_$message[2].datestamp];1000]]:F>
- User: $username[$getObjectProperty[case_$get[object]_$message[2].user]] (\`$getObjectProperty[case_$get[object]_$message[2].user]\`)
 - Moderator: $username[$getObjectProperty[case_$get[object]_$message[2].moderator]] (\`$getObjectProperty[case_$get[object]_$message[2].moderator]\`)
 - Reason: $getObjectProperty[case_$get[object]_$message[2].reason]
- Deleted?: $getObjectProperty[case_$get[object]_$message[2].deleted]
- Link: $getObjectProperty[case_$get[object]_$message[2].msg]]
    $footer[Case $message[2] of $djsEval[let jsonObject = $nonEscape[$getObject[true]];
    Object.keys(jsonObject).length;true]]
    $addButton[1;>;primary;caseMenuUserRight_$sum[$message[2];1]_$authorID_$findMember[$message[1];false];$replaceText[$replaceText[$checkCondition[$get[object_forwardPages]==undefined];true;yes];false;no]]
    $addButton[1;x;danger;caseMenuDelete_$authorID;false]
    $addButton[1;<;primary;caseMenuUserLeft_$sub[$message[2];1]_$authorID_$findMember[$message[1];false];$replaceText[$replaceText[$checkCondition[$message[2]<=1];true;yes];false;no]]
    $let[object_forwardPages;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_$sum[$message[2];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_$sum[$message[2];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_$sum[$message[2];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_$sum[$message[2];1]]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
    $onlyIf[$message[2]<=$djsEval[let jsonObject = $nonEscape[$getObject[true]];
    Object.keys(jsonObject).length;true];I was unable to find that case with the specified ID.]
    $onlyIf[$get[obj]!=undefined&&$stringStartsWith[$message[2];-;0;+]==false;I was unable to find that case with the specified ID.]
    $let[obj;$getObjectProperty[case_warning_$message[2]]]
    $onlyIf[$getObject[false]!={};That user has no active cases.]`
  }, {
    name: "findCasesGuild",
    type: "awaited",
    code: `
    $title[$guildName's Moderation History]
    $description[- Date: <t:$truncate[$divide[$getObjectProperty[case_$get[object]_$message[1].datestamp];1000]]:F>
- User: $username[$getObjectProperty[case_$get[object]_$message[1].user]] (\`$getObjectProperty[case_$get[object]_$message[1].user]\`)
 - Moderator: $username[$getObjectProperty[case_$get[object]_$message[1].moderator]] (\`$getObjectProperty[case_$get[object]_1.moderator]\`)
 - Reason: $getObjectProperty[case_$get[object]_$message[1].reason]
- Deleted?: $getObjectProperty[case_$get[object]_$message[1].deleted]
- Link: $getObjectProperty[case_$get[object]_1.msg]]
    $footer[Case $message[1] of $djsEval[let jsonObject = $nonEscape[$getObject[true]];
    Object.keys(jsonObject).length;true]]
    $addButton[1;>;primary;caseMenuGuildRight_$sum[$message[1];1]_$authorID_$guildID;$replaceText[$replaceText[$checkCondition[$get[object_forwardPages]==undefined];true;yes];false;no]]
    $addButton[1;x;danger;caseMenuDelete_$authorID;false]
    $addButton[1;<;primary;caseMenuGuildLeft_$sub[$message[1];1]_$authorID_$guildID;$replaceText[$replaceText[$checkCondition[1<=$message[2]];true;yes];false;no]
      $let[object_forwardPages;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_$sum[$message[1];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_$sum[$message[1];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_$sum[$message[1];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_$sum[$message[1];1]]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
    $onlyIf[$message[1]<=$djsEval[let jsonObject = $nonEscape[$getObject[true]];
    Object.keys(jsonObject).length;true];I was unable to find that case with the specified ID.]
    $onlyIf[$get[obj]!=undefined&&$stringStartsWith[$message[1];-;0;+]==false;I was unable to find that case with the specified ID.]
    $onlyIf[$getObject[false]!={};There are no active cases on this server.]`
  }, {
    name: "displayCasesUser",
    type: "awaited",
    code: `$title[$username[$findMember[$message[1];false]]'s Moderation History]
    $footer[Case 1 of $djsEval[let jsonObject = $nonEscape[$getObject[true]];
    Object.keys(jsonObject).length;true]]
    $description[- Date: <t:$truncate[$divide[$getObjectProperty[case_$get[object]_1.datestamp];1000]]:F>
- User: $username[$getObjectProperty[case_$get[object]_1.user]] (\`$getObjectProperty[case_$get[object]_1.user]\`)
 - Moderator: $username[$getObjectProperty[case_$get[object]_1.moderator]] (\`$getObjectProperty[case_$get[object]_1.moderator]\`)
 - Reason: $getObjectProperty[case_$get[object]_1.reason]
- Deleted?: $getObjectProperty[case_$get[object]_1.deleted]
- Link: $getObjectProperty[case_$get[object]_1.msg]]
    $addButton[1;>;primary;caseMenuUserRight_2_$authorID_$findMember[$message[1];false];$replaceText[$replaceText[$checkCondition[$get[object_forward]==undefined];true;yes];false;no]]
    $addButton[1;x;danger;caseMenuDelete_$authorID;false]
    $addButton[1;<;primary;caseMenuUserLeft_1_$authorID_$findMember[$message[1];false];true]
    $onlyIf[$getObject[false]!={};That user has no active cases.]`
  }, {
    name: "displayCasesGuild",
    type: "awaited",
    code: `$title[$guildName's Moderation History]
    $description[- Date: <t:$truncate[$divide[$getObjectProperty[case_$get[object]_1.datestamp];1000]]:F>
- User: $username[$getObjectProperty[case_$get[object]_1.user]] (\`$getObjectProperty[case_$get[object]_1.user]\`)
 - Moderator: $username[$getObjectProperty[case_$get[object]_1.moderator]] (\`$getObjectProperty[case_$get[object]_1.moderator]\`)
 - Reason: $getObjectProperty[case_$get[object]_1.reason]
- Deleted?: $getObjectProperty[case_$get[object]_1.deleted]
- Link: $getObjectProperty[case_$get[object]_1.msg]]
    $footer[Case 1 of $djsEval[let jsonObject = $nonEscape[$getObject[true]];
    Object.keys(jsonObject).length;true]]
    $addButton[1;>;primary;caseMenuGuildRight_2_$authorID_$guildID;$replaceText[$replaceText[$checkCondition[$get[object_forward]==undefined];true;yes];false;no]]
    $addButton[1;x;danger;caseMenuDelete_$authorID;false]
    $addButton[1;<;primary;caseMenuGuildLeft_1_$authorID_$guildID;true]
  
    $onlyIf[$getObject[false]!={};There are no active cases on this server.]`
  }, {
      // name: "caseMenuUserLeft",
      type: "interaction",
      prototype: "button",
      code: `
      $interactionUpdate[;{newEmbed:
          {title:$username[$get[caseUser]]'s Moderation History}
          {description:- Date: <t:$truncate[$divide[$getObjectProperty[case_$get[object_backwards]_$get[currentPage].datestamp];1000]]:F>
- User: $username[$getObjectProperty[case_$get[object_backwards]_$get[currentPage].user]] (\`$getObjectProperty[case_$get[object_backwards]_$get[currentPage].user]\`)
 - Moderator: $username[$getObjectProperty[case_$get[object_backwards]_$get[currentPage].moderator]] (\`$getObjectProperty[case_$get[object_backwards]_$get[currentPage].moderator]\`)
 - Reason: $getObjectProperty[case_$get[object_backwards]_$get[currentPage].reason]
- Deleted?: $getObjectProperty[case_$get[object_backwards]_$get[currentPage].deleted]
- Link: $getObjectProperty[case_$get[object_backwards]_$get[currentPage].msg]}{footer:Case $get[currentPage] of $djsEval[let jsonObject = $nonEscape[$getObject[true]];
    Object.keys(jsonObject).length;true]}};{actionRow:
          {button:<:primary:caseMenuUserLeft_$sub[$get[currentPage];1]_$interactionData[author.id]_$get[caseUser]:$replaceText[$replaceText[$checkCondition[$get[object_backwards]==undefined||1>=$get[currentPage]];true;yes];false;no]}
          {button:x:danger:caseMenuDelete_$interactionData[author.id]:false}
          {button:>:primary:caseMenuUserRight_$sum[$get[currentPage];1]_$interactionData[author.id]_$get[caseUser]:$replaceText[$replaceText[$checkCondition[$get[object_forwards]==undefined];true;yes];false;no]}
      }]
  
  $let[object_forwards;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_$sum[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_$sum[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_$sum[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_$sum[$get[currentPage];1]]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
  
  $let[object_current;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_1]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
  
  $let[object_backwards;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_$get[currentPage]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_$get[currentPage]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_$get[currentPage]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_$get[currentPage]]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
  
  $createObject[$getUserVar[user_warnings;$get[caseUser]]]
  $let[caseUser;$advancedTextSplit[$interactionData[customId];_;4]]
  $let[currentPage;$advancedTextSplit[$interactionData[customId];_;2]]
  $onlyIf[$advancedTextSplit[$interactionData[customId];_;3]==$interactionData[author.id];You're not the author of this interaction. {options:{ephemeral}}{extraOptions:{interaction}}]
  $onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==caseMenuUserLeft;]`
  }, {
      // name: "caseMenuUserRight",
      type: "interaction",
      prototype: "button",
      code: `
      $interactionUpdate[;{newEmbed:
          {title:$username[$get[caseUser]]'s Moderation History}
          {description:- Date: <t:$truncate[$divide[$getObjectProperty[case_$get[object_current]_$get[currentPage].datestamp];1000]]:F>
- User: $username[$getObjectProperty[case_$get[object_current]_$get[currentPage].user]] (\`$getObjectProperty[case_$get[object_current]_$get[currentPage].user]\`)
 - Moderator: $username[$getObjectProperty[case_$get[object_current]_$get[currentPage].moderator]] (\`$getObjectProperty[case_$get[object_current]_$get[currentPage].moderator]\`)
 - Reason: $getObjectProperty[case_$get[object_current]_$get[currentPage].reason]
- Deleted?: $getObjectProperty[case_$get[object_current]_$get[currentPage].deleted]
- Link: $getObjectProperty[case_$get[object_current]_$get[currentPage].msg]}
          {footer:Case $get[currentPage] of $djsEval[let jsonObject = $nonEscape[$getObject[true]];
    Object.keys(jsonObject).length;true]}};{actionRow:
          {button:<:primary:caseMenuUserLeft_$sub[$get[currentPage];1]_$interactionData[author.id]_$get[caseUser]:$replaceText[$replaceText[$checkCondition[$get[object_backwards]==undefined||1>=$get[currentPage]];true;yes];false;no]}
          {button:x:danger:caseMenuDelete_$interactionData[author.id]_$get[caseUser]:false}
          {button:>:primary:caseMenuUserRight_$sum[$get[currentPage];1]_$interactionData[author.id]_$get[caseUser]:$replaceText[$replaceText[$checkCondition[$get[object_forwards]==undefined];true;yes];false;no]}
      }]
      
  $let[object_forwards;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_$sum[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_$sum[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_$sum[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_$sum[$get[currentPage];1]]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
  
  $let[object_current;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_1]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
  
  $let[object_backwards;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_$sub[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_$sub[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_$sub[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_$sub[$get[currentPage];1]]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
  
  $createObject[$getUserVar[user_warnings;$get[caseUser]]]
  $let[caseUser;$advancedTextSplit[$interactionData[customId];_;4]]
  $let[currentPage;$advancedTextSplit[$interactionData[customId];_;2]]
  $onlyIf[$advancedTextSplit[$interactionData[customId];_;3]==$interactionData[author.id];You're not the author of this interaction. {options:{ephemeral}}{extraOptions:{interaction}}]
  $onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==caseMenuUserRight;]`
  }, {
      // name: "caseMenuGuildLeft",
      type: "interaction",
      prototype: "button",
      code: `
      $interactionUpdate[;{newEmbed:
          {title:$guildName's Moderation History}
          {description:- Date: <t:$truncate[$divide[$getObjectProperty[case_$get[object_backwards]_$get[currentPage].datestamp];1000]]:F>
- User: $username[$getObjectProperty[case_$get[object_backwards]_$get[currentPage].user]] (\`$getObjectProperty[case_$get[object_backwards]_$get[currentPage].user]\`)
 - Moderator: $username[$getObjectProperty[case_$get[object_backwards]_$get[currentPage].moderator]] (\`$getObjectProperty[case_$get[object_backwards]_$get[currentPage].moderator]\`)
 - Reason: $getObjectProperty[case_$get[object_backwards]_$get[currentPage].reason]
- Deleted?: $getObjectProperty[case_$get[object_backwards]_$get[currentPage].deleted]
- Link: $getObjectProperty[case_$get[object_backwards]_$get[currentPage].msg]}
  {footer:Case $get[currentPage] of $djsEval[let jsonObject = $nonEscape[$getObject[true]];
    Object.keys(jsonObject).length;true]}};{actionRow:
          {button:<:primary:caseMenuGuildLeft_$sub[$get[currentPage];1]_$interactionData[author.id]_$get[caseUser]:$replaceText[$replaceText[$checkCondition[$get[object_backwards]==undefined||1>=$get[currentPage]];true;yes];false;no]}
          {button:x:danger:caseMenuDelete_$interactionData[author.id]:false}
          {button:>:primary:caseMenuGuildRight_$sum[$get[currentPage];1]_$interactionData[author.id]_$get[caseUser]:$replaceText[$replaceText[$checkCondition[$get[object_forwards]==undefined];true;yes];false;no]}
      }]
  
  $let[object_forwards;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_$sum[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_$sum[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_$sum[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_$sum[$get[currentPage];1]]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
  
  $let[object_current;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_1]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
  
  $let[object_backwards;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_$get[currentPage]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_$get[currentPage]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_$get[currentPage]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_$get[currentPage]]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
  
  $createObject[$getGuildVar[guild_warnings]]
  $let[caseUser;$advancedTextSplit[$interactionData[customId];_;4]]
  $let[currentPage;$advancedTextSplit[$interactionData[customId];_;2]]
  $onlyIf[$advancedTextSplit[$interactionData[customId];_;3]==$interactionData[author.id];You're not the author of this interaction. {options:{ephemeral}}{extraOptions:{interaction}}]
  $onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==caseMenuGuildLeft;]`
  }, {
      // name: "caseMenuUserRight",
      type: "interaction",
      prototype: "button",
      code: `
      $interactionUpdate[;{newEmbed:
          {title:$guildName's Moderation History}
          {description:- Date: <t:$truncate[$divide[$getObjectProperty[case_$get[object_current]_$get[currentPage].datestamp];1000]]:F>
- User: $username[$getObjectProperty[case_$get[object_current]_$get[currentPage].user]] (\`$getObjectProperty[case_$get[object_current]_$get[currentPage].user]\`)
 - Moderator: $username[$getObjectProperty[case_$get[object_current]_$get[currentPage].moderator]] (\`$getObjectProperty[case_$get[object_current]_$get[currentPage].moderator]\`)
 - Reason: $getObjectProperty[case_$get[object_current]_$get[currentPage].reason]
- Deleted?: $getObjectProperty[case_$get[object_current]_$get[currentPage].deleted]
- Link: $getObjectProperty[case_$get[object_current]_$get[currentPage].msg]}{footer:Case $get[currentPage] of $djsEval[let jsonObject = $nonEscape[$getObject[true]];
    Object.keys(jsonObject).length;true]}};{actionRow:
          {button:<:primary:caseMenuGuildLeft_$sub[$get[currentPage];1]_$interactionData[author.id]_$get[caseUser]:$replaceText[$replaceText[$checkCondition[$get[object_backwards]==undefined||1>=$get[currentPage]];true;yes];false;no]}
          {button:x:danger:caseMenuDelete_$interactionData[author.id]_$get[caseUser]:false}
          {button:>:primary:caseMenuGuildRight_$sum[$get[currentPage];1]_$interactionData[author.id]_$get[caseUser]:$replaceText[$replaceText[$checkCondition[$get[object_forwards]==undefined];true;yes];false;no]}
      }]
      
  $let[object_forwards;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_$sum[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_$sum[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_$sum[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_$sum[$get[currentPage];1]]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
  
  $let[object_current;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_1]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_1]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
  
  $let[object_backwards;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_warning_$sub[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_ban_$sub[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unmute_$sub[$get[currentPage];1]]==undefined];true;$replaceText[$replaceText[$checkCondition[$getObjectProperty[case_unban_$sub[$get[currentPage];1]]==undefined];true;undefined];false;warning]];false;unban]];false;ban]];false;warning]]
  
  $createObject[$getGuildVar[guild_warnings]]
  $let[caseUser;$advancedTextSplit[$interactionData[customId];_;4]]
  $let[currentPage;$advancedTextSplit[$interactionData[customId];_;2]]
  $onlyIf[$advancedTextSplit[$interactionData[customId];_;3]==$interactionData[author.id];You're not the author of this interaction. {options:{ephemeral}}{extraOptions:{interaction}}]
  $onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==caseMenuGuildRight;]`
  }, {
      // name: "caseMenuDelete",
      type: "interaction",
      prototype: "button",
      code: `$deleteMessage[$interactionData[message.id];$interactionData[channel.id]]
      $let[s;$interactionDeferUpdate]
      $suppressErrors $onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];You're not the author of this interaction. {options:{ephemeral}}{extraOptions:{interaction}}]
  $onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==caseMenuDelete;]`
  }]

  /* Even MORE complicated way of checking warnings :smile: */
