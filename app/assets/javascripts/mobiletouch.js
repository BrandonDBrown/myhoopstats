var dmakeft = 0;
var dtotalft = 0;

var dmakejs = 0;
var dtotaljs = 0;

var m = new Marka('#icon1');
m.set('circle-o').size(30);

var n = new Marka('#icon2');
n.set('circle-o').size(30);

var o = new Marka('#icon3');
o.set('square-o').size(30);
$(".toggler1").addClass('active1');
var setme = "Free Throw";

var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var button4 = document.getElementById('button4');
var button5 = document.getElementById('button5');

document.getElementById("practice_makeft").value = 0;
document.getElementById("practice_totalft").value = 0;
document.getElementById("practice_percentageft").value = 0;
document.getElementById("practice_makejs").value = 0;
document.getElementById("practice_totaljs").value = 0;
document.getElementById("practice_percentagejs").value = 0;


//TOUCH FUNCTIONS

//    SET FREE THROW
    Hammer(button1).on("tap", function() {
        setme = "Free Throw";
        $(".toggler1").addClass('active1');
        $(".toggler2").removeClass('active1');
        o.set('square-o').size(30);
        o.color('#1a1a1a'); 
        
//        BUTTON SOUND
        $(".click-play")[0].currentTime = 0;
        return $(".click-play")[0].play();
    });

//SET JUMP SHOT
    Hammer(button2).on("tap", function() {
        setme = "Jump Shot";
        $(".toggler2").addClass('active1');
        $(".toggler1").removeClass('active1');
        o.set('square-o').size(30);
        o.color('#1a1a1a');
        
//        BUTTON SOUND
        $(".click-play")[0].currentTime = 0;
        return $(".click-play")[0].play();
    });    
     
//MAKE BASKET TOUCH FUNCTION
    Hammer(button3).on("tap", function() {
        if(setme === "Free Throw") {

        dmakeft = dmakeft + 1;
        dtotalft = dtotalft + 1;
        var ftperc = (dmakeft / dtotalft) * 100;
        var ftperct = Math.round(ftperc);
        var jsperc = (dmakejs / dtotaljs) * 100;
        var jsperct = Math.round(jsperc);
            
        document.getElementById("test1").innerHTML = dmakeft + '/' + dtotalft;
        document.getElementById("test2").innerHTML = ftperct + '%';
            
//ADDING VALUES TO DATABASE FORM
        document.getElementById("practice_makeft").value = dmakeft;
        document.getElementById("practice_totalft").value = dtotalft;
        document.getElementById("practice_percentageft").value = ftperct;


//button icon stuff
        setTimeout(function() {
        m.set('circle-o');
        }, 250);
        m.set('circle-o-filled').size(30);
        
//        BUTTON SOUND
        $(".audio-play")[0].currentTime = 0;
        return $(".audio-play")[0].play();
            
        } else {
            
        dmakejs = dmakejs + 1;
        dtotaljs = dtotaljs + 1;
        var jsperc = (dmakejs / dtotaljs) * 100;
        var jsperct = Math.round(jsperc);
            
        document.getElementById("test3").innerHTML = dmakejs + '/' + dtotaljs;
        document.getElementById("test4").innerHTML = jsperct + '%'; 
            
        //            ADDING VALUES TO DATABASE FORM
        document.getElementById("practice_makejs").value = dmakejs;
        document.getElementById("practice_totaljs").value = dtotaljs;
        document.getElementById("practice_percentagejs").value = jsperct;
        
        setTimeout(function() {
        m.set('circle-o');
        }, 250);
        m.set('circle-o-filled').size(30);
        }
        
//        BUTTON SOUND
        $(".audio-play")[0].currentTime = 0;
        return $(".audio-play")[0].play();
    });

//MISS FUNCTION  
    Hammer(button4).on("tap", function() {
        if(setme === "Free Throw") {
            
        dtotalft = dtotalft +1;
        var ftperc = (dmakeft / dtotalft) * 100;
        var ftperct = Math.round(ftperc);

        
        document.getElementById("test1").innerHTML = dmakeft + '/' + dtotalft;
        document.getElementById("test2").innerHTML = ftperct + '%';
            
//ADDING VALUES TO DATABASE FORM
        document.getElementById("practice_totalft").value = dtotalft;
        document.getElementById("practice_percentageft").value = ftperct;
            
        setTimeout(function() {
        n.set('circle-o');
        }, 300);
        n.set('circle-o-times').size(30);
        
//        BUTTON SOUND
        $(".miss-play")[0].currentTime = 0;
        return $(".miss-play")[0].play();
            
        } else {
        
        dtotaljs = dtotaljs +1;
        var jsperc = (dmakejs / dtotaljs) * 100;
        var jsperct = Math.round(jsperc);
            
        document.getElementById("test3").innerHTML = dmakejs + '/' + dtotaljs;
        document.getElementById("test4").innerHTML = jsperct + '%'; 
            
 //ADDING VALUES TO DATABASE FORM
        document.getElementById("practice_totaljs").value = dtotaljs;
        document.getElementById("practice_percentagejs").value = jsperct;
            
        setTimeout(function() {
        n.set('circle-o');
        }, 300);
        n.set('circle-o-times').size(30);
        }
        
                        //        BUTTON SOUND
        $(".miss-play")[0].currentTime = 0;
        return $(".miss-play")[0].play();
    });

//SAVE FUNCTION
    Hammer(button5).on("tap", function() {
        //        Reset
        dmakeft = 0;
        dtotalft = 0;
        ftperct = 0;
        ftperc = 0;
        dmakejs = 0;
        dtotaljs = 0;
        jsperct = 0;
        jsperc = 0;
                        
        setTimeout(function() {
        o.set('square-check').size(30);
        o.color('green');
        }, 100);
            
        document.getElementById("test1").innerHTML = '0';
        document.getElementById("test2").innerHTML = '0';
        document.getElementById("test3").innerHTML = '0';
        document.getElementById("test4").innerHTML = '0'; 
        
//                BUTTON SOUND
        $(".save-play")[0].currentTime = 0;
        return $(".save-play")[0].play();
    }); 


//VOICE ACTIVATION FUNCTIONS

if (annyang) {
    
//    SET FREE THROW
    var freeThrow = function() {
        setme = "Free Throw";
        $(".toggler1").addClass('active1');
        $(".toggler2").removeClass('active1');
        o.set('square-o').size(30);
        o.color('#1a1a1a'); 
        
//        BUTTON SOUND
        $(".click-play")[0].currentTime = 0;
        return $(".click-play")[0].play();
    };

//SET JUMP SHOT
    var jShot = function() {
        setme = "Jump Shot";
        $(".toggler2").addClass('active1');
        $(".toggler1").removeClass('active1');
        o.set('square-o').size(30);
        o.color('#1a1a1a');
        
//        BUTTON SOUND
        $(".click-play")[0].currentTime = 0;
        return $(".click-play")[0].play();
    };    
        
    var make = function() {
if(setme === "Free Throw") {
        dmakeft = dmakeft + 1;
        dtotalft = dtotalft + 1;
        var ftperc = (dmakeft / dtotalft) * 100;
        var ftperct = Math.round(ftperc);
        var jsperc = (dmakejs / dtotaljs) * 100;
        var jsperct = Math.round(jsperc);
            
        document.getElementById("test1").innerHTML = dmakeft + '/' + dtotalft;
        document.getElementById("test2").innerHTML = ftperct + '%';
            
//ADDING VALUES TO DATABASE FORM
        document.getElementById("practice_makeft").value = dmakeft;
        document.getElementById("practice_totalft").value = dtotalft;
        document.getElementById("practice_percentageft").value = ftperct;


//button icons
        setTimeout(function() {
        m.set('circle-o');
        }, 250);
        m.set('circle-o-filled').size(30);
        
        //        BUTTON SOUND
        $(".audio-play")[0].currentTime = 0;
        return $(".audio-play")[0].play();
    
        } else {
            
        dmakejs = dmakejs + 1;
        dtotaljs = dtotaljs + 1;
        var jsperc = (dmakejs / dtotaljs) * 100;
        var jsperct = Math.round(jsperc);
            
        document.getElementById("test3").innerHTML = dmakejs + '/' + dtotaljs;
        document.getElementById("test4").innerHTML = jsperct + '%'; 
            
//            ADDING VALUES TO DATABASE FORM
        document.getElementById("practice_makejs").value = dmakejs;
        document.getElementById("practice_totaljs").value = dtotaljs;
        document.getElementById("practice_percentagejs").value = jsperct;
        
        setTimeout(function() {
        m.set('circle-o');
        }, 250);
        m.set('circle-o-filled').size(30);
            
//        BUTTON SOUND
        $(".audio-play")[0].currentTime = 0;
        return $(".audio-play")[0].play();
        }
    };
    
    var miss = function() {
        if(setme === "Free Throw") {
            
        dtotalft = dtotalft +1;
        var ftperc = (dmakeft / dtotalft) * 100;
        var ftperct = Math.round(ftperc);

        
        document.getElementById("test1").innerHTML = dmakeft + '/' + dtotalft;
        document.getElementById("test2").innerHTML = ftperct + '%';
            
//ADDING VALUES TO DATABASE FORM
        document.getElementById("practice_totalft").value = dtotalft;
        document.getElementById("practice_percentageft").value = ftperct;
            
        setTimeout(function() {
        n.set('circle-o');
        }, 300);
        n.set('circle-o-times').size(30);
        
//        BUTTON SOUND
        $(".miss-play")[0].currentTime = 0;
        return $(".miss-play")[0].play();    
        } else {
        
        dtotaljs = dtotaljs +1;
        var jsperc = (dmakejs / dtotaljs) * 100;
        var jsperct = Math.round(jsperc);
            
        document.getElementById("test3").innerHTML = dmakejs + '/' + dtotaljs;
        document.getElementById("test4").innerHTML = jsperct + '%'; 
            
 //ADDING VALUES TO DATABASE FORM
        document.getElementById("practice_totaljs").value = dtotaljs;
        document.getElementById("practice_percentagejs").value = jsperct;
            
        setTimeout(function() {
        n.set('circle-o');
        }, 300);
        n.set('circle-o-times').size(30);
        }
        
//        BUTTON SOUND
        $(".miss-play")[0].currentTime = 0;
        return $(".miss-play")[0].play();
    };

    
//SAVE FUNCTION
    
    var save = function() {
        $("#button5").click();
//        Reset
        dmakeft = 0;
        dtotalft = 0;
        ftperct = 0;
        ftperc = 0;
        dmakejs = 0;
        dtotaljs = 0;
        jsperct = 0;
        jsperc = 0;
                        
        setTimeout(function() {
        o.set('square-check').size(30);
        o.color('green');
        }, 100);
            
        document.getElementById("test1").innerHTML = '0';
        document.getElementById("test2").innerHTML = '0';
        document.getElementById("test3").innerHTML = '0';
        document.getElementById("test4").innerHTML = '0'; 
        
//                BUTTON SOUND
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
  annyang.start({autoRestart: true});
}

    



