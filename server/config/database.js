const mongoose = require("mongoose");

exports.dbconnect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch(() => {
      console.log("There is some issue with Database");
    });
};
