const express = require('express')
const router = express.Router()
const pasteController = require("../controllers/pastes")

router.get("/count", pasteController.getCount)
router.get("/:id", pasteController.getPaste)
router.post("/", pasteController.savePaste)

module.exports = router