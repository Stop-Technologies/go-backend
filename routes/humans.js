var express = require('express');
const Human = require("../models/Human")
var router = express.Router();

/* GET all humans route. */
router.get('/humans', async function(req, res) {
  const humans = await Human.find();
  res.send(humans);
});

module.exports = router;
