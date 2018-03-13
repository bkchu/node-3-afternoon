const swag = require("../models/swag");
module.exports = {
  add: (req, res, next) => {
    const { id } = req.query;
    let { cart } = req.session.user;

    const index = cart.findIndex(swag => swag.id == id);

    if (index === -1) {
      const selectedSwag = swag.find(swag => swag.id == id);

      cart.push(selectedSwag);
      req.session.user.total += selectedSwag.price;
    }

    res.status(200).send(req.session.user);
  },
  delete: (req, res, next) => {
    let { id } = req.query;
    let { user } = req.session;

    let indexToDelete = user.cart.findIndex(
      item => parseInt(item.id) === parseInt(id)
    );

    if (indexToDelete !== -1) {
      user.total -= user.cart[indexToDelete].price;
      user.cart.splice(indexToDelete, 1);
      return res.status(200).send(user);
    } else {
      res.status(500).json({ message: "Not valid id" });
    }
  },
  checkout: (req, res, next) => {
    let { user } = req.session;
    user.cart = [];
    user.total = 0;
    res.status(200).send(user);
  }
};
