module.exports = {
/*                     
              _   _         _                       _       _       
             (_) (_)       | |                     | |     | |      
   __ _  ___  _   _ ___    | |_ ___ _ __ ___  _ __ | | __ _| |_ ___ 
  / _` |/ _ \| | | / __|   | __/ _ | '_ ` _ \| '_ \| |/ _` | __/ _ \
 | (_| | (_) | |_| \__ \   | ||  __| | | | | | |_) | | (_| | ||  __/
  \__,_|\___/|_(_| |___/    \__\___|_| |_| |_| .__/|_|\__,_|\__\___|
                _/ |                         | |                    
               |__/                          |_|     

      - aoi.js setup (complicated) -
*/
    "token": "", // Your super secret client token, when using replit use token: process.env.token and create a secret with your token in it instead for safety purposes.
    "prefix": "!", // The prefix your bot will respond to, can be multiple for example ["!", "?"], so the bot would respond to ?ping and !ping
    "intents": ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates"], // Array of intents used for your bot, list can be found here: https://aoi.js.org/docs/guides/permissionsandintents
    "events": ["onMessage", "onInteractionCreate"], // Array of events used for your bot, list can be found here: https://aoi.js.org/docs/guides/events
    "commands": "././handler/main", // Location of your commands directory.
    "voiceCommands": "././handler/voice",
    "customCommands": "./handler/config/customFunctions", // Location of your custom commands directory.
    "variables": "./variables.js", // Location of your variables file, note that it's trying to search the file from the clientReady.js file.

    /* - @akarui/aoi.music setup - */
    "soundcloudID": "", // Optional, add a soundcloud ID. Don't know how? https://aoi.js.org/docs/other/soundcloudid
    "youtubeGl": "US", // Define the location of the aoi.music client.

    /* - Custom Settings - */
    "replit": {
        "usingReplit": false,
        "port": 3000, // Port used for the webserver.
    }, // Requires express, creates a new webserver which is then able to be used with UptimerRobot or other services.
    "disableInvite": false, // Disables logging the client's invite after start.
    "disableLogs": false, // Disables all custom-added-logs except the built-in loader.
    "apiKey": "undefined" // Needed for the chat-gpt application command to work. (Key; https://discord.gg/pawan)
};
