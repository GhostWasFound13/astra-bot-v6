module.exports = ({
  name: "$search",
  type: "djs",
  code: async (d) => {
    const client = require("../clientReady");
    const data = d.util.aoiFunc(d);
    const [type = "youtube", query, format = "{title} by {artist} ({duration})", list = 5, separator = "\n"] = data.inside.splits;

    const searchType = type.toLowerCase() === "youtube" ? 3 : 0;

    let results;
    if (searchType === 3) {
      results = await client.voiceManager.search(3, query, list);
    } else if (searchType === 0) {
      results = await client.voiceManager.search(0, query, list);
    }

    const formattedResults = results.map((result) => {
      let formattedResult = format;

      const placeholders = {
        "{title}": result.title,
        "{artist}": searchType === 3 ? result.author.name : result.publisher_metadata?.artist || "Unknown Artist",
        "{duration}": searchType === 3 ? result.duration.seconds * 1000: result.duration,
        "{formattedDuration}": searchType === 3 ? result.duration.text : new Date(result.duration).toISOString().substr(14, 5),
        "{id}": result.id,
        "{url}": searchType === 3 ? "https://www.youtube.com/watch?v=" + result.id : result.permalink_url
      };

      for (const placeholder in placeholders) {
        formattedResult = formattedResult.replace(new RegExp(placeholder, "g"), placeholders[placeholder]);
      }

      return formattedResult;
    });

    data.result = formattedResults.join(separator);

    return {
      code: d.util.setCode(data)
    };
  }
});
