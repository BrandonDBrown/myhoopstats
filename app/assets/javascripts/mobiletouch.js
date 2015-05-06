var makeft = 0;
var totalft = 0;
var percft = 0;
var missft = 0;

var makejs = 0;
var totaljs = 0;
var percjs = 0;
var missjs = 0;


var dmakeft = 0;
var dtotalft = 0;

var dmakejs = 0;
var dtotaljs = 0;


var summ = 0;
var sumt = 0;


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


        // define the functions our commands will run.
//    You have to call either Free Throw or Jump Shot first of Table Breaks
//    SET FREE THROW
    Hammer(button1).on("tap", function() {
        setme = "Free Throw";
        $(".toggler1").addClass('active1');
        $(".toggler2").removeClass('active1');
        o.set('square-o').size(30);
        o.color('#1a1a1a'); 
    });
//SET JUMP SHOT
    Hammer(button2).on("tap", function() {
        setme = "Jump Shot";
        $(".toggler2").addClass('active1');
        $(".toggler1").removeClass('active1');
        o.set('square-o').size(30);
        o.color('#1a1a1a');
    });    
     
//MAKE FUNCTION
    Hammer(button3).on("tap", function() {
        if(setme === "Free Throw") {
        makeft = makeft +1;
        totalft = totalft+1;
        percft = (makeft / totalft) * 100;
        perctft = Math.round(percft);
            
        dmakeft = dmakeft + 1;
        dtotalft = dtotalft + 1;
        var ftperc = (dmakeft / dtotalft) * 100;
        var ftperct = Math.round(ftperc);
        var jsperc = (dmakejs / dtotaljs) * 100;
        var jsperct = Math.round(jsperc);
            
        document.getElementById("test1").innerHTML = dmakeft + '/' + dtotalft;
        document.getElementById("test2").innerHTML = ftperct + '%';
//         $("#makefield").val(dmakeft);
//         $("#missfield").val(dmissft);
//         $("#totalfield").val(dtotalft);
//         $("#percfield").val(dpercft);
//for practice 
//<%= form_for :practice %>
//    <%=f.hidden_field :make ,:id=>"makefield" %>
//<% end %>

        //icon stuff
        setTimeout(function() {
        m.set('circle-o');
        }, 250);
        m.set('circle-o-filled').size(30);
            
        } else {
            
        makejs = makejs +1;
        totaljs = totaljs+1;
        percjs = (makejs / totaljs) * 100;
        perctjs = Math.round(percjs);
            
        dmakejs = dmakejs + 1;
        dtotaljs = dtotaljs + 1;
        var jsperc = (dmakejs / dtotaljs) * 100;
        var jsperct = Math.round(jsperc);
            
        document.getElementById("test3").innerHTML = dmakejs + '/' + dtotaljs;
        document.getElementById("test4").innerHTML = jsperct + '%'; 
        
        setTimeout(function() {
        m.set('circle-o');
        }, 250);
        m.set('circle-o-filled').size(30);
        }
    });
//MISS FUNCTION  
    Hammer(button4).on("tap", function() {
        if(setme === "Free Throw") {
        missft = missft +1;
        totalft = totalft+1;
        percft = (makeft / totalft) * 100;
        perctft = Math.round(percft);
            
        dtotalft = dtotalft +1;
        var ftperc = (dmakeft / dtotalft) * 100;
        var ftperct = Math.round(ftperc);

        
        document.getElementById("test1").innerHTML = dmakeft + '/' + dtotalft;
        document.getElementById("test2").innerHTML = ftperct + '%';
            
        setTimeout(function() {
        n.set('circle-o');
        }, 300);
        n.set('circle-o-times').size(30);
            
        } else {
        missjs = missjs +1;
        totaljs = totaljs+1;
        percjs = (makejs / totaljs) * 100;
        perctjs = Math.round(percjs); 
        
        dtotaljs = dtotaljs +1;
        var jsperc = (dmakejs / dtotaljs) * 100;
        var jsperct = Math.round(jsperc);
            
        document.getElementById("test3").innerHTML = dmakejs + '/' + dtotaljs;
        document.getElementById("test4").innerHTML = jsperct + '%'; 
            
        setTimeout(function() {
        n.set('circle-o');
        }, 300);
        n.set('circle-o-times').size(30);
        }
    });
//    SAVE FUNCTION
    Hammer(button5).on("tap", function() {
        if(setme === "Free Throw") {
        
//        Reset
        makeft = 0;
        missft = 0;
        totalft = 0;
        perctft = 0;
                        
        setTimeout(function() {
        o.set('square-check').size(30);
        o.color('green');
        }, 100);
            
        } else {
                
//        Reset
        makejs = 0;
        missjs = 0;
        totaljs = 0;
        perctjs = 0;

            
        setTimeout(function() {
        o.set('square-check').size(30);
        o.color('green');
        }, 100);
        }

    });    
    



