module.exports = ({
  name: "$msgAfter",
  type: "djs",
  code: async (d) => {
    const data = d.util.aoiFunc(d);
    const client = require("../clientReady");
    const [i, split = " "] = data.inside.splits;
    
    const argse = d.args
      
    function hiFunction(index) { 
      if (index <= 0 || index > argse.length) { 
        return [];
      } 

      return argse.slice(index).join(split);
    }
      
    data.result = hiFunction(i)

    return {
      code: d.util.setCode(data)
    };
  }
});
