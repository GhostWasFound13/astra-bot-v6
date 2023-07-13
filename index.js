const { AoiClient } = require("aoi.js");
const { AoiVoice, PluginName, Cacher, Filter } = require("@akarui/aoi.music");
const { Util } = require("aoi.js");
const { parse, createAst } = require("@akarui/aoi.parser");
const { parseExtraOptions, parseComponents } = require("@akarui/aoi.parser/components");
const fs = require('fs');
const fetch = require("node-fetch");

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
/* functions */

const getCountriesData = async () => {
  try {
    const response = await fetch(
      "https://www.jsonkeeper.com/b/L23E"
    );
    const data = await response.json();
    return data.countries;
  } catch (error) {
    console.error("An error occurred while fetching country data:", error);
    return [];
  }
};

bot.functionManager.createFunction({
  name: "$country",
  type: "djs",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    const [countryName, format] = data.inside.splits;

    const countries = await getCountriesData();

    const country = countries.find(
      (c) =>
        c.name_en.toLowerCase() === countryName.toLowerCase() ||
        c.name_es.toLowerCase() === countryName.toLowerCase()
    );

    if (!country) {
      data.result = "Invalid country specified!";
      return { code: d.util.setCode(data) };
    }

    if (!format) {
      data.result = "No format specified!";
      return { code: d.util.setCode(data) };
    }

    const placeholders = {
      "{name_en}": country.name_en,
      "{name_es}": country.name_es,
      "{continent_en}": country.continent_en,
      "{continent_es}": country.continent_es,
      "{capital_en}": country.capital_en,
      "{capital_es}": country.capital_es,
      "{dial_code}": country.dial_code,
      "{code_2}": country.code_2,
      "{code_3}": country.code_3,
      "{tld}": country.tld,
      "{km2}": country.km2,
      "{flag}": `:flag_${country.code_2.toLowerCase()}:`,
      "{image}": `https://flagcdn.com/w2560/${country.code_2.toLowerCase()}.jpg`,
    };

    let result = format;
    for (const placeholder in placeholders) {
      result = result.replace(
        new RegExp(placeholder, "g"),
        placeholders[placeholder]
      );
    }

    data.result = result;

    return { code: d.util.setCode(data) };
  },
});
bot.functionManager.createFunction({
  name: "$getWeather",
  type: "djs",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    const [location, format = "{temperature}°C, {condition}, Humidity: {humidity}%, Wind Speed: {windSpeed} km/h"] = data.inside.splits;

    if (!location) {
      data.result = "Error: Please provide a location.";
      return { code: d.util.setCode(data) };
    }

    try {
      const weatherData = await fetchWeatherData(location);

      if (weatherData.error) {
        throw new Error(weatherData.error.message);
      }

      const temperature = weatherData.current.temp_c;
      const condition = weatherData.current.condition.text;
      const humidity = weatherData.current.humidity;
      const windSpeed = weatherData.current.wind_kph;

      let message = format;
      message = message.replace(/{temperature}/g, temperature);
      message = message.replace(/{condition}/g, condition);
      message = message.replace(/{humidity}/g, humidity);
      message = message.replace(/{windSpeed}/g, windSpeed);

      data.result = message;
    } catch (error) {
      data.result = `Error: ${error.message}`;
    }

    return {
      code: d.util.setCode(data)
    };
  }
});

async function fetchWeatherData(location) {
  const apiKey = config.ApiKey;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
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
