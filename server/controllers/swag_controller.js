const swag = require("../models/swag");

module.exports = {
  getSwag: (req, res, next) => {
    res.status(200).send(swag);
  }
};
