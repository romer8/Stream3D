//INITIALIZE VARIABLES TO WORK WITH THE JAVASCTIPT

var basemap="Gray";
var globalLayer;
// var stream="7000002";
// var lat="37.17293431";
// var long="9.760442195";
var mapContainer="map";
var backgroundColor="#000000";
var countries=["select country","global"];
var option = '';
$('.carousel').carousel('pause');
let annualDamageA = document.getElementById("valueDamageA");
let annualAvoidedDamageA = document.getElementById("valueAvoidA");

let annualCurrentExpectedA = document.getElementById("currentAnualExpectedA");
let socioIncreaseA = document.getElementById("SocioIncreaseA");
let climateChangeA = document.getElementById("ClimateChangeA");
let f2030IncreaseA = document.getElementById("2030AnnualA");
let annualCurrentExpectedB = document.getElementById("currentAnualExpectedB");
let socioIncreaseB = document.getElementById("SocioIncreaseB");
let climateChangeB = document.getElementById("ClimateChangeB");
let f2030IncreaseB = document.getElementById("2030AnnualB");

let annualCurrentExpectedC = document.getElementById("currentAnualExpectedC");
let socioIncreaseC = document.getElementById("SocioIncreaseC");
let climateChangeC = document.getElementById("ClimateChangeC");
let f2030IncreaseC = document.getElementById("2030AnnualC");



//Initialize Map//
defineMapService(mapContainer,basemap,globalLayer);

// BUILDING THE ARRAY WITH COUNTRIES//
var arrayFeaturesCountries=countriesGeoJson.features.forEach(function(item){
  countries.push(item.properties.name);
});
for (var i=0;i<countries.length;i++){
   option += '<option value="'+ countries[i] + '">' + countries[i] + '</option>';

}
// MAKING THE DROPDOWN MENU
$('#countryList').append(option);

//ADDING THE CLICK EVENT TO THE DROPDOWN MENU, SO ONE CAN SELECT IT//
$('#countryList').on("click change", function(e){
    e.preventDefault();
    console.log(e);
    var country=e.target.text;
    if(typeof (e.target.text) != 'undefined'){
      chooseCountry(country,backgroundColor);

    }
    else{
      console.log('The country selected is undefined ');
    }
});
//MAKING THE AUTOCOMPLETION FOR THE SEARCH BAR //
autocomplete(document.getElementById("myInput"), countries);


// DEFINING FUNCTION FOR THE SEARCH BOX //
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              chooseCountry(inp.value,backgroundColor);
              console.log(inp.value);
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

//slider //
console.log(giveURL());
//slider Initialization and change in the output//
var elements = document.getElementsByTagName('output')[0];
console.log(elements);
var sliderUI = $('input[type="range"]')[0];
sliderUI.addEventListener("change", function(e){
  console.log(e.target.value);
  let valSLider = e.target.value.toString();
  let newVal = arrayTrans[valSLider];
  console.log(newVal);
  elements.innerHTML = newVal;
  let urlGeosJson = giveURL();
  $.ajax({
     url: urlGeosJson,
     datatype: 'json',
     jsonCallback: 'getJson',
     success: function(data2){

       let dataG = data2.features[0].properties;
       console.log(data2.features[0].properties);
       let g10_bh = makeArray("G10_bh",dataG);
       let g30_24 = makeArray("G30_24",dataG);
       let g30_28 = makeArray("G30_28",dataG);
       let g30_3h = makeArray("G30_3h",dataG);
       let g30_2h = makeArray("G30_2h",dataG);
       let g30_b4 = makeArray("G30_b4",dataG);
       let g30_b8 = makeArray("G30_b8",dataG);

       // let yValuesG10 = Object.values(g10_bh);
       let xValuesRP = Object.values(returnPeriodsProbs);
       let splitG10_bh = splitArrays(g10_bh,e.target.value);
       let splitG30_24 = splitArrays(g30_24,e.target.value);
       let splitG30_28 = splitArrays(g30_28,e.target.value);
       let splitG30_3h = splitArrays(g30_3h,e.target.value);
       let splitG30_2h = splitArrays(g30_2h,e.target.value);
       let splitG30_b4 = splitArrays(g30_b4,e.target.value);
       let splitG30_b8 = splitArrays(g30_b8,e.target.value);

       let splitXvaluesRP = splitArrays(xValuesRP,e.target.value);

       console.log(xValuesRP);
       console.log(g10_bh);
       console.log(splitG10_bh);
       console.log(splitXvaluesRP);
       changeGraphs(splitXvaluesRP['first'],splitG10_bh['first'],splitXvaluesRP['second'],splitG10_bh['second'],'#5531B7','#0A0A0A')
       // Now we have to define the values in the right part //
       let firstIntegration = integrationWhole(splitXvaluesRP['first'],splitG10_bh['first']);
       let secondIntegration = integrationWhole(splitXvaluesRP['second'],splitG10_bh['second']);
       let firstIntegration30_24 = integrationWhole(splitXvaluesRP['first'],splitG30_24['first']);
       let secondIntegration30_24 = integrationWhole(splitXvaluesRP['second'],splitG30_24['second']);
       let firstIntegration30_28 = integrationWhole(splitXvaluesRP['first'],splitG30_28['first']);
       let secondIntegration30_28 = integrationWhole(splitXvaluesRP['second'],splitG30_28['second']);
       let firstIntegration30_3h = integrationWhole(splitXvaluesRP['first'],splitG30_3h['first']);
       let secondIntegration30_3h = integrationWhole(splitXvaluesRP['second'],splitG30_3h['second']);
       let firstIntegration30_2h = integrationWhole(splitXvaluesRP['first'],splitG30_2h['first']);
       let secondIntegration30_2h = integrationWhole(splitXvaluesRP['second'],splitG30_2h['second']);
       let firstIntegration30_b4 = integrationWhole(splitXvaluesRP['first'],splitG30_b4['first']);
       let secondIntegration30_b4 = integrationWhole(splitXvaluesRP['second'],splitG30_b4['second']);
       let firstIntegration30_b8 = integrationWhole(splitXvaluesRP['first'],splitG30_b8['first']);
       let secondIntegration30_b8 = integrationWhole(splitXvaluesRP['second'],splitG30_b8['second']);



       annualDamageA.innerHTML = `$ ${ abbreviateNumber(secondIntegration,2)}`;
       annualAvoidedDamageA.innerHTML = `$ ${ abbreviateNumber(firstIntegration,2)}`;

       currentAnualExpectedA.innerHTML = `$ ${ abbreviateNumber(secondIntegration,2)}`;
       console.log("THIS IS MY TEST SOCIO ECONOMIC");
       console.log(secondIntegration30_2h -secondIntegration);
       console.log("THIS IS MY TEST CLIMATE CHANGE");
       console.log(secondIntegration30_b4 -secondIntegration);

       let increaseSocioA = makesLessThanZero(secondIntegration30_2h -secondIntegration);
       // makesLessThanZero(increaseSocioA);
       let increaseClimateA = makesLessThanZero(secondIntegration30_b4 -secondIntegration);
       // makesLessThanZero(increaseClimateA)
       socioIncreaseA.innerHTML = `$ ${ abbreviateNumber(increaseSocioA,2)}`;
       climateChangeA.innerHTML = `$ ${ abbreviateNumber(increaseClimateA,2)}`;
       f2030IncreaseA.innerHTML = `$ ${ abbreviateNumber(secondIntegration30_24,2)}`;

       currentAnualExpectedB.innerHTML = `$ ${ abbreviateNumber(secondIntegration,2)}`;
       currentAnualExpectedC.innerHTML = `$ ${ abbreviateNumber(secondIntegration,2)}`;


       console.log(firstIntegration);

       console.log(secondIntegration);
       makeWaterFallChart();
     }

   })


})
