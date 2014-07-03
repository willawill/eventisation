var express = require("express");
var router = express.Router()


router.get("/", function(req, res){
  res.send("So here is one question for you?");
})

module.exports = router
