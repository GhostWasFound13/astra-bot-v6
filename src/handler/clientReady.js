const { PlayerEvents } = require("@akarui/aoi.music");
const { LoadCommands } = require("aoi.js");
const { Group } = require("@akarui/structures");

const fs = require('fs');
const path = require('path');
const config = require("./config.js");
const logger = require("./plugin/logger.js")
module.exports = async (client, voice) => {

  if (config.replit.usingReplit === true) {
    const express = require('express');
    const app = express();
    app.get('/', (req, res) => {
        res.send("Hello World!");
    });
    app.listen(config.replit.port, () => {
        if (config.disableLogs === false) {
        logger.info("\x1B[90m[REPLIT]\x1B[0m Successfully established connection to port \x1B[32m" + config.replit.port + "\x1B[0m");
        }
    });
  }
  try {
    const loader = new LoadCommands(client);
    loader.setColors({
      walking: ["blink", "dim", "fgWhite"],
      failedWalking: {
        name: ["bright", "fgYellow", "underline"],
        text: ["gray", "fgRed"]
      },
      typeError: {
        command: ["bright", "fgYellow"],
        type: ["fgYellow"],
        text: ["bright", "fgRed"]
      },
      failLoad: {
        command: ["bright", "fgMagenta"],
        type: ["fgRed"],
        text: ["bright", "fgRed"],
      },
      loaded: {
        command: ["bright", "fgBlue"],
        type: ["bright", "fgWhite"],
        text: ["bright", "fgGreen"]
      },
    });
    client.once('ready', () => {
        console.warn("\n" + "\x1B[90m[CLIENT]\x1B[0m Loaded " + client.cmd.default.size + (client.cmd.default.size >= 2 ? " commands" : " command" + "."));
        console.log("\x1B[90m[CLIENT]\x1B[0m Successfully initialized on \x1B[32m" + client.user.username + "\x1B[0m");
        if (config.disableInvite === false) {
       logger.info(`\x1B[90m[INFO]\x1B[0m Invite your bot with this link: https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot%20applications.commands`);
        }
        try {
          if (Object.keys(require("./auth.json")).length === 0) {
            setTimeout(() => {
              logger.info("\x1B[90m[INFO]\x1B[0m \x1B[31mEnsure you follow the Device Auth Instructions above, or your bot may crash after some time.\x1B[0m");
            }, 2500);
          }
        } catch (err) {
          setTimeout(() => {
            console.error("\x1B[90m[ERR]\x1B[0m \x1B[31mFailed to check if you authenticated with the google device link.\x1B[0m");
          }, 2500);
        }        
      });
      if (config.disableLogs === false) {
      logger.info("\x1B[90m[CLIENT]\x1B[0m \x1B[32mAttempting to load commands\x1B[0m");
      }
      await loader.load(client.cmd, config.commands); // Location for your commands.
      if (config.disableLogs === false) {
      logger.info("\n\x1B[90m[CLIENT]\x1B[0m \x1B[32mAttempting to load voice events\x1B[0m");
      }
      await loader.load(voice.cmds, config.voiceCommands); // Location for your @akarui/aoi.music events, NOT for commands.

      client.customFunctions = {
        djs : new client.cacheManager.cachers.Group(),
      }

      if (config.disableLogs === false) {
      logger.info("\n\x1B[90m[CLIENT]\x1B[0m \x1B[32mAttempting to load custom functions\x1B[0m");
      }
      await loader.load(client.customFunctions, config.customCommands);
      Object.values(client.customFunctions).forEach(x => client.functionManager.createFunction(...x.allValues()));
} catch (err) {
    logger.warn("\x1B[90m[ERR]\x1B[0m \x1B[31mFailed to load commands and/or events, please try again.\x1B[0m");
    console.error(err)
}
await require(config.variables)(client);
module.exports = client;
};
