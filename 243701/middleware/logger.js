const logger = (req, res, next) => {
    console.log("Logger working");
    next();
};

module.exports = logger;