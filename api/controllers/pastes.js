const Paste = require("../models/paste");
const shortid = require("shortid");

exports.getCount = (req, res, next) => {
  Paste.countDocuments({}, function(err, count) {
    if (err) {
      return next(new Error("Couldn't get the count"));
    }
    res.status(200).json({ count });
  });
};

exports.getPaste = (req, res, next) => {
  const id = req.params.id;
  Paste.findOne({ id }, function(err, result) {
    if (err) {
      return next(new Error("Couldn't get the paste"));
    }
    if (!result) {
      res.status(200).json({ text: "Paste not found..." });
    } else {
      res
        .status(200)
        .json({ text: result.text, id: result.id });
    }
  });
};

exports.getUser = (req, res, next) => {
  const user = req.params.user;
  Paste.findOne({ user }, function(err, result) {
    if (err) {
      return next(new Error("Couldn't get the user"));
    }
    if (!result) {
      res.status(200).json({ text: "User not found..." });
    } else {
      res.status(200).json(result);
    }
  });
};

exports.savePaste = (req, res, next) => {
  const id = shortid.generate();
  const text = req.body.text;
  const user = req.body.user;
  Paste.create({ id, text, user }, function(err, result) {
    if (err) {
      return next(new Error("Couldn't save the paste"));
    }
    res.status(200).json({ message: "ok", shortid: id });
  });
};

exports.check = (req, res) => {
  const id = req.params.id;
  const user = req.params.user;
  Paste.findOne({ id }, function(err, result) {
    if (err) {
      return next(new Error("Couldn't get the paste"));
    }
    if (!result) {
      res.status(200).json({ text: "Paste not found..." });
    } else {
      if (result.user === user) {
        res.status(200).json({ message: "ok", text: "can delete" });
      } else {
        res.status(200).json({ message: "failure", text: "can't delete" });
      }
    }
  });
};

exports.deletePaste = (req, res) => {
  const id = req.params.id;
  const user = req.params.user;

  Paste.findOne({ id }, function(err, result) {
    if (err) {
      return next(new Error("Couldn't get the paste"));
    }
    if (!result) {
      res.status(200).json({ text: "Paste not found..." });
    } else {
      if (result.user === user) {
        Paste.deleteOne({ id: id }, function(err, result) {
          if (err) {
            res.status(409).json({ message: "failure", text: "can't delete" });
          } else {
            res.status(200).json({ message: "ok", text: "deleted" });
          }
        });
      } else {
        res.status(409).json({ message: "failure", text: "can't delete" });
      }
    }
  });
};
