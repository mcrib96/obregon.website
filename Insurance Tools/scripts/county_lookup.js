var CONST_GOOGLE_MAP_API_URL = "http://maps.googleapis.com/maps/api/geocode/json"

function findCounty() {
  var address = $("#address").val();
  var city = $("#city").val();
  var state = $("#state").val();
  var zip = $("#zip").val();
  var full_address = address + " " + city + " " + state + " " + zip;
  var county = "";
  var street_number = "";
  var route = "";
  document.title = full_address + " - (County Lookup)";
  full_address = encodeURIComponent(full_address);
   
  $.ajax({
     url: CONST_GOOGLE_MAP_API_URL,
     data: "address="+full_address,
     complete: function(xhr,status) {
	     eval("var arrData = " +  xhr.responseText + ";");
	     if ( arrData['results'].length == 0 || arrData['status'] == "ZERO_RESULTS") {
	         alert("Google did not find any results for the address you entered (less is more).");
	         return;
	     }
	     for ( var i=0; i < arrData['results'][0].address_components.length; i++ ) {
	        var types = arrData['results'][0].address_components[i].types;
	        for ( var j=0; j < types.length; j++ ) {
	           var this_type = types[j];
	           switch(this_type) {
	           case "administrative_area_level_2": 
	           		county = arrData['results'][0].address_components[i].short_name; 
	           		break;
	           case "street_number":
           			street_number = arrData['results'][0].address_components[i].short_name;
	           		break;
	           case "route":
           			route = arrData['results'][0].address_components[i].short_name;
	           		break;
	           }
	        }
	     }
         $("#full_address").html("Address:"+decodeURIComponent(full_address));
	     $("#county_name").html("County:"+county);
	     handleCountyLookup(county,street_number,route);
     }
  });

}

function handleCountyLookup(county,street_number,route) {
	var url = "http://www.google.com/search?q="+county+"+appraisal+district";
	route=cleanRoute(route);
	if ( typeof(arrTexasCounties[county]) !== 'undefined' && arrTexasCounties[county] != "http://") {
		url = arrTexasCounties[county];
	}
	if ( typeof(arrTexasCountiesAdvanced[county]) !== 'undefined' && arrTexasCountiesAdvanced[county] != "http://") {
		url = arrTexasCountiesAdvanced[county];
		url = url.replace("!!!STREET_NUMBER!!!",street_number);
		url = url.replace("!!!ROUTE!!!",route);
	}

	window.open(url);
}