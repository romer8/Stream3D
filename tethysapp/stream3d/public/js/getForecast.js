/**This module only deals with the forecast data, and it should be good
to add functions realted to find the forecast with lat and long as it goes**/
// import { create, all } from 'mathjs'



//**GLOBAL VARIABLES TO DEAL WITH THE FUNCTIONS**//
var dates = {highres: [], dates: []};
var values = {highres: [], max: [], mean: [], min: [], std_dev_range_lower: [], std_dev_range_upper: []};
var returnShapes;
var endpoint="https://tethys2.byu.edu/localsptapi/api/";

//** THIS FUNCTIONS RETRIEVES THE FORECAST DATA IN A GRAPH **//

function graph_f (reachid,htmlELement,add, width,height){
  width = (typeof width !== 'undefined') ?  width : 500;
  height = (typeof heigth !== 'undefined') ?  heigth : 500;
  add = (typeof add !== 'undefined') ?  add : false;
  var layer_URL=endpoint +"ForecastEnsembles/?reach_id="+reachid+"&return_format=csv";
    $.ajax({
      type: 'GET',
      url: layer_URL,
      success: function(data) {
        var allLines = data.split('\n');
        var headers = allLines[0].split(',');
        for (var i=1; i < allLines.length-1; i++) {
          var data = allLines[i].split(',');

           if (data[1] !== 'nan' ) {
              if(data[data.length-1]!=='nan'){
                dates.highres.push(data[0]);
                values.highres.push(data[data.length-1]);
              }
              data.pop();

              dates.dates.push(data[0]);
              data.shift();
              values.max.push(math.max(data));

              var average=math.mean(data);
              values.mean.push(average);
              values.min.push(math.min(data));
              var standardDev=math.std(data);
              var lowstandardDev= average-standardDev;
              var upperstandardDev= average+standardDev;
              values.std_dev_range_lower.push(lowstandardDev);
              values.std_dev_range_upper.push(upperstandardDev);
          }
      }
    },
    complete: function() {
        var mean = {
            name: 'Mean',
            x: dates.dates,
            y: values.mean,
            mode: "lines",
            line: {color: 'blue'}
        };

        var max = {
            name: 'Max',
            x: dates.dates,
            y: values.max,
            fill: 'tonexty',
            mode: "lines",
            line: {color: 'rgb(152, 251, 152)', width: 0}
        };
        // console.log("max in complete form");
        // console.log(max);
        var min = {
            name: 'Min',
            x: dates.dates,
            y: values.min,
            fill: 'none',
            mode: "lines",
            line: {color: 'rgb(152, 251, 152)'}
        };

        var std_dev_lower = {
            name: 'Std. Dev. Lower',
            x: dates.dates,
            y: values.std_dev_range_lower,
            fill: 'tonexty',
            mode: "lines",
            line: {color: 'rgb(152, 251, 152)', width: 0}
        };

        var std_dev_upper = {
            name: 'Std. Dev. Upper',
            x: dates.dates,
            y: values.std_dev_range_upper,
            fill: 'tonexty',
            mode: "lines",
            line: {color: 'rgb(152, 251, 152)', width: 0}
        };

        var data = [min, max, std_dev_lower, std_dev_upper, mean];

        if(values.highres.length > 0) {
            var highres = {
                name: 'HRES',
                x: dates.highres,
                y: values.highres,
                mode: "lines",
                line: {color: 'black'}
            };

            data.push(highres)
        }
         var layout = {
             width:width,
             height:height,
             title:'Forecast<br>' + ' Reach ID: ' + reachid,
             xaxis: {title: 'Date', showgrid: false},
             //yaxis: {title: 'Streamflow m3/s', range: [0, Math.max(...values.max) + Math.max(...values.max)/5]},
             yaxis: {title: 'Streamflow m3/s', showgrid: false},
             //shapes: returnShapes,
         };

         //Removing any exisisting element with the same name//

         // var divELement=document.getElementById("graph");

         // if(divELement !== null && add==false){
         //   Plotly.purge(divELement);
         //   divELement.remove();
         //   console.log("removing the forecast");
         // };
         //
         //
         // console.log(divELement);
         // console.log(add);
         //
         // divELement=document.createElement('div');
         // divELement.setAttribute("id", "graph");

         // divELementParent= document.getElementById(htmlELement);
         // console.log(divELementParent);
         // if(divELementParent !== null && add==false){
         //   Plotly.purge(divELementParent);
         //   // divELementParent.remove();
         //   console.log("removing the forecast parent ");
         // };

         // divELementParent.append(divELement);


         // Plotly.newPlot('graph', data, layout);
         Plotly.purge(htmlELement);
         Plotly.newPlot(htmlELement, data, layout);
         var index = data[0].x.length-1;
         // index=index.length;

         // console.log("printing indexes");
         // console.log(data[0].x[0]);
         // console.log(data[0].x[index]);
         // for(var i=0; i<data[0].x.length;i++){
         //   console.log(i);
         //   console.log(data[0].x[i]);
         //
         // };
         graph_rp(reachid, data[0].x[0], data[0].x[index],width,height,htmlELement);
         // getreturnperiods(reachid, data[0].x[0], data[0].x[index],width,height);

         dates.highres = [], dates.dates = [];
         values.highres = [], values.max = [], values.mean = [], values.min = [], values.std_dev_range_lower = [], values.std_dev_range_upper = [];
      },
    });
};
function downloadForecastData (reachid){
    console.log("enter the download function");
    // THIS IS A FUNCTION TO DOWNLOAD DATA //
    var downloadUrl=endpoint +"ForecastEnsembles/?reach_id="+reachid+"&return_format=csv"
    // var downloadUrl="https://tethys2.byu.edu/localsptapi/api/"+"ForecastEnsembles/?reach_id="+reachid+"&return_format=csv";
    var req = new XMLHttpRequest();
    req.open("GET", downloadUrl, true);
    req.responseType = "blob";
    // if the API requires the headers///
    // req.setRequestHeader('my-custom-header', 'custom-value'); // adding some headers (if needed)

    req.onload = function (event) {
      console.log("onload");
      var blob = req.response;
      var fileName = reachid;
      var contentType = req.getResponseHeader("content-type");

      //IE/EDGE seems not returning some response header
      if (req.getResponseHeader("content-disposition")) {
        console.log("enter first if");
        var contentDisposition = req.getResponseHeader("content-disposition");
        fileName = contentDisposition.substring(contentDisposition.indexOf("=")+1);
      }
      else {
        console.log("enter first else");
        fileName = reachid + " Forecast." + contentType.substring(contentType.indexOf("/")+1);
      }

      if (window.navigator.msSaveOrOpenBlob) {
        // Internet Explorer
        console.log("enter second if ");
        window.navigator.msSaveOrOpenBlob(new Blob([blob], {type: contentType}), fileName);
      }
      else {
        console.log("enter second else");
        var el = document.createElement("a");
        el.id="target";
        // var el = document.getElementById("target");
        el.href = window.URL.createObjectURL(blob);
        el.download = fileName;
        el.click();
        window.URL.revokeObjectURL(el.href);
      }
    };
    req.send();
};

function locationGraph_f (lat,lon,htmlELement,add, width,height){
    console.log("entering locationGraph_f function");
    width = (typeof width !== 'undefined') ?  width : 500;
    height = (typeof heigth !== 'undefined') ?  heigth : 500;
    add = (typeof add !== 'undefined') ?  add : false;

    var layer_URL1=endpoint +"GetReachID/?lat="+lat+"&long="+lon;
    $.ajax({
      type: 'GET',
      url: layer_URL1,
      success: function(data) {
        console.log("entering first ajax");
        var dataText=JSON.stringify(data);
        var reachid=dataText['reach_id'];
        var layer_URL=endpoint +"ForecastEnsembles/?reach_id="+reachid+"&return_format=csv";
        $.ajax({
          type: 'GET',
          url: layer_URL,
          success: function(data) {
            var allLines = data.split('\n');
            var headers = allLines[0].split(',');
            for (var i=1; i < allLines.length-1; i++) {
              var data = allLines[i].split(',');

               if (data[1] !== 'nan' ) {
                  if(data[data.length-1]!=='nan'){
                    dates.highres.push(data[0]);
                    values.highres.push(data[data.length-1]);
                  }
                  data.pop();

                  dates.dates.push(data[0]);
                  data.shift();
                  values.max.push(math.max(data));

                  var average=math.mean(data);
                  values.mean.push(average);
                  values.min.push(math.min(data));
                  var standardDev=math.std(data);
                  var lowstandardDev= average-standardDev;
                  var upperstandardDev= average+standardDev;
                  values.std_dev_range_lower.push(lowstandardDev);
                  values.std_dev_range_upper.push(upperstandardDev);
              }
          }
        },
        complete: function() {
            var mean = {
                name: 'Mean',
                x: dates.dates,
                y: values.mean,
                mode: "lines",
                line: {color: 'blue'}
            };

            var max = {
                name: 'Max',
                x: dates.dates,
                y: values.max,
                fill: 'tonexty',
                mode: "lines",
                line: {color: 'rgb(152, 251, 152)', width: 0}
            };
            // console.log("max in complete form");
            // console.log(max);
            var min = {
                name: 'Min',
                x: dates.dates,
                y: values.min,
                fill: 'none',
                mode: "lines",
                line: {color: 'rgb(152, 251, 152)'}
            };

            var std_dev_lower = {
                name: 'Std. Dev. Lower',
                x: dates.dates,
                y: values.std_dev_range_lower,
                fill: 'tonexty',
                mode: "lines",
                line: {color: 'rgb(152, 251, 152)', width: 0}
            };

            var std_dev_upper = {
                name: 'Std. Dev. Upper',
                x: dates.dates,
                y: values.std_dev_range_upper,
                fill: 'tonexty',
                mode: "lines",
                line: {color: 'rgb(152, 251, 152)', width: 0}
            };

            var data = [min, max, std_dev_lower, std_dev_upper, mean];

            if(values.highres.length > 0) {
                var highres = {
                    name: 'HRES',
                    x: dates.highres,
                    y: values.highres,
                    mode: "lines",
                    line: {color: 'black'}
                };

                data.push(highres)
            }
             var layout = {
                 autosize: true,
                 width:width,
                 height:height,
                 title:'Forecast<br>' + ' Reach ID: ' + reachid,
                 xaxis: {title: 'Date',showgrid: false},
                 //yaxis: {title: 'Streamflow m3/s', range: [0, Math.max(...values.max) + Math.max(...values.max)/5]},
                 // yaxis: {title: 'Streamflow m3/s', range: [0, Math.max(...data[1].y) + Math.max(...data[1].y)/5]},
                 yaxis: {title: 'Streamflow m3/s', showgrid: false},
                 //shapes: returnShapes,
             };

             //Removing any exisisting element with the same name//

             Plotly.purge(htmlELement);
             Plotly.newPlot(htmlELement, data, layout);

             var index = data[0].x.length-1;
             // index=index.length;

             // console.log("printing indexes");
             // console.log(data[0].x[0]);
             // console.log(data[0].x[index]);
             // for(var i=0; i<data[0].x.length;i++){
             //   console.log(i);
             //   console.log(data[0].x[i]);
             //
             // };

             // returnPeriods.graph_rp(reachid, data[0].x[0], data[0].x[index],width,height);
             // getreturnperiods(reachid, data[0].x[0], data[0].x[index],width,height);

             dates.highres = [], dates.dates = [];
             values.highres = [], values.max = [], values.mean = [], values.min = [], values.std_dev_range_lower = [], values.std_dev_range_upper = [];
          },
        });
      }
    });
};
