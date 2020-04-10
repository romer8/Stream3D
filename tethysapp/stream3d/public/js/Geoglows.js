/*
This is the wrapper for the four modules related to the API:
    --Forecast
    --Historical
    --Seasonal Average
    --Return Periods(this one is also included inside each one of this ones).
*/

/*
  Exporting the Necessary Modules
*/
var forecast=require('./getForecast.js');
var historical=require('./getHistorical.js');
var seasonal=require('./getSeasonal.js');

/*
  Final wrapper for the function containing the other
  modules
*/
module.exports= {
  forecast: forecast,
  historical: historical,
  seasonal: seasonal
}
