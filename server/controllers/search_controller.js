const swag = require("../models/swag");

module.exports = {
  search: (req, res, next) => {
    let { category } = req.query;
    let arr = ["hats", "shirts", "jackets", "sweaters", "pants", "shorts"];
    if (arr.includes(category)) {
      let filteredSwag = swag.filter(item => item.category === category);
      res.status(200).send(filteredSwag);
    } else {
      res.status(200).send(swag);
    }
  }
};
