const mongoose = require("mongoose");

const schema = mongoose.Schema({
	code: String,
	name: String,
});

module.exports = mongoose.model("Human", schema);
