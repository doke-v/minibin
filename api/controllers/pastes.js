const Paste = require("../models/paste");
const shortid = require('shortid');

exports.getCount = (req, res, next) => {
  Paste.countDocuments({}, function(err, count) {
    if(err){
      return next(new Error("Couldn't get the count"));
    }
    res.status(200).json({ count });
  });
};

exports.getPaste = (req, res, next) => {
  const id = req.params.id;
  Paste.findOne({ id }, function(err, result) {
    if(err){
      return next(new Error("Couldn't get the paste"));
    }
    if (!result) {
      res.status(200).json({ text: "Paste not found..." });
    } else {
      res.status(200).json({ text: result.text });
    }
  });
};

exports.savePaste = (req, res, next) => {
  const id = shortid.generate()
  const text = req.body.text
  Paste.create({ id, text }, function(err, result){
    if(err){
      return next(new Error("Couldn't save the paste"));
    }
    res.status(200).json({message: "ok", shortid: id});
  })
}