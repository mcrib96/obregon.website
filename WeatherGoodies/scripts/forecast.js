var OPENWEATHER_API_KEY = '028c249a6c65037df1c15dfb2ae341a0';
var ROOT_URL = "http://api.openweathermap.org/data/2.5/forecast?appid="+OPENWEATHER_API_KEY;

function kelvinToFahrenheit(in_kelvin) {
    if ( isNaN(in_kelvin) ) {
        return -1;
    }
    return ( (in_kelvin * 9 / 5) - 459.67).toFixed(2);
}
function dataToMinMax(data) {
    var newdata = [];
    data.map( function(o) {
        
        var the_date = o.dt_txt.split(" ")[0];
        var the_temp = kelvinToFahrenheit(o.main.temp);
        if ( newdata[the_date] != null ) {
            if ( the_temp < newdata[the_date].min) {
                newdata[the_date].min = the_temp;    
            }
            if ( the_temp > newdata[the_date].max) {
                newdata[the_date].max = the_temp;
            }
        } else {
            newdata[the_date] = {"date":new Date(the_date),"min":the_temp,"max":the_temp};
        }
    }
    );
    return newdata;
}

function getForecast(city) {

    
    $.ajax({
     url: ROOT_URL,
     data: "q="+city+",us",
     complete: function(xhr,status) {
         eval("var arrData = " +  xhr.responseText + ";");
         var theString = "";
         var cityData = arrData['city'];
         updateMap(cityData.coord.lat,cityData.coord.lon);
         var data = dataToMinMax(arrData['list']);
         var HTML = "<table class='forecast_table'><thead>"+
                    "<tr><td colspan=3>5 Day Forecast for " +city+ "</td></tr>"+
                    "<tr><td>Date</td><td>High</td><td>Low</td></tr>"+
                    "</thead><tbody>";
         for ( var index in data ) {
            var formatted_date = (data[index].date.getMonth()+1) + "/" + data[index].date.getDate();
            HTML += "<tr><td>"+
                    formatted_date+"</td>"+
                    "<td>"+data[index].max+"&deg;F</td>"+
                    "<td>"+data[index].min+"&deg;F</td></tr>"
         }
         HTML += "</tbody></table>"
         $("#5day-forecast").html(HTML);
     }
  });
}