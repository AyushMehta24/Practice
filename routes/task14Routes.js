const express = require("express");
const controller = require("../controllers/task14Controllers");
const passport = require("passport");
require("../middleware/middle")(passport);

const router = express.Router();

router.get("/task14" ,controller.display)

module.exports = router;