// List of all countries in a simple list / array.
const countryList = [
	"Afghanistan",
  "Åland Islands",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
  "Aruba",
  "Australia",
  "Austria",
	"Azerbaijan",
	"The Bahamas",
	"Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
	"Bhutan",
	"Bolivia",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory",
  "Virgin Islands (British)",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
	"Cabo Verde",
  "Caspian Sea",
	"Cayman Islands",
	"Central African Republic",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
  "Clipperton Island",
	"Cocos (Keeling) Islands",
	"Colombia",
	"Comoros",
  "Cook Islands",
	"Costa Rica",
  "Ivory Coast",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czech Republic",
  "Democratic Republic of the Congo",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
  "East Timor",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands",
	"Faroe Islands",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern and Antarctic Lands",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
  "Kosovo",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic (the)",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
  "Macedonia",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands (the)",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands (the)",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger (the)",
	"Nigeria",
	"Niue",
	"Norfolk Island",
  "Korea (the Democratic People's Republic of)",
	"Northern Mariana Islands (the)",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines (the)",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
  "Republic of the Congo",
  "Reunion",
	"Romania",
	"Russian Federation (the)",
	"Rwanda",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "x",
  "Saint Martin (French part)",
	// "Saint Barthélemy",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
  "Korea (the Republic of)",
	"South Sudan",
	"Spain",
  "Spratly Islands",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Svalbard and Jan Mayen",
  "Swaziland",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tajikistan",
	"United Republic of Tanzania",
	"Thailand",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United Kingdom",
  "United States of America",
	"United States Minor Outlying Islands (the)",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
  "Vatican",
	"Venezuela",
	"Viet Nam",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
];

const returnPeriods = {
  "r2" : 0.5,
  "r5" : 0.2,
  "r10": 0.1,
  "r25": 0.04,
  "r50": 0.02,
  "r100": 0.01,
  "r250":0.004,
  "r500":0.002,
  "r1000":0.001
}

function getAllArray(){
  return countryList
}
function getReturnPeriods(){
  return returnPeriods
}
// Helper function for the countries //
function makeArray(ini, objectRequest){

  let finalObject = createObject2(ini);
  finalObjectArray = Object.keys(finalObject);
  let arrayValues=[];

  finalObjectArray.forEach(function(e){
    arrayValues.push(objectRequest[e])
  })
  return arrayValues;

}

function createObject2 (ini){
  let ob = {};
  ob[`${ini}_2`] = 0;
  ob[`${ini}_5`] = 0;
  ob[`${ini}_10`] = 0;
  ob[`${ini}_25`] = 0;
  ob[`${ini}_50`] = 0;
  ob[`${ini}_100`] = 0;
  ob[`${ini}_250`] = 0;
  ob[`${ini}_500`] = 0;
  ob[`${ini}_1T`] = 0;

  return ob;
}
let arrayTrans = {
  "0": "2 year Protection",
  "10": "5 year Protection",
  "20": "10 year Protection",
  "30": "25 year Protection",
  "40": "50 year Protection",
  "50": "100 year Protection",
  "60": "250 year Protection",
  "70": "500 year Protection",
  "80": "1000 year Protection",
}

function getArrayTrans(){
  return arrayTrans;
}

// change the plot //
function splitArrays(arr, val){
  let first =[];
  let second = [];
  let finalOb = {};
  if(val ==0){
    first.push(arr[0]);
    second.push(arr[0]);
    arr.forEach(function(e){
      if(!first.includes(e)){
        second.push(e);
      }
    })
  }
  if(val ==10){
    first.push(arr[0]);
    first.push(arr[1]);
    second.push(arr[1]);
    arr.forEach(function(e){
      if(!first.includes(e)){
        second.push(e);
      }
    })
  }
  if(val ==20){
    first.push(arr[0]);
    first.push(arr[1]);
    first.push(arr[2]);
    second.push(arr[2]);

    arr.forEach(function(e){
      if(!first.includes(e)){
        second.push(e);
      }
    })
  }
  if(val ==30){
    first.push(arr[0]);
    first.push(arr[1]);
    first.push(arr[2]);
    first.push(arr[3]);
    second.push(arr[3]);

    arr.forEach(function(e){
      if(!first.includes(e)){
        second.push(e);
      }
    })

  }
  if(val ==40){
    first.push(arr[0]);
    first.push(arr[1]);
    first.push(arr[2]);
    first.push(arr[3]);
    first.push(arr[4]);
    second.push(arr[4]);

    arr.forEach(function(e){
      if(!first.includes(e)){
        second.push(e);
      }
    })
  }
  if(val ==50){
    first.push(arr[0]);
    first.push(arr[1]);
    first.push(arr[2]);
    first.push(arr[3]);
    first.push(arr[4]);
    first.push(arr[5]);
    second.push(arr[5]);

    arr.forEach(function(e){
      if(!first.includes(e)){
        second.push(e);
      }
    })
  }
  if(val ==60){
    first.push(arr[0]);
    first.push(arr[1]);
    first.push(arr[2]);
    first.push(arr[3]);
    first.push(arr[4]);
    first.push(arr[5]);
    first.push(arr[6]);
    second.push(arr[6]);

    arr.forEach(function(e){
      if(!first.includes(e)){
        second.push(e);
      }
    })
  }
  if(val ==70){
    first.push(arr[0]);
    first.push(arr[1]);
    first.push(arr[2]);
    first.push(arr[3]);
    first.push(arr[4]);
    first.push(arr[5]);
    first.push(arr[6]);
    first.push(arr[7]);
    second.push(arr[7]);

    arr.forEach(function(e){
      if(!first.includes(e)){
        second.push(e);
      }
    })

  }
  if(val ==80){
    first.push(arr[0]);
    first.push(arr[1]);
    first.push(arr[2]);
    first.push(arr[3]);
    first.push(arr[4]);
    first.push(arr[5]);
    first.push(arr[6]);
    first.push(arr[7]);
    first.push(arr[8]);
    second.push(arr[8]);

    arr.forEach(function(e){
      if(!first.includes(e)){
        second.push(e);
      }
    })
  }
  finalOb ['first'] = first;
  finalOb ['second'] = second;
  return finalOb
}

// function for graphs //
function changeGraphs(x1, y1, x2,y2, color1, color2){
  var trace1 = {
     x: x1,
     y: y1,
     fill:'tonexty',
     type: 'scatter',
     fillcolor: color1,
		 name: "Current Annual Expected Damage",
     line: {
       color: color1,
       shape:'spline'

     },
   };
   var trace2 = {
     x: x2,
     y: y2,
     fill: 'tozeroy',
     type: 'scatter',
     fillcolor: color2,
		 name: "Current Annual Avoided Damage",
     line: {
       color: color2,
       shape:'spline'

     },

   };

 var data = [trace1, trace2];
 var layout = {
	 title: {
    text:'Risk Curve',
    font: {
			family: 'sans-serif',
      // size: 24
    },
    // xref: 'paper',
    x: 0.05,
  },

   yaxis: {
     title: {
       text: 'Affected Variable',
       font: {
				 family: 'sans-serif',
         size: 12,
         color: '#7f7f7f'
       }
     }
   },
   autosize: true,
	 showlegend:true,
	 legend: {
	    x: 1,
	    y: 1,
	    traceorder: 'normal',
	    font: {
	      family: 'sans-serif',
	      size: 12,
	      color: '#000'
	    },
	    bgcolor: '#E2E2E2',
	    bordercolor: '#FFFFFF',
	    borderwidth: 2
   },
   width:500,
   height:200,
   margin: {
     l: 40,
     r: 0,
     b: 20,
     t: 70,
     pad: 3
   },
 }
 Plotly.newPlot('plots', data,layout);


}

//function to integrate one part //
function integrateOnePart (x1,x2,y1,y2){
  let integration_ = (( x2 - x1 ) * ( y1 + y2 )) / 2;
  return integration_;
}

// function to iterate and integrate //
function integrationWhole(arr1, arr2){
  let sumTotal = 0;

  for(let i=0; i< arr1.length ; ++i){
    if(i+1 <arr1.length){

      let x2 = arr1[i];
      let x1 = arr1[i+1];
      let y2 = arr2[i];
      let y1 = arr2[i+1];
      let integra_ = integrateOnePart(x1,x2,y1,y2);
      sumTotal = sumTotal +integra_;
    }

  }
  if(arr1.length === 1){
    let calc = arr1[0]*arr2[0];
    sumTotal = sumTotal + calc;
  }

  return sumTotal;
}

// HAVE ABBREVIATION FOR LONG NUMBERS //

function abbreviateNumber(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    var abbrev = [ "K", "M", "B", "T" ];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.round(number*decPlaces/size)/decPlaces;

             // Handle special case where we round up to the next abbreviation
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             number += abbrev[i];

             // We are done... stop
             break;
        }
    }

    return number;
}

//WATERFALL PLOT//
function makeWaterFallChart(arr, divElementString){
  var data = [
          {
              name: "2018",
              type: "waterfall",
              orientation: "h",
              measure: [
                  "absolute",
                  "relative",
                  "relative",
                  "total",

              ],
              y: [
                  "Expected Damage",
                  "Socio-economic Change Damage",
                  "Climate Change Damage",
                  "230 Annual Expected Damage",
              ],
              x: arr,
              connector: {
                  mode: "between",
                  line: {
                      width: 1,
                      color: "rgb(0, 0, 0)",
                      dash: 0
                  }
              }
          }
      ];
  var layout = {

          waterfallgap : 150,
          yaxis: {
              type: "category",
              autorange: "reversed"
          },
          xaxis: {
              type: "linear"
          },
          // margin: { l: 150 },
          // showlegend: true,
          autosize: true,
          width:500,
          height:300,
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 10,
            pad: 2
          },
      }
  Plotly.newPlot(divElementString, data, layout);


}

//FUNCTION TO MAKE LES //
function makesLessThanZero(x){
  let y = x ;
  if(x< 0 ){
    y = 0;
  }
  return y;
}

// Deciding which functions to have //
function decideOption(x) {
  let y;
  if(x === "Affected GDP"){
    y = "G";
  }
  if(x ==="Urban Damage"){
    y = "U";
  }
  if(x === "Affected Population"){
    y = "P";
  }
  return y;
}

// FUNCTION DECIDING THE CHANGE OF THE SLIDER OR THE DROPDOWN MENU //
function retrieveDataMoney(urlGeosJson){
  $.ajax({
     url: urlGeosJson,
     datatype: 'json',
     jsonCallback: 'getJson',
     success: function(data2){

       let dataG = data2.features[0].properties;
       // let selectOptions = $('.selectpicker')[0];
       let selectOptions = document.getElementById("affectedVariable");
       let rootInitial = decideOption(selectOptions.value);
       var sliderUI = $('input[type="range"]')[1].value;

       let x10_bh = makeArray(`${rootInitial}10_bh`,dataG);
       let x30_24 = makeArray(`${rootInitial}30_24`,dataG);
       let x30_28 = makeArray(`${rootInitial}30_28`,dataG);
       let x30_3h = makeArray(`${rootInitial}30_3h`,dataG);
       let x30_2h = makeArray(`${rootInitial}30_2h`,dataG);
       let x30_b4 = makeArray(`${rootInitial}30_b4`,dataG);
       let x30_b8 = makeArray(`${rootInitial}30_b8`,dataG);
       let x30_38 = makeArray(`${rootInitial}30_38`,dataG);

       // let yValuesG10 = Object.values(g10_bh);
       let xValuesRP = Object.values(returnPeriodsProbs);
       let splitx10_bh = splitArrays(x10_bh,sliderUI);
       let splitx30_24 = splitArrays(x30_24,sliderUI);
       let splitx30_28 = splitArrays(x30_28,sliderUI);
       let splitx30_3h = splitArrays(x30_3h,sliderUI);
       let splitx30_2h = splitArrays(x30_2h,sliderUI);
       let splitx30_b4 = splitArrays(x30_b4,sliderUI);
       let splitx30_b8 = splitArrays(x30_b8,sliderUI);
       let splitx30_38 = splitArrays(x30_38,sliderUI);

       let splitXvaluesRP = splitArrays(xValuesRP,sliderUI);

       changeGraphs(splitXvaluesRP['first'],splitx10_bh['first'],splitXvaluesRP['second'],splitx10_bh['second'],'#5531B7','#0A0A0A')
       // Now we have to define the values in the right part //
       let firstIntegration = integrationWhole(splitXvaluesRP['first'],splitx10_bh['first']);
       let secondIntegration = integrationWhole(splitXvaluesRP['second'],splitx10_bh['second']);
       let firstIntegration30_24 = integrationWhole(splitXvaluesRP['first'],splitx30_24['first']);
       let secondIntegration30_24 = integrationWhole(splitXvaluesRP['second'],splitx30_24['second']);
       let firstIntegration30_28 = integrationWhole(splitXvaluesRP['first'],splitx30_28['first']);
       let secondIntegration30_28 = integrationWhole(splitXvaluesRP['second'],splitx30_28['second']);
       let firstIntegration30_3h = integrationWhole(splitXvaluesRP['first'],splitx30_3h['first']);
       let secondIntegration30_3h = integrationWhole(splitXvaluesRP['second'],splitx30_3h['second']);
       let firstIntegration30_2h = integrationWhole(splitXvaluesRP['first'],splitx30_2h['first']);
       let secondIntegration30_2h = integrationWhole(splitXvaluesRP['second'],splitx30_2h['second']);
       let firstIntegration30_b4 = integrationWhole(splitXvaluesRP['first'],splitx30_b4['first']);
       let secondIntegration30_b4 = integrationWhole(splitXvaluesRP['second'],splitx30_b4['second']);
       let firstIntegration30_b8 = integrationWhole(splitXvaluesRP['first'],splitx30_b8['first']);
       let secondIntegration30_b8 = integrationWhole(splitXvaluesRP['second'],splitx30_b8['second']);
       let firstIntegration30_38 = integrationWhole(splitXvaluesRP['first'],splitx30_38['first']);
       let secondIntegration30_38 = integrationWhole(splitXvaluesRP['second'],splitx30_38['second']);


       annualDamageA.innerHTML = `$ ${ abbreviateNumber(secondIntegration,2)}`;
       annualAvoidedDamageA.innerHTML = `$ ${ abbreviateNumber(firstIntegration,2)}`;


       //MAKING SLIDE A
       currentAnualExpectedA.innerHTML = `$ ${ abbreviateNumber(secondIntegration,2)}`;
       let increaseSocioA = makesLessThanZero(secondIntegration30_2h -secondIntegration);
       let increaseClimateA = makesLessThanZero(secondIntegration30_b4 -secondIntegration);
       let totalHypoA = secondIntegration + increaseSocioA + increaseClimateA;
       socioIncreaseA.innerHTML = `$ ${ abbreviateNumber(increaseSocioA,2)}`;
       climateChangeA.innerHTML = `$ ${ abbreviateNumber(increaseClimateA,2)}`;
       f2030IncreaseA.innerHTML = `$ ${ abbreviateNumber(secondIntegration30_24,2)}`;
       let waterFallArrayA = [secondIntegration, increaseSocioA, increaseClimateA,totalHypoA ];
       makeWaterFallChart(waterFallArrayA, "ModelGraphA");


       // MAKING SLIDE B
       annualDamageB.innerHTML = `$ ${ abbreviateNumber(secondIntegration,2)}`;
       annualAvoidedDamageB.innerHTML = `$ ${ abbreviateNumber(firstIntegration,2)}`;
       currentAnualExpectedB.innerHTML = `$ ${ abbreviateNumber(secondIntegration,2)}`;
       let increaseSocioB = makesLessThanZero(secondIntegration30_2h -secondIntegration);
       let increaseClimateB = makesLessThanZero(secondIntegration30_b8 -secondIntegration);
       let totalHypoB = secondIntegration + increaseSocioB + increaseClimateB;
       socioIncreaseB.innerHTML = `$ ${ abbreviateNumber(increaseSocioB,2)}`;
       climateChangeB.innerHTML = `$ ${ abbreviateNumber(increaseClimateB,2)}`;
       f2030IncreaseB.innerHTML = `$ ${ abbreviateNumber(secondIntegration30_28,2)}`;
       let waterFallArrayB = [secondIntegration, increaseSocioB, increaseClimateB,totalHypoB ];
       makeWaterFallChart(waterFallArrayB, "ModelGraphB");

       //MAKING SLIDE C
       annualDamageC.innerHTML = `$ ${ abbreviateNumber(secondIntegration,2)}`;
       annualAvoidedDamageC.innerHTML = `$ ${ abbreviateNumber(firstIntegration,2)}`;
       currentAnualExpectedC.innerHTML = `$ ${ abbreviateNumber(secondIntegration,2)}`;
       let increaseSocioC = makesLessThanZero(secondIntegration30_3h -secondIntegration);
       let increaseClimateC = makesLessThanZero(secondIntegration30_b8 -secondIntegration);
       let totalHypoC = secondIntegration + increaseSocioC + increaseClimateC;
       socioIncreaseC.innerHTML = `$ ${ abbreviateNumber(increaseSocioC,2)}`;
       climateChangeC.innerHTML = `$ ${ abbreviateNumber(increaseClimateC,2)}`;
       f2030IncreaseC.innerHTML = `$ ${ abbreviateNumber(secondIntegration30_38,2)}`;

       let waterFallArrayC = [secondIntegration, increaseSocioC, increaseClimateC,totalHypoC ];
       makeWaterFallChart(waterFallArrayC, "ModelGraphC");
     }

   })

}
