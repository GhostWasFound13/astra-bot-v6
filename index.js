const { AoiClient } = require("aoi.js");
const { AoiVoice, PluginName, Cacher, Filter } = require("@akarui/aoi.music");
const { Util } = require("aoi.js");
const { parse, createAst } = require("@akarui/aoi.parser");
const { parseExtraOptions, parseComponents } = require("@akarui/aoi.parser/components");
const fs = require('fs');
/* Requiring the config file with your bot's information in it. */

const config = require("./handler/config.js");
const clientReady = require("./handler/clientReady.js");
const dash = require("./src/dashboard/index.js");
const { Panel } = require("@akarui/aoi.panel");
const { Dash } = require("./src/dashboard/dash.js");
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
/* dashboard cient */
config.panel.bot = bot;
config.dash.bot = bot;
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
/* dash board functiojs */
var dashClass = new Dash(config.dash)
dash.loadDash(bot, panel, dashClass)

async function ImportantFunction(){
  let servers = bot.guilds.cache.map(z => z)
  for (let i = 0; i < servers.length; i++) {
    var orig = await bot.db.get("main","prefix",servers[i].id)
    if(!orig||!orig.value){
      orig = {}
      orig.value=config.bot.prefix[0]
    }
    await bot.db.set("main","prefix",servers[i].id,orig.value)
  }
}

setInterval(ImportantFunction,1000);
/* INITIALIZING PANEL */

const panel = new Panel(config.panel)
panel.loadPanel()
panel.onError()
/* Needed for events and other features of @akarui/aoi.music to work. */ 

voiceManager.addPlugin(PluginName.Cacher, new Cacher("memory"));
voiceManager.addPlugin(PluginName.Filter, new Filter({
    filterFromStart: false,
}));

voiceManager.bindExecutor(client.functionManager.interpreter);
