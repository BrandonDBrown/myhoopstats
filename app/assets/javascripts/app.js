var createChart = function() {
var buyerData = {
	labels : ["January","February","March","April","May","June"],
	datasets : [
		{
            label: "One",
			fillColor : "rgba(172,194,132,0.4)",
			strokeColor : "#ACC26D",
			pointColor : "#fff",
			pointStrokeColor : "#9DB86D",
			data : [203,156,99,251,305,247]
		},
        {
            label: "Two",
			fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
			data : [100,356,199,151,205,147]
		}
	]
}



var buyers = document.getElementById('buyers').getContext('2d');

new Chart(buyers).Line(buyerData, { scaleFontColor:"black",scaleFontSize:20});
}

    	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});


   
$(document).ready(createChart);
