var CONST_HTML_PDF_URL = "https://www.htmlpdf.com/en-US/Home/Convert";
var CONST_HTML_PDF_DL_URL = "https://www.htmlpdf.com/Home/Download?downloadCacheKey=";

function fetchPDF() {
	 var source_url = encodeURIComponent($("#source_url").val());
	 var data_string = "uri="+source_url + "&pageSize=A4&loadImages=true&printBackground=true&runJavascript=false";
	 $.ajax({
     	url: CONST_HTML_PDF_URL,
     	data: data_string,
     	dataType: "jsonp",
     	method: "POST",
     	complete: function(xhr,status) {
     		eval("var arrCacheData = " +  xhr.responseText + ";");
     		var download_key = arrCacheData['DownloadCacheKey'] 
     		alert(download_key);
     		var new_url = CONST_HTML_PDF_DL_URL + download_key;
     		// top.location.href=new_url;
     	}
	 });
}