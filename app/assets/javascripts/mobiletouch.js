//ARRAY[makeft, totalft, ftperc, makejs, totaljs, jsperc]
var action = new Array(6).fill(0)

var m = new Marka('#icon1');
m.set('circle-o').size(30);

var n = new Marka('#icon2');
n.set('circle-o').size(30);

var o = new Marka('#icon3');
o.set('square-o').size(30);

if (annyang) {
//TOUCH FUNCTIONS

//    SET FREE THROW
$("#option1").on("click", freeThrow)
$("#option2").on("click", jShot)
$("#button3").on("click", make)
$("#button4").on("click", miss)


function freeThrow() {
				$("#option1").addClass('active');
				$("#option2").removeClass('active');		
        o.set('square-o').size(30);
        o.color('#1a1a1a'); 
        
//        BUTTON SOUND
        $(".click-play")[0].currentTime = 0;
        return $(".click-play")[0].play();
				
    };

//SET JUMP SHOT
function jShot() {
				$("#option2").addClass('active');
				$("#option1").removeClass('active');
        o.set('square-o').size(30);
        o.color('#1a1a1a');
        
//        BUTTON SOUND
        $(".click-play")[0].currentTime = 0;
        return $(".click-play")[0].play();
    };    
     
//MAKE BASKET TOUCH FUNCTION
function make(){
  	if($("#option1").hasClass('active')) {
			for (i=0;i<2;i++){ action[i] += 1 }
      action[2] = Math.round((action[0] / action[1]) * 100);   
      document.getElementById("test1").innerHTML = action[0] + '/' + action[1];
      document.getElementById("test2").innerHTML = action[2] + '%';
            
      $('#button5').removeClass('disabled');
			
			//button icon stuff
       setTimeout(function() {
       m.set('circle-o');
       }, 250);
       m.set('circle-o-filled').size(30);
        
//        BUTTON SOUND
        $(".audio-play")[0].currentTime = 0;
        return $(".audio-play")[0].play();
            
        } else {
        	for (i=3;i<5;i++){ action[i] += 1 }
        	action[5] = Math.round((action[3] / action[4]) * 100);
            
        	document.getElementById("test3").innerHTML = action[3] + '/' + action[4];
        	document.getElementById("test4").innerHTML = action[5] + '%'; 
        
					setTimeout(function() {
					m.set('circle-o');
					}, 250);
					m.set('circle-o-filled').size(30);
					}

					$('#button5').removeClass('disabled');
					//BUTTON SOUND
					$(".audio-play")[0].currentTime = 0;
					return $(".audio-play")[0].play();
    };
	
//MISS FUNCTION  
function miss() {
      if($("#option1").hasClass('active')) {
        action[1] += 1;
        action[2] = Math.round((action[0] / action[1]) * 100);
				
        document.getElementById("test1").innerHTML = action[0] + '/' + action[1];
        document.getElementById("test2").innerHTML = action[2] + '%';
            
        setTimeout(function() {
        n.set('circle-o');
        }, 300);
        n.set('circle-o-times').size(30);
            
        $('#button5').removeClass('disabled');
        
//        BUTTON SOUND
        $(".miss-play")[0].currentTime = 0;
        return $(".miss-play")[0].play();
            
        } else {
					action[4] += 1;
					action[5] = Math.round((action[3] / action[4]) * 100);

					document.getElementById("test3").innerHTML = action[3] + '/' + action[4];
					document.getElementById("test4").innerHTML = action[5] + '%'; 

					setTimeout(function() {
					n.set('circle-o');
					}, 300);
					n.set('circle-o-times').size(30);
					}

					$('#button5').removeClass('disabled');
					 //        BUTTON SOUND
					$(".miss-play")[0].currentTime = 0;
					return $(".miss-play")[0].play();
    };

//SAVE FUNCTION
$("#button5").on("click", function() {
				$("#practice_makeft").val(action[0]);
				$("#practice_totalft").val(action[1]);
				$("#practice_percentageft").val(action[2]);
				$("#practice_makejs").val(action[3]);
				$("#practice_totaljs").val(action[4]);
				$("#practice_percentagejs").val(action[5]);

        //        Reset
				for (i=0;i<action.length;i++){ action[i] = 0 }
        $( ".col-xs-3 :first-child" ).html('0')
				
        setTimeout(function() {
        o.set('square-check').size(30);
        o.color('green');
        }, 100);
				
				//Resetting Rails form fields to zero
				setTimeout(function() {
					$('.new_practice').children().val(0)},1000)
        
         $('#button5').addClass('disabled');
        
				//BUTTON SOUND
        $(".save-play")[0].currentTime = 0;
        return $(".save-play")[0].play();
    }); 

	
//SAVE FUNCTION
    
    var save = function() {
				$("#button5").click();
				$("#practice_makeft").val(action[0]);
				$("#practice_totalft").val(action[1]);
				$("#practice_percentageft").val(action[2]);
				$("#practice_makejs").val(action[3]);
				$("#practice_totaljs").val(action[4]);
				$("#practice_percentagejs").val(action[5]);

        //        Reset
				for (i=0;i<action.length;i++){ action[i] = 0 }
        $( ".col-xs-3 :first-child" ).html('0')
				
        setTimeout(function() {
        o.set('square-check').size(30);
        o.color('green');
        }, 100);
				
				//Resetting Rails form fields to zero
				setTimeout(function() {
					$('.new_practice').children().val(0)},1000)
        
         $('#button5').addClass('disabled');
        
				//BUTTON SOUND
        $(".save-play")[0].currentTime = 0;
        return $(".save-play")[0].play();
    };    
    
    

// * The key is what you want your users to say.
// * The value is the action to do.
//   You can pass a function, a function name (as a string), or write your function as part of the commands object.
    
    var commands = {
      'free throw': freeThrow,
      'make': make,
      'miss': miss,
      'jump shot':jShot,
      'save': save,
    };
    
  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening.
  annyang.start({autoRestart: true, continuous: true});
}



    



