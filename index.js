const Imap = require("imap");

// Configuring IMAP connection
const imap = new Imap({
  user: process.env.USER_EMAIL,
  password: process.env.APP_PASSWORD, // my app
  host: "imap.gmail.com",
  port: 993,
  authTimeout: 10000,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
});
