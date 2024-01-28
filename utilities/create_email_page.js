const fs = require("fs");

const creatEmailPage = (htmldata) => {
  fs.writeFile("../public/email/email.html", htmldata, (err) => {
    if (err) {
      console.log("Cannot write into file");
    }
  });
};

module.exports = {
  creatEmailPage,
};
