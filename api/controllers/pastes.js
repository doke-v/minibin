const Paste = require("../models/paste");
const shortid = require('shortid');

exports.getCount = (req, res) => {
  Paste.countDocuments({}, function(err, count) {
    res.status(200).json({ count });
  });
};

exports.getPaste = (req, res) => {
  const id = req.params.id;
  Paste.findOne({ id }, function(err, result) {
    if (err) throw err;
    if (!result) {
      res.status(200).json({ text: "Paste not found..." });
    } else {
      res.status(200).json({ text: result.text });
    }
  });
};

exports.savePaste = (req, res) => {
  const id = shortid.generate()
  Paste.create({id, text: req.body.text}, function(err, result){
    if (err) throw err;
    res.status(200).json({message: "ok", shortid: id});
  })
}