var rm_from_rounte = ["Avenue","AVE",
"Boulevard","blvd",
"circle","cir",
"creek","crk",
"crest","crst",
"court","ct",
"drive","dr",
"expy","expressway",
"freeway","fwy",
"Hl","Holw","Hollow",
"Hwy","Highway",
"Ln","Lane",
"Lndg","Landing",
"Loop","LP",
"Parkway",
"Pass","pkwy",
"place","pl",
"point","pt",
"road","rd",
"rdg","row",
"run",
"sq","square",
"st","street",
"terrace","ter",
"trace","trce",
"trail","trl",
"way",
"xing",
"crossing"];

function cleanRoute(route) {
   for ( var i = 0; i < rm_from_rounte.length; i++) {
        if (route.toLowerCase().indexOf(rm_from_rounte[i].toLowerCase()) > -1) {
            route = route.toLowerCase().replace(rm_from_rounte[i].toLowerCase(), '')
        }
    }
   route = $.trim(route);
   return route;
}