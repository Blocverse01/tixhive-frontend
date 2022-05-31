require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const serverless = require("serverless-http");
const Moralis = require("moralis/node");
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const appId = process.env.REACT_APP_MORALIS_APP_ID;
const masterKey = process.env.MORALIS_MASTER_KEY;

Moralis.start({ serverUrl, appId, masterKey });

const PORT = process.env.PORT || 3000;
//const indexPath = path.resolve(__dirname, '..', 'build', 'index.html');
const indexPath = "index.html";
console.log(__dirname, indexPath);

const router = express.Router();

function getIndexData(res) {
  fs.readFile(path.join(__dirname, "index.html"), "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }

    // inject meta tags
    htmlData = htmlData
      .replace("__META_OG_TITLE__", "TixHive")
      .replace("__META_OG_URL__", `https://www.tixhive.com/`)
      .replace("__META_OG_DESCRIPTION__", "Put Your Event on-chain")
      .replace("__META_DESCRIPTION__", "Put Your Event on-chain")
      .replace(
        "__META_OG_IMAGE__",
        "https://www.tixhive.com/bloc-tickets-logo.png"
      )
      .replace("__META_TWITTER_TITLE__", "TixHive")
      .replace("__META_TWITTER_URL__", `https://www.tixhive.com/`)
      .replace("__META_TWITTER_DESCRIPTION__", "Put Your Event on-chain")
      .replace(
        "__META_TWITTER_IMAGE__",
        "https://www.tixhive.com/bloc-tickets-logo.png"
      );
    return res.send(htmlData);
  });
}

router.get("/", (req, res) => {
  // the root
  return getIndexData(res);
});

// static resources should just be served as they are
router.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

//serve event page
router.get("/events/:contract", (req, res, next) => {
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }
    // get event info
    const contractAddress = req.params.contract;
    const query = new Moralis.Query("Event");
    query.equalTo("contractAddress", contractAddress);
    return query
      .find()
      .then(([platformEvent]) => {
        if (!platformEvent) return res.status(404).send("Event Not Found");
        // inject meta tags
        htmlData = htmlData
          .replace(
            "<title>TixHive</title>",
            `<title>TixHive - ${platformEvent.get("name")}</title>`
          )
          .replace(
            "__META_OG_TITLE__",
            `TixHive - ${platformEvent.get("name")}`
          )
          .replace(
            "__META_OG_URL__",
            `https://www.tixhive.com/events/${contractAddress}`
          )
          .replace("__META_OG_DESCRIPTION__", platformEvent.get("description"))
          .replace("__META_DESCRIPTION__", platformEvent.get("description"))
          .replace("__META_OG_IMAGE__", platformEvent.get("cover_image_url"))
          .replace(
            "__META_TWITTER_TITLE__",
            `TixHive - ${platformEvent.get("name")}`
          )
          .replace(
            "__META_TWITTER_URL__",
            `https://www.tixhive.com/events/${contractAddress}`
          )
          .replace(
            "__META_TWITTER_DESCRIPTION__",
            platformEvent.get("description")
          )
          .replace(
            "__META_TWITTER_IMAGE__",
            platformEvent.get("cover_image_url")
          );
        return res.send(htmlData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).send("Event Not Found");
      });
  });
});

router.get("/*", (req, res, next) => {
  return getIndexData(res);
});

app.use(`/.netlify/functions/serverless`, router);

module.exports = app;
module.exports.handler = serverless(app);
