const users = require("../models/users");
let id = 1;

module.exports = {
  login: (req, res, next) => {
    const { session } = req;
    const { username, password } = req.body;

    const user = users.find(
      user => user.username === username && user.password === password
    );

    if (user) {
      session.user.username = user.username;
      res.status(200).send(session.user);
    } else {
      res.status(500).send("Unauthorized.");
    }
  },
  register: (req, res, next) => {
    let { username, password } = req.body;
    let newUserObj = {
      id: id,
      username,
      password
    };
    users.push(newUserObj);
    req.session.user.username = username;
    id++;

    res.status(200).send(req.session.user);
  },
  signout: (req, res, next) => {
    req.session.destroy();
    res.status(200).send(req.session);
  },
  getUser: (req, res, next) => {
    res.status(200).send(req.session.user);
  }
};
