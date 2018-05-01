var dataTable;

$(document).ready(function () {
    //Initialize tooltips
    //$('.nav-tabs > li a[title]').tooltip();
    $("#fromManual").hide();
    $("#fromFile").hide();
    $("#fromApi").hide();
    $("#nsDestApi").hide();
    console.log("page loaded");
    dataTable = $('#example').dataTable();
    //dataTable.fnClearTable();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        var tabName = $active.attr("name");
        var canGoNext = false;
        if (tabName === "step01") {
        	canGoNext = validateStep1();
        } else if (tabName === "step02") {
        	canGoNext = validateStep2();
        } else {
        	canGoNext = false;
        }
        
        if (canGoNext) {
        	$active.next().removeClass('disabled');
        	nextTab($active);
        }

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
    
    $('input[type=radio][name=importType]').change(function() {
        if (this.value == 'manual') {
            console.log("manual selected");
            $("#fromManual").show();
            $("#fromFile").hide();
            $("#fromApi").hide();
        }
        else if (this.value == 'file') {
        	console.log("file selected");
            $("#fromManual").hide();
            $("#fromFile").show();
            $("#fromApi").hide();
        }
        else if (this.value == 'api') {
        	console.log("api selected");
            $("#fromManual").hide();
            $("#fromFile").hide();
            $("#fromApi").show();
        }
    });
    
    $( "#btnImportApi" ).click(function() {
    	  console.log( "btnImportApi .click() called." );
    	  $("#nsDestApi").show();
    });
    
    dataTable.fnDestroy();
  $("#example").DataTable( {
	  columnDefs: [ {
	      orderable: false,
	      className: 'select-checkbox',
	      targets:   0
	  } ],
	  select: {
		  style: 'multi',
	      selector: 'td:first-child'
	  },
	  order: [[ 1, 'asc' ]]
	      
   });

  document.getElementById('myFileDialog').addEventListener('change', readSingleFile, false);
});


function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

function validateStep1() {
	console.log("validateStep1 called");
	
	if ($("#optManual").is(':checked')) {
		var textVal = $("#txtManual").val();
		if (textVal === "") {
			return false;
		} else {
			dataTable.fnClearTable();
			var dataSet = [];
			if (textVal.includes(",") ) {
				var res = textVal.split(",");
				var arrayLength = res.length;
				for (var i = 0; i < arrayLength; i++) {
					if (res[i].length > 4) {
				    dataSet.push(['', 'NA', 'NA', res[i]]);
					}
				}
			} else {
				dataSet.push(['', 'NA', 'NA', textVal])
			}
			
			
			dataTable.fnAddData(dataSet);
			return true;
		}
	} else if ($("#optFile").is(':checked')) {
		if ($("#example").dataTable().fnGetData().length > 0) {
			return true;
		} else {
			alert("Data has not been loaded properly from the file");
			return false;
		}
   }
}

function validateStep2() {
	console.log("validateStep1 called");
	return true;
}

function readSingleFile(evt) {
	
	dataTable.fnClearTable();
    var f = evt.target.files[0]; 
    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
    	  if(f.type === "text/csv") {
	      var contents = e.target.result;
	      var allLines = contents.split(/\r\n|\n/);
	      var dataSet = [];
		  for (var i = 0; i < allLines.length; i++) {
			if (allLines[i] != "") {
			  console.log(allLines[i]);
			  var res = allLines[i].split(",");
			  if (res.length === 3 && allLines[i].length <= 96) {
				  dataSet.push(['', res[0], res[1], res[2]]);
			  }
		  	}
		  }
		 
		  if (dataSet.length > 0) {
			  dataTable.fnAddData(dataSet);
		  }
    	}
      }
      r.readAsText(f);
    } else { 
      alert("Failed to load file");
    }

  }

