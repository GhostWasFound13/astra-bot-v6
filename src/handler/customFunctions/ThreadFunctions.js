module.exports = ({
      name: "$lockThread",
      type: "djs",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
        const client = require("../clientReady");
        const [threadId] = data.inside.splits;
  
        const thread = await d.message.client.channels.fetch(threadId);
  
        try {
          await thread.setLocked(true);

          return {
            code: d.util.setCode(data),
          };
        } catch (error) {
          console.error(error);
          return d.aoiError.fnError(d, 'custom', {}, 'Failed to lock thread');
        }
      },
    },
    {
      name: "$unlockThread",
      type: "djs",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
      const client = require("../clientReady");  
        const [threadId] = data.inside.splits;
  
        const thread = await d.message.client.channels.fetch(threadId);
  
        try {
          await thread.setLocked(false);

          return {
            code: d.util.setCode(data),
          };
        } catch (error) {
          console.error(error);
          return d.aoiError.fnError(d, 'custom', {}, 'Failed to unlock thread');
        }
      },
    },
    {
      name: "$renameThread",
      type: "djs",
      code: async (d) => {
        const data = d.util.aoiFunc(d);
       const client = require("../clientReady"); 
        const [threadId, newName] = data.inside.splits;
  
        try {
          const thread = await d.message.client.channels.fetch(threadId);
  
          await thread.setName(newName);

          return {
            code: d.util.setCode(data),
          };
          
        } catch (error) {
          console.error(error);
          return d.aoiError.fnError(d, 'custom', {}, 'Failed to rename thread');
        }
      },
    });
