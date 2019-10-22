const express = require('express')
const router = express.Router()
const pasteController = require("../controllers/pastes")

router.get("/count", pasteController.getCount)
router.get("/user/:userId", pasteController.getUser)
router.get("/:id", pasteController.getPaste)
router.post("/", pasteController.savePaste)
router.delete("/delete/:id", pasteController.deletePaste)

// router.get("*", (req, res, next) => {
//     next(new Error("Error: not found"))
// })
router.use(function (err, req, res, next) {
    res.status(500).send(err.message)
})

module.exports = router