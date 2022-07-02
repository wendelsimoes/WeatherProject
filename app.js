// Setup env var module
require("dotenv").config({ path: __dirname + "/.env" });

// Set express app
const express = require("express");
const app = express();

// Default dev debugging port
const port = parseInt(process.env.PORT);

// Https module for call apis
const https = require("https");

app.get("/", function (req, res) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=" +
    process.env.OPEN_WEATHER_MAP_API_KEY;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;

      const description = weatherData.weather[0].description;

      console.log(temp);
      console.log(description);
    });
  });

  res.send("index");
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
