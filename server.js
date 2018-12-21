var express = require("express");
var serveStatic = require("serve-static");
require('path');

var app = express();

var https_redirect = function(req, res, next) {
  if (process.env.NODE_ENV === "production") {
    if (req.headers["x-forwarded-proto"] != "https") {
      return res.redirect("https://" + req.headers.host + req.url);
    } else {
      return next();
    }
  } else {
    return next();
  }
};

app.use(https_redirect);
app.use(serveStatic(__dirname + "/dist"));

app.all("*", function (req, res) {
  res.sendFile(__dirname + "/dist/index.html");
})

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("server started " + port);
});