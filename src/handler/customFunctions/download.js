const url = require('url');
module.exports = ({
//bot.functionManager.createFunction({
  name: '$download',
  type: 'djs',
  code: async (d) => {
    const client = require("../clientReady");
    const data = d.util.aoiFunc(d);
    let [urlValue, destinationPath] = data.inside.splits;

    if (!destinationPath) {
      let parsedUrl = new URL(urlValue.replace(/#COLON#/g, ':'));
      let pathname = parsedUrl.pathname;
      let filename = pathname.split('/').pop();
      destinationPath = filename;
    }

    let unescapedURL = urlValue
      .replace(/#LEFT#/g, ']')
      .replace(/#SEMI#/g, ';')
      .replace(/#COLON#/g, ':')
      .replace(/#CHAR#/g, '$')
      .replace(/#RIGHT_CLICK#/g, '<')
      .replace(/#LEFT_CLICK#/g, '>')
      .replace(/#EQUAL#/g, '=')
      .replace(/#RIGHT_BRACKET#/g, '{')
      .replace(/#LEFT_BRACKET#/g, '}')
      .replace(/#COMMA#/g, ',')
      .replace(/#AND#/g, '&&');

    function download() {
      const https = require('https');
      const fs = require('fs');

      const file = fs.createWriteStream(destinationPath);

      https.get(unescapedURL, (response) => {
        response.pipe(file);
      });
    }

    if (!urlValue) return d.aoiError.fnError(d, 'custom', {}, 'The parameter "url" does not have any arguments!');

    data.result = download();
    return {
      code: d.util.setCode(data),
    };
  },
});
