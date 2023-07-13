module.exports = ({
  name: `$isFileEmpty`,
  type: "djs",
  code: async d => {
    const data = d.util.aoiFunc(d);
    const client = require("../clientReady");
    const [filePath] = data.inside.splits;

    const isFileEmpty = filePath => {
      try {
        const stats = fs.statSync(filePath);
        return stats.size === 0;
      } catch (error) {
        // Handle file not found or other errors
        console.error('Error:', error);
        return false;
      }
    }

    data.result = isFileEmpty(filePath);

    return {
      code: d.util.setCode(data)
    };
  }
});
