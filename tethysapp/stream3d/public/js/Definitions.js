// THIS IS  THE HELPER MODULE FOR THE HYDROVIEWER//
var geoLayer
var jsonCountries = getAllArray();
var returnPeriodsProbs = getReturnPeriods();
var retrunURL ="";
// var geoJsonLayer=L.geoJson({}, {style: function(feature){
//
//     var fillColor=backgroundColor;
//     return { color: "#999", weight: 2, fillColor: fillColor, fillOpacity: 1  };
//   }
// });
//HELPERS FUNCTIONS///
function addContentToTabs (tab, tabContent){
  tab.addEventListener("click", function (){
    console.log("entering the forecast tab");

    //remove buttonElement or create Button
    if( document.getElementById ("download") != null){
      console.log("remove button?");
      $("#download").remove();
    }
    else{
      // var buttonElement=document.createElement("button");
      // buttonElement.innerHTML="Donwload Forecast Data";
      // buttonElement.setAttribute("id", "download");
      // divContainer.appendChild(buttonElement);
    }


    var divContainer=document.getElementById(tabContent);
    divContainer.style.display='block';

    //Define the content of the tab
    if(tabContent=='forecast'){
      graph_f(reachid,tabContent);
      // document.getElementById ("download").addEventListener("click", function() {
      //   geoglows.forecast.downloadData(reachid);
      // } , false);
    }
    else if(tabContent=='historical'){
      graph_h(reachid,tabContent);
      // document.getElementById ("download").addEventListener("click", function() {
      //   geoglows.historical.downloadData(reachid);
      // } , false);
    }
    else if(tabContent=='seasonal'){
      graph_s(reachid,tabContent);
      // document.getElementById ("download").addEventListener("click", function() {
      //   geoglows.seasonal.downloadData(reachid);
      // } , false);
    }
  });

}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

// function loadGeoJson(data) {
//     console.log(data);
//     geojsonDataFloods.addData(data);
//     map.addLayer(geojsonDataFloods);
// };

function defineMapService (divContainer,basemap,globalLayer){
    var url="https://livefeeds2dev.arcgis.com/arcgis/rest/services/GEOGLOWS/GlobalWaterModel_Medium/MapServer";
    var startTime;
    var endTime;

    map = L.map(divContainer);
    map.setView([0, 0], 3);
    // divContainer.appendChild(newMap);
    L.esri.basemapLayer(basemap).addTo(map);


    $.getJSON(url+"?f=pjson", function(data) {
        textents = data.timeInfo.timeExtent
        tinterval = data.timeInfo.defaultTimeInterval
        // console.log(textents);
        // console.log(tinterval);
        // var timeExtent = new TimeExtent();
        console.log("this is to know the true start time");
        startTime=new Date(textents[0]);
        endTime= new Date(textents[1]);
        console.log(startTime);
        console.log("this is to know the true end time");
        console.log(endTime);


        // CREATE THE GLOBALLAYER IN LEAFLET//
        globalLayer=L.esri.dynamicMapLayer({
            url: url,
            useCors: false,
            layers: [0],
            // for some reason this service in particular sometimes redirects json requests to a bogus IP address
            // f: 'image'
            from: startTime,
            to: endTime
        }).addTo(map);
        // console.log(globalLayer);

        // POPUP FOR THE DIFFERENT STREAMS //
        globalLayer.bindPopup(function(error, featureCollection){
          // specify popup options
          var tabs=document.createElement("div");
          tabs.setAttribute("id", "tabs");

          var tabsList=document.createElement("ul");
          tabsList.setAttribute("id", "listTabs");
          tabsList.style.display='block';

          tabs.appendChild(tabsList);

          var forecastTab=document.createElement("li");
          forecastTab.setAttribute("id", "forecast2");
          forecastTab.innerHTML = "Forecast";
          tabsList.appendChild(forecastTab);


          var historicalTab=document.createElement("li");
          historicalTab.setAttribute("id", "historical2");
          historicalTab.innerHTML = "Historical";

          tabsList.appendChild(historicalTab);

          var seasonalTab=document.createElement("li");
          seasonalTab.setAttribute("id", "seasonal2");
          seasonalTab.innerHTML="Seasonal"
          tabsList.appendChild(seasonalTab);


          var forecastContent=document.createElement("div");
          forecastContent.setAttribute("id", "forecast");
          tabs.appendChild(forecastContent);

          var historicalContent=document.createElement("div");
          historicalContent.setAttribute("id", "historical");
          tabs.appendChild(historicalContent);

          var seasonalContent=document.createElement("div");
          seasonalContent.setAttribute("id", "seasonal");
          tabs.appendChild(seasonalContent);



          //getting the COMID id from the stream reach//
          var option="COMID (Stream Identifier)"
          reachid=featureCollection.features[0].properties[option];
          console.log(reachid);

          // divContainer.style.display='block';

          graph_f(reachid,"forecast");
          if( document.getElementById ("download") != null){
            console.log("remove button?");
            $("#download").remove();
          };

          var buttonElement=document.createElement("button");
          buttonElement.innerHTML="Donwload Forecast Data";
          buttonElement.setAttribute("id", "download");
          forecastContent.appendChild(buttonElement);


          // document.getElementById ("download").addEventListener("click", function() {
          //   geoglows.forecast.downloadData(reachid);
          // } , false);

          //add listeners//
          addContentToTabs(forecastTab,"forecast" );
          addContentToTabs(historicalTab,"historical");
          addContentToTabs(seasonalTab,"seasonal");
          // L.DomEvent.stop(featureCollection);
          return tabs
        });

        //DEFINE THE SLIDER
        // createSliderUI(startTime,endTime);
        var sliderControl = L.control({ position: "bottomleft"});
        var startControl = L.control({ position: "topright"});
        // var startButtonControl= L.control({position: "topleft"});

        startControl.onAdd= function(map){
          var startButton = L.DomUtil.create("input", "button");
          startButton.type("button");
          startButton.title="x";
          startButton.value = "x";
          startButton.label = "x";
          container.style.width = '40px';
          container.style.height = '40px';
          return startButton


        }
        // sliderControl2.onAdd = function(map) {
        //
        //   var slider2 = L.DomUtil.create("input", "range-slider");
        //   // var buttonStart=L.DomUtil.create("submit", "button");
        //   // var buttomStop=L.DomUtil.create("submit", "button");
        //   L.DomEvent.addListener(slider2, 'mousedown', function(e) {
        //     L.DomEvent.stopPropagation(e);
        //   });
        // }

        sliderControl.onAdd = function(map) {

          var slider = L.DomUtil.create("input", "range-slider");
          // var startButton= document.createElement("button");
          // startButton. innerHTML = "Do Something";
          // slider.appendChild(startButton);
          // var buttonStart=L.DomUtil.create("submit", "button");
          // var buttomStop=L.DomUtil.create("submit", "button");
          L.DomEvent.addListener(slider, 'mousedown', function(e) {
            L.DomEvent.stopPropagation(e);
          });


          $(slider)
            .attr({'type':'range',
              'max': endTime,
              'min':startTime,
              'value': 0,
              'step': 20})
              .on('input change', function() {
                console.log($(this).val().toString());
                console.log(startTime);
              // updatePropSymbols($(this).val().toString());
              globalLayer.setTimeRange(startTime.addDays(($(this).val())/20), new Date(endTime));
            });




          return slider;
        }


        sliderControl.addTo(map);
        // startControl.addTo(map);

        //DEFINE THE SLIDER AND ITS AUTOMATION
        var myTimer;
        // console.log("my slider control");
        // console.log(sliderControl._container);
        $("#startSlider").on("click", function() {
          // var classes;
          var actualTime=0;
          var start=startTime;
          var end=endTime;
          var timeStep=Number(sliderControl._container.step);
          // var value=0;
          console.log("cliking button");
         clearInterval (myTimer);
          myTimer = setInterval (function() {
            console.log("THis is the start date");
            console.log(start);
            console.log("this is the actual time");
            console.log(actualTime);
            //CHANGE THE CONFIGURATION//
            sliderControl._container.setAttribute("min",start);
            sliderControl._container.setAttribute("value",actualTime);

            globalLayer.setTimeRange(start,end);

            actualTime=Number(sliderControl._container.value);

            //DEFINE THE IF STATEMENTS TO LOOP THE ANIMATIONS//
            if(actualTime==100){
              console.log("FINAL");
              start=startTime;
              actualTime=0;
            }
            else {
              start=start.addDays(1);
              actualTime=actualTime+timeStep;
            }

            }, 1000);
        });

        $("#stopSlider").on("click", function() {
          clearInterval(myTimer);
        })

    });
    // var urlFloods= "https://geoserver.hydroshare.org/geoserver/HS-895d19627ff84f69ad15619bb1d3da02/ows";
    //
    // var defaultParameters = {
    //     service: 'WFS',
    //     version: '1.0.0',
    //     request: 'getFeature',
    //     typeName: 'HS-895d19627ff84f69ad15619bb1d3da02:aqueduct_global_flood_risk_data_by_country_20150304',
    //     // featureID: "aqueduct_global_flood_risk_data_by_country_20150304.1",
    //     maxFeatures: 253,
    //     outputFormat: 'application/json'
    // };
    // var customParams = {
    //   bbox: map.getBounds().toBBoxString(),
    // };
    // var parameters = L.Util.extend(defaultParameters, customParams);
    // var geojsonDataFloods = new L.GeoJSON();
    //
    // $.ajax({
    //    url: urlFloods + L.Util.getParamString(parameters),
    //    datatype: 'json',
    //    jsonCallback: 'getJson',
    //    success: function(data){
    //      console.log(data);
    //      var geojsonDataFloods = new L.GeoJSON(data,{
    //        style : function(feature){
    //           var fillColor = "#006837";
    //           return { color: "#999", weight: 1, fillColor: fillColor, fillOpacity: .6 };
    //        },
    //        onEachFeature : function(feature, layer){
    //          console.log("hola");
    //          layer.bindPopup(feature.properties["unit_name"])
    //        }
    //
    //      });
    //
    //
    //      // map.addLayer(geojsonDataFloods);
    //
    //    }
    //    // loadGeoJson
    //  });

};
function giveURL() {
  return retrunURL;
}

function chooseCountry (country, backgroundColor){
    var data=JSON.parse(JSON.stringify(countriesGeoJson));
    //map.setView([0, 0], 3);

    // console.log(county);
    if(country!="global"){

      // url:"https://geoserver.hydroshare.org/geoserver/HS-895d19627ff84f69ad15619bb1d3da02/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=HS-895d19627ff84f69ad15619bb1d3da02:aqueduct_global_flood_risk_data_by_country_20150304&featureID=aqueduct_global_flood_risk_data_by_country_20150304.1&outputFormat=application/json",

        console.log("Printing the GeoJson File beginning function");
        console.log(data);
        // var country=data.features[22];
        var arrayFeaturesCountries=data.features;
        var index=arrayFeaturesCountries.findIndex(x => x.properties.name==country);
        // console.log("index");
        // console.log(index);
        var countryD=arrayFeaturesCountries[index];
        var bboxCountry=countryD.geometry.coordinates;
        var lats = []; var lngs = [];
        var borderCoordinate=[];


        if(bboxCountry.length<=1){
          console.log("Case of only size =1");
          for (var i = 0; i < bboxCountry[0].length; i++)  {
              lats.push(bboxCountry[0][i][1]);
              lngs.push(bboxCountry[0][i][0]);
              borderCoordinate.push([bboxCountry[0][i][1],bboxCountry[0][i][0]]);
              // // following not needed to calc bbox, just so you can see the points
              // L.marker([bboxCountry[0][i][1], bboxCountry[0][i][0]]).addTo(map);
          }
        }
        else{
          for(var j = 0; j < bboxCountry.length; j++){
            // console.log("this is the subarray");
            // console.log(bboxCountry[j]);
            // console.log(bboxCountry[j][0].length);

            for (var i = 0; i < bboxCountry[j][0].length; i++)  {
                lats.push(bboxCountry[j][0][i][1]);
                // console.log("adding lat");
                // console.log(bboxCountry[j][0][i][1]);
                lngs.push(bboxCountry[j][0][i][0]);
                // console.log("adding long");
                borderCoordinate.push([bboxCountry[j][0][i][1],bboxCountry[j][0][i][0]]);

                // // following not needed to calc bbox, just so you can see the points
                // L.marker([bboxCountry[0][i][1], bboxCountry[0][i][0]]).addTo(map);
            }
          }
        }

        // calc the min and max lng and lat

        var minlat = Math.min.apply(null, lats),
            maxlat = Math.max.apply(null, lats);


        var minlng = Math.min.apply(null, lngs),
            maxlng = Math.max.apply(null, lngs);



        // create a bounding rectangle that can be used in leaflet
        bbox = [[minlat,minlng],[maxlat,maxlng]];
        // console.log("this is my bbox");
        // console.log(bbox);
        //
        // // console.log(index);
        // // console.log(country);

        data.features.splice(index, 1);

        map.fitBounds(bbox);

          geoLayer=L.geoJson(data, {style: function(feature){

              var fillColor=backgroundColor;
              return { color: "#999", weight: 2, fillColor: fillColor, fillOpacity: 1  };
            }
          });

          var iterat=0;
          map.eachLayer(function(layer){
            if(iterat>2){
              // console.log(layer);
              map.removeLayer(layer);
            }
            ++iterat;
          });

          geoLayer.addTo(map);
          console.log("priting my zoom");
          console.log(map.getZoom());
          data=JSON.parse(JSON.stringify(countriesGeoJson));
          console.log(jsonCountries);
          console.log(countryD);
          // var indexJsonCountries = jsonCountries.findIndex(x = > x == countryD["properties"]['name'] );
          // console.log(indexJsonCountries);
          if(jsonCountries.includes(country) ){
            var indexJsonCountries = (jsonCountries.indexOf(country) + 1).toString();
            console.log(jsonCountries.indexOf(country));
            var urlFloodsBase= "https://geoserver.hydroshare.org/geoserver/HS-895d19627ff84f69ad15619bb1d3da02/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=HS-895d19627ff84f69ad15619bb1d3da02:aqueduct_global_flood_risk_data_by_country_20150304";
            var featureIDBase= "&featureID=aqueduct_global_flood_risk_data_by_country_20150304." + indexJsonCountries;
            console.log(featureIDBase);
            var formatoUrl = "&outputFormat=application/json"
            var urlRetrieveGeoJSonGeoserver = urlFloodsBase + featureIDBase + formatoUrl;
            retrunURL = urlRetrieveGeoJSonGeoserver;
            retrieveDataMoney(urlRetrieveGeoJSonGeoserver);


          }

    }

    // var i = 0;
    // map.eachLayer(function(){ i += 1; });
    // console.log('Map has', i, 'layers.');
  else{
    console.log("you have selected global");
    var iterat=0;
    map.eachLayer(function(layer){
      if(iterat>2){
        // console.log(layer);
        map.removeLayer(layer);
      }
      ++iterat;
    });
      map.setView([0, 0], 3);
  }
}
