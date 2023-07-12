const logger = require("../plugin/logger.js")
module.exports = (bot) => {
    process.on('unhandledRejection', (reason, p) => {
        client.logger.warn(' [antiCrash] :: Unhandled Rejection/Catch');
        console.log(reason, p);
    });
    process.on("uncaughtException", (err, origin) => {
        client.logger.warn(' [antiCrash] :: Uncaught Exception/Catch');
        console.log(err, origin);
    }); process.on('uncaughtExceptionMonitor', (err, origin) => {
        client.logger.warn(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
        console.log(err, origin);
    });
    process.on('multipleResolves', (type, promise, reason) => {
        client.logger.warn(' [antiCrash] :: Multiple Resolves');
    });
}
