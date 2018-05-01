$(document).ready(function () {
    //Initialize tooltips
    //$('.nav-tabs > li a[title]').tooltip();
    $("#fromManual").hide();
    $("#fromFile").hide();
    $("#fromApi").hide();
    $("#nsDestApi").hide();
    console.log("page loaded");
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

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
    
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}