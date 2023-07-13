module.exports = ({
  name: "$fileNames",
  type: "djs",
  code: async (d) => {
  const client = require("../clientReady");  
    const data = d.util.aoiFunc(d);
    
    const [category, separator = ", "] = data.inside.splits;
    
    const fs = require('fs');
    const path = require('path');
    const folderPath = path.join(__dirname, 'commands', category);
    
    let files = [];
    let output = '';
    
    try {
      files = fs.readdirSync(folderPath);
      output = files
        .filter((file) => file !== '$alwaysExecute.js')
        .map((file) => path.parse(file).name)
        .join(separator);
    } catch (err) {
      output = `Error reading folder ${folderPath}: ${err}`;
    }
    
    data.result = output;
    
    return { code: d.util.setCode(data) };
  }
});
