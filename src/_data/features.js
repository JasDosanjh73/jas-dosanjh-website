const fs = require("node:fs");
const path = require("node:path");

module.exports = function() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "../../features.json"), "utf8"));
};
