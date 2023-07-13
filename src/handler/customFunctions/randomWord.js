module.exports = ({
  name: "$randomWord",
  type: "djs",
  code: async (d) => {
  const functionName = "$randomWord";
  const data = d.util.aoiFunc(d);
    const client = require("../clientReady");
  const [ words, numb = 1 ] = data.inside.splits;

if (!words || words === "") {
 let error = `\`\`\`elixir\nRei.js Error\n${functionName}: Words were not provided!\`\`\``
  data.result = error
} else {
  let wordArr = words.split(':');
  let num = numb > wordArr.length ? wordArr.length : numb;
  var randWords = [];
  for (let i = 0; i < num; i++) {
    let newRandom;
    do {
      let rand = Math.floor(Math.random() * wordArr.length);
      newRandom = wordArr[rand];
    } while (randWords.includes(newRandom));
    randWords.push(newRandom);
  }
const output = randWords.join(', ')
data.result = output
}
    return {
      code: d.util.setCode(data),
    };
  }
})
