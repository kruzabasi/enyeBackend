const express = require("express");
const router = express.Router();
const Axios = require("axios");

router.get("/api/rates", async (req, res) => {
  try {
    //destructure request parameters
    const { base, currency } = req.query;
    // request current rates from exchangeratesapi using provided base currency
    const extApi = await Axios.get(
      "https://api.exchangeratesapi.io/latest?base=" + base
    );
    //strip down response to include strictly rates
    const { rates: extApiResult, date } = extApi.data;
    //convert user quote currencies string to an array of currencies
    let currencies = currency.split(",");
    //use array of quote currencies to filter api response to include only requested rates
    const filteredRates = Object.keys(extApiResult)
      .filter(key => currencies.includes(key))
      .reduce((obj, key) => {
        obj[key] = extApiResult[key];
        return obj;
      }, {});
    //create object to be returned to user
    const userResults = {
      results: {
        base,
        date,
        rates: filteredRates
      }
    };
    //return curated object to user
    res.json(userResults);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
