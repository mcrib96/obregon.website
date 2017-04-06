var ATOM_URL_NWS="https://alerts.weather.gov/cap/wwaatmget.php";
var BEXAR_COUNTY = "TXC029";
var COLLIN_COUNTY = "TXC085";
var HAYS_COUNTY = "TXC209";

function reformatDate(in_date) {
    var adate = new Date (in_date);
    var hours = adate.getHours();
    var minutes = adate.getMinutes();
    var modifier = "AM";
    if ( minutes < 10) {
        minutes = "0" + minutes;
    }
    if ( hours > 12 ) {
        hours -= 12;
        modifier = "PM"
    }
    if ( hours < 10 ) {
        hours = "0" + hours;
    }
    var out_date = (adate.getMonth()+1) + "/" + adate.getDate() + "/" + adate.getFullYear() + " " +
        hours + ":" + minutes + " " + modifier;
    return out_date;
}

function handleXMLData(xml, in_city) {
    var newHTML = "<table class='wx_alerts_table'><thead>"+
                    "<tr><td colspan=3>WX Alerts for " +in_city+ "</td></tr>"+
                    "</thead><tbody>";
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml,"text/xml");
    var events = xmlDoc.getElementsByTagName("entry");

    if ( events.length == 0) {
        newHTML += "<tr><td>No active alerts.</td></tr>";
    }

    var nEvents = 0;
    for ( var i=0; i<events.length; i++ ) {
        var kids = events[i].childNodes;
        var issued = "";
        var expires = "";
        var title = "";
        var link = "";
        for ( var j=0; j<kids.length;j++) {
            var tag = kids[j].nodeName;
            var html = kids[j].innerHTML;
            switch (tag) {
                case "id": link = html; break;
                case "cap:effective": issued = html; break;
                case "cap:expires": expires = html; break;
                case "cap:event": 
                    title = html; 
                    nEvents ++;
                    break;
            }
        }
        if ( title != "") {
            newHTML += "<tr><td class=title><a href='"+link+"' target='_new'>"+title+"</a></td></tr>"+
                        "<tr><td>Issued: " + reformatDate(issued) + "</td></tr>" +
                        "<tr><td>Expires: " + reformatDate(expires) + "</td></tr>";
        }
    }
    if (nEvents == 0 ) {
        newHTML += "<tr><td>There are no active watches, warnings or advisories</td></tr>";
    }
    newHTML += "</tbody></table>";

    $("#wx-alerts").html(newHTML);
}

function fetchAlerts(in_city) {
    var county = "";
    switch(in_city) {
        case "Helotes": 
            county=BEXAR_COUNTY; 
            break;
        case "Plano" : 
        case "McKinney" : 
            county=COLLIN_COUNTY; 
            break;
        case "San Marcos" : 
            county=HAYS_COUNTY; 
            break;
        default :
            $("#wx-alerts").html("");
            return;
            break;
    }
    $.ajax({
     url: ATOM_URL_NWS,
     data: "x="+county+"&y=0&__time="+ (new Date().getMilliseconds()),
     complete: function(xhr,status) {
        handleXMLData(xhr.responseText,in_city);
     }
 });
}