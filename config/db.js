const mongoose = require("mongoose");
const config = require("config");
const uri = config.get("mongoURI");

const DBConnecion = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = DBConnecion;
