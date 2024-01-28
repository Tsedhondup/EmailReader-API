const fs = require("fs");

const creatEmailPage = (data) => {
  fs.writeFile("./public/email/email.html", data, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  creatEmailPage,
};
