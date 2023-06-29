const { AoiClient } = require("aoi.js");
const { AoiVoice, PluginName, Cacher, Filter } = require("@akarui/aoi.music");
const { Util } = require("aoi.js");
const { parse, createAst } = require("@akarui/aoi.parser");
const { parseExtraOptions, parseComponents } = require("@akarui/aoi.parser/components");
const fs = require('fs');
/* Requiring the config file with your bot's information in it. */

const config = require("./handler/config.js");
const clientReady = require("./handler/clientReady.js");

/* Setting up the actual client. */

const client = new AoiClient({
    token: config.token,
    prefix: config.prefix,
    events: config.events,
    intents: config.intents,
    aoiLogs: false,
    database: {
        type: "aoi.db",
        db: require("aoi.db"),
        tables: ["main"],
        path: "./database/",
        extraOptions: {
            dbType: "KeyValue"
        },
    },
});
/* module event */
const files = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
files.forEach( x => {
require(`./handler/module/${x}`)(bot)
});
/* @akarui/aoi.music setup */

const voiceManager = new AoiVoice(client, {
    searchOptions: {
        youtubeAuth: "./handler/config/auth.json",
        youtubegl: "US",
        soundcloudClientId: config.soundcloudID,
        youtubeClient: "WEB",
    }
});

/* LoadCommands Class for loading aoi.js commands, customFunctions and aoi.music events in a separate directory. (also adding some nice colors and more) */

clientReady(client, voiceManager, config.customCommands);
  
/* Setting up aoi.parser, just for components and (extra)Options. */

Util.parsers.ErrorHandler = parse;
Util.parsers.OptionsParser = ( data ) => {
     return createAst( data ).children.map( parseExtraOptions );
};
Util.parsers.ComponentParser = ( data ) => {
     return createAst( data ).children.map( parseComponents );
};

/* Needed for events and other features of @akarui/aoi.music to work. */ 

voiceManager.addPlugin(PluginName.Cacher, new Cacher("memory"));
voiceManager.addPlugin(PluginName.Filter, new Filter({
    filterFromStart: false,
}));

voiceManager.bindExecutor(client.functionManager.interpreter);
