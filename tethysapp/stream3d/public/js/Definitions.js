// THIS IS  THE HELPER MODULE FOR THE HYDROVIEWER//
var geoLayer
var jsonCountries = getAllArray();
var returnPeriodsProbs = getReturnPeriods();
var retrunURL ="";
var addLayerPop = document.getElementById("SSPmodel");
var population_Layer;


addLayerPop.addEventListener("change",function(e){
  var legendsWms= Array.from(document.getElementsByClassName("leaflet-control-wms-legend"))[0];
  if(e.target.value === "SSP2 Population Projection for 2030"){
    var layerGeo = "popdynamics:popdynamics-pop-projection-ssp-2010-2100_ssp2-2050-total-population";
    if(population_Layer !==undefined){
      map.removeLayer(population_Layer);
      population_Layer = L.tileLayer.wms( "https://sedac.ciesin.columbia.edu/geoserver/wms", {
        layers: 'popdynamics:popdynamics-pop-projection-ssp-2010-2100_ssp2-2050-total-population'
      }).addTo(map);
      if(legendsWms !==undefined){
        legendsWms.parentElement.removeChild(legendsWms);
        var uri = `https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&FORMAT=image/jpeg&LAYER=${layerGeo}&STYLE=`;
        L.wmsLegend(uri);
      }
      if(legendsWms ==undefined){
        var uri = `https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&FORMAT=image/jpeg&LAYER=${layerGeo}&STYLE=`;
        L.wmsLegend(uri);
      }

    }
    else{
      population_Layer = L.tileLayer.wms( "https://sedac.ciesin.columbia.edu/geoserver/wms", {
        layers: 'popdynamics:popdynamics-pop-projection-ssp-2010-2100_ssp2-2050-total-population'
      }).addTo(map);
      if(legendsWms !==undefined){
        legendsWms.parentElement.removeChild(legendsWms);
        var uri = `https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&FORMAT=image/jpeg&LAYER=${layerGeo}&STYLE=`;
        L.wmsLegend(uri);
      }
      if(legendsWms ==undefined){
        var uri = `https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&FORMAT=image/jpeg&LAYER=${layerGeo}&STYLE=`;
        L.wmsLegend(uri);
      }
    }
  }
  if(e.target.value === "SSP3 Population Projection for 2030"){
    var layerGeo = "popdynamics:popdynamics-pop-projection-ssp-2010-2100_ssp3-2050-total-population";

    if(population_Layer !==undefined){
      map.removeLayer(population_Layer);
      population_Layer = L.tileLayer.wms( "https://sedac.ciesin.columbia.edu/geoserver/wms", {
        layers: 'popdynamics:popdynamics-pop-projection-ssp-2010-2100_ssp3-2050-total-population'
      }).addTo(map);
      if(legendsWms !==undefined){
        legendsWms.parentElement.removeChild(legendsWms);
        var uri = `https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&FORMAT=image/jpeg&LAYER=${layerGeo}&STYLE=`;
        L.wmsLegend(uri);
      }
      if(legendsWms == undefined){
        var uri = `https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&FORMAT=image/jpeg&LAYER=${layerGeo}&STYLE=`;
        L.wmsLegend(uri);
      }

    }
    else{
      population_Layer = L.tileLayer.wms( "https://sedac.ciesin.columbia.edu/geoserver/wms", {
        layers: 'popdynamics:popdynamics-pop-projection-ssp-2010-2100_ssp3-2050-total-population'
      }).addTo(map);
      if(legendsWms !==undefined){
        legendsWms.parentElement.removeChild(legendsWms);
        var uri = `https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&FORMAT=image/jpeg&LAYER=${layerGeo}&STYLE=`;
        L.wmsLegend(uri);
      }
      if(legendsWms == undefined){
        var uri = `https://sedac.ciesin.columbia.edu/geoserver/wms?REQUEST=GetLegendGraphic&FORMAT=image/jpeg&LAYER=${layerGeo}&STYLE=`;
        L.wmsLegend(uri);
      }


    }
  }
  if(e.target.value === "No Model SSPSs Model"){
    if(population_Layer !==undefined){
      map.removeLayer(population_Layer);
    }
    if(legendsWms !==undefined){
      legendsWms.parentElement.removeChild(legendsWms);
    }

  }
})

//HELPERS FUNCTIONS///
function addContentToTabs (tab, tabContent, buttonElement, tabContentChart){

  var _listenerf = function(){
      FORECAST.downloadData(reachid);
  };
  var _listenerh = function(){
      HISTORICAL.downloadData(reachid);
  };
  var _listeners = function(){
      SEASONAL.downloadData(reachid);
  };

  tab.addEventListener("click", function (){
    var buttonElement1;

    //remove buttonElement or create Button
    if( document.getElementById ("download") != null){
      $("#download").remove();
      buttonElement1=document.createElement("button");
      buttonElement1.setAttribute("id", "download");
      tabContentChart.appendChild(buttonElement1);
    }
    else{
      buttonElement1=document.createElement("button");
      buttonElement1.setAttribute("id", "download");
      tabContentChart.appendChild(buttonElement1);
    }

    //Define the content of the tab
    if(tabContent=='forecast'){
      FORECAST.graph_f(reachid,tabContent);
      buttonElement1.innerHTML="Donwload Forecast Data";
      buttonElement1.addEventListener("click", _listenerf, true);
    }
    else if(tabContent=='historical'){
      HISTORICAL.graph_h(reachid,'forecast');
      buttonElement1.innerHTML="Donwload Historical Data";
      buttonElement1.addEventListener("click", _listenerh, true);
    }
    else if(tabContent=='seasonal'){
      SEASONAL.graph_s(reachid,'forecast');
      buttonElement1.innerHTML="Donwload Seasonal Data";
      buttonElement1.addEventListener("click", _listeners, true);
    }
  });

}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};



function defineMapService (divContainer,basemap,globalLayer){
    var url="https://livefeeds2dev.arcgis.com/arcgis/rest/services/GEOGLOWS/GlobalWaterModel_Medium/MapServer";
    var startTime;
    var endTime;

    map = L.map(divContainer);
    map.setView([0, 0], 3);
    L.esri.basemapLayer(basemap).addTo(map);


    $.getJSON(url+"?f=pjson", function(data) {
        textents = data.timeInfo.timeExtent;
        tinterval = data.timeInfo.defaultTimeInterval;
        startTime=new Date(textents[0]);
        endTime= new Date(textents[1]);
        let strStart =startTime.getMonth() + 1 + "/" + startTime.getDate() + "/" + startTime.getFullYear();
        let strEnd = endTime.getMonth() + 1 + "/" + endTime.getDate() + "/" + endTime.getFullYear();
        let showTimeXD = document.getElementById("CurrentTimeExtent");
        let actualTimeDiv = document.getElementById ("actualDate");
        actualDate.innerHTML = strStart;
        showTimeXD.innerHTML = `${strStart} - ${strEnd}`;

        // CREATE THE GLOBALLAYER IN LEAFLET//
        globalLayer=L.esri.dynamicMapLayer({
            url: url,
            useCors: false,
            layers: [0],

            from: startTime,
            to: endTime
        }).addTo(map);

        // POPUP FOR THE DIFFERENT STREAMS //
        globalLayer.bindPopup(function(error, featureCollection){
          // specify popup options
          var tabs=document.createElement("div");
          tabs.setAttribute("id", "tabs");

          var tabsList=document.createElement("div");
          tabsList.setAttribute("id", "listTabs");
          tabs.appendChild(tabsList);
          tabsList.style.cssText = "display: flex; flex-direction: row ; width:100% ; height: 100%; ";


          var forecastTab=document.createElement("BUTTON");
          forecastTab.setAttribute("id", "forecast2");
          forecastTab.innerHTML = "Forecast";
          forecastTab.style.cssText = "width:100% ; height: 100%; ";

          tabsList.appendChild(forecastTab);


          var historicalTab=document.createElement("BUTTON");
          historicalTab.setAttribute("id", "historical2");
          historicalTab.innerHTML = "Historical";
          historicalTab.style.cssText = "width:100% ; height: 100%; ";

          tabsList.appendChild(historicalTab);

          var seasonalTab=document.createElement("BUTTON");
          seasonalTab.setAttribute("id", "seasonal2");
          seasonalTab.innerHTML="Seasonal";
          seasonalTab.style.cssText = "width:100% ; height: 100%; ";

          tabsList.appendChild(seasonalTab);


          // CONTENT //

          var forecastContent=document.createElement("div");
          forecastContent.setAttribute("id", "forecast");
          tabs.appendChild(forecastContent);


          //getting the COMID id from the stream reach//
          var option="COMID (Stream Identifier)"
          reachid=featureCollection.features[0].properties[option];

          FORECAST.graph_f(reachid,"forecast");

          // Added //

          if( document.getElementById ("download") != null){
            $("#download").remove();
          };
          var _listener = function(){
              FORECAST.downloadData(reachid);
          };
          var buttonElement=document.createElement("button");
          buttonElement.innerHTML="Donwload Forecast Data";
          buttonElement.setAttribute("id", "download");

          forecastContent.appendChild(buttonElement);
          buttonElement.addEventListener("click", _listener,true);


          //add listeners//

          addContentToTabs(forecastTab,"forecast", buttonElement,forecastContent);
          addContentToTabs(historicalTab,"historical", buttonElement, forecastContent);
          addContentToTabs(seasonalTab,"seasonal", buttonElement, forecastContent);

          return tabs
        },{maxWidth: "auto"});



        //DEFINE THE SLIDER
        // createSliderUI(startTime,endTime);
        var sliderControl = L.control({ position: "bottomleft"});
        var startControl = L.control({ position: "topright"});

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

        sliderControl.onAdd = function(map) {

          var slider = L.DomUtil.create("input", "range-slider");

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

              // updatePropSymbols($(this).val().toString());
              globalLayer.setTimeRange(startTime.addDays(($(this).val())/20), new Date(endTime));
            });
          return slider;
        }


        sliderControl.addTo(map);
        // startControl.addTo(map);

        //DEFINE THE SLIDER AND ITS AUTOMATION
        var myTimer;

        $("#startSlider").on("click", function() {
          // var classes;
          var actualTime=0;
          var start=startTime;
          var end=endTime;
          var timeStep=Number(sliderControl._container.step);
         clearInterval (myTimer);
          myTimer = setInterval (function() {

            let newCurrentVal =start.getMonth() + 1 + "/" + start.getDate() + "/" + start.getFullYear();
            actualTimeDiv.innerHTML = newCurrentVal;

            //CHANGE THE CONFIGURATION//
            sliderControl._container.setAttribute("min",start);
            sliderControl._container.setAttribute("value",actualTime);

            globalLayer.setTimeRange(start,end);

            actualTime=Number(sliderControl._container.value);

            //DEFINE THE IF STATEMENTS TO LOOP THE ANIMATIONS//
            if(actualTime==100){
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

};
function giveURL() {
  return retrunURL;
}

function chooseCountry (country, backgroundColor){
    var data=JSON.parse(JSON.stringify(countriesGeoJson));
    if(country!="global"){

        var arrayFeaturesCountries=data.features;
        var index=arrayFeaturesCountries.findIndex(x => x.properties.name==country);
        var countryD=arrayFeaturesCountries[index];
        var bboxCountry=countryD.geometry.coordinates;
        var lats = []; var lngs = [];
        var borderCoordinate=[];


        if(bboxCountry.length<=1){
          for (var i = 0; i < bboxCountry[0].length; i++)  {
              lats.push(bboxCountry[0][i][1]);
              lngs.push(bboxCountry[0][i][0]);
              borderCoordinate.push([bboxCountry[0][i][1],bboxCountry[0][i][0]]);
          }
        }
        else{
          for(var j = 0; j < bboxCountry.length; j++){


            for (var i = 0; i < bboxCountry[j][0].length; i++)  {
                lats.push(bboxCountry[j][0][i][1]);

                lngs.push(bboxCountry[j][0][i][0]);
                borderCoordinate.push([bboxCountry[j][0][i][1],bboxCountry[j][0][i][0]]);

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
              map.removeLayer(layer);
            }
            ++iterat;
          });

          geoLayer.addTo(map);

          data=JSON.parse(JSON.stringify(countriesGeoJson));


          if(jsonCountries.includes(country) ){
            var indexJsonCountries = (jsonCountries.indexOf(country) + 1).toString();
            var urlFloodsBase= "https://geoserver.hydroshare.org/geoserver/HS-895d19627ff84f69ad15619bb1d3da02/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=HS-895d19627ff84f69ad15619bb1d3da02:aqueduct_global_flood_risk_data_by_country_20150304";
            var featureIDBase= "&featureID=aqueduct_global_flood_risk_data_by_country_20150304." + indexJsonCountries;
            var formatoUrl = "&outputFormat=application/json"
            var urlRetrieveGeoJSonGeoserver = urlFloodsBase + featureIDBase + formatoUrl;
            retrunURL = urlRetrieveGeoJSonGeoserver;
            retrieveDataMoney(urlRetrieveGeoJSonGeoserver);
          }

    }

  else{
    var iterat=0;
    map.eachLayer(function(layer){
      if(iterat>2){
        map.removeLayer(layer);
      }
      ++iterat;
    });
      map.setView([0, 0], 3);
  }
}
