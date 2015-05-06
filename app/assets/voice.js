var makeft = 0;
var totalft = 0;
var percft = 0;
var missft = 0;

var makejs = 0;
var totaljs = 0;
var percjs = 0;
var missjs = 0;

var table1 = document.getElementById("fThrow");
var table2 = document.getElementById("jShot");

var dmakeft = 0;
var dtotalft = 0;

var dmakejs = 0;
var dtotaljs = 0;

var rowCount1 = table1.rows.length;
var rowCount2 = table2.rows.length;

var rowft = table1.insertRow(rowCount1);
var rowjs = table2.insertRow(rowCount2);

var summ = 0;
var sumt = 0;
var setme = 0;

var m = new Marka('#icon1');
m.set('circle-o').size(30);

var n = new Marka('#icon2');
n.set('circle-o').size(30);

var o = new Marka('#icon3');
o.set('square-o').size(30);

if (annyang) {
        // define the functions our commands will run.
//    You have to call either Free Throw or Jump Shot first of Table Breaks
    
    var freeThrow = function() {
        setme = "Free Throw";
        $(".toggler1").addClass('active1');
        $(".toggler2").removeClass('active1');
        o.set('square-o').size(30);
        o.color('#1a1a1a');
        
    };
    var jShot = function() {
        setme = "Jump Shot";
        $(".toggler2").addClass('active1');
        $(".toggler1").removeClass('active1');
        o.set('square-o').size(30);
        o.color('#1a1a1a');
    };    
        
    var make = function() {
        if(setme === "Free Throw") {
        makeft = makeft +1;
        totalft = totalft+1;
        percft = (makeft / totalft) * 100;
        perctft = Math.round(percft);
            
        dmakeft = dmakeft + 1;
        dtotalft = dtotalft + 1;
            
        document.getElementById("test").innerHTML = totalft;
        document.getElementById("test2").innerHTML = perctft + '%';
         
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
            
        document.getElementById("test").innerHTML = totaljs;
        document.getElementById("test1").innerHTML = perctjs + '%'; 
        
        setTimeout(function() {
        m.set('circle-o');
        }, 250);
        m.set('circle-o-filled').size(30);
        }
    };
    
    var miss = function() {
        if(setme === "Free Throw") {
        missft = missft +1;
        totalft = totalft+1;
        percft = (makeft / totalft) * 100;
        perctft = Math.round(percft);
            
        dtotalft = dtotalft +1;    
        
        document.getElementById("test").innerHTML = totalft;
        document.getElementById("test2").innerHTML = perctft + '%';
            
        setTimeout(function() {
        n.set('circle-o');
        }, 400);
        n.set('circle-o-times').size(30);
            
        } else {
        missjs = missjs +1;
        totaljs = totaljs+1;
        percjs = (makejs / totaljs) * 100;
        perctjs = Math.round(percjs); 
        
        dtotaljs = dtotaljs +1;
            
        document.getElementById("test").innerHTML = totaljs;
        document.getElementById("test1").innerHTML = perctjs + '%'; 
            
        setTimeout(function() {
        n.set('circle-o');
        }, 400);
        n.set('circle-o-times').size(30);
        }
    };
    
    var done = function() {
        if(setme === "Free Throw") {
//Save Data to table
        table1 = document.getElementById("fThrow");
        rowCount1 = table1.rows.length;
        rowft = table1.insertRow(rowCount1);

        var d = new Date();
        var cell1ft = rowft.insertCell(0);
        cell1ft.innerHTML = d.getFullYear();
        var cell2ft=rowft.insertCell(1);
        cell2ft.innerHTML=makeft;
        var cell3ft=rowft.insertCell(2);
        cell3ft.innerHTML = missft;
        var cell4ft=rowft.insertCell(3);
        cell4ft.innerHTML = totalft;
        var cell5ft=rowft.insertCell(4);
        cell5ft.innerHTML = perctft + '%';
        
//        //Dashboard Updates        
        var ftperc = (dmakeft / dtotalft) * 100;
        var ftperct = Math.round(ftperc);
        document.getElementById("stat2").innerHTML = ftperct + '%';
            
//        var jsperc = (dmakeft / dtotalft) * 100;
//        var jsperct = Math.round(jsperc);
//        document.getElementById("stat1").innerHTML = jsperct + '%';
        
//        Reset
        makeft = 0;
        missft = 0;
        totalft = 0;
        perctft = 0;
        document.getElementById("test").innerHTML = dtotalft + dtotaljs;
        document.getElementById("test2").innerHTML = ftperct + '%';
        $(".toggler1").removeClass('active1'); 
            
        setTimeout(function() {
        o.set('square-check').size(30);
        o.color('green');
        }, 100);
   
        } else {
        table2 = document.getElementById("jShot");
        rowCount2 = table2.rows.length;
        rowjs = table2.insertRow(rowCount2);
        var d = new Date();
        var cell1js = rowjs.insertCell(0);
        cell1js.innerHTML = d.getFullYear();
        var cell2js=rowjs.insertCell(1);
        cell2js.innerHTML=makejs;
        var cell3js=rowjs.insertCell(2);
        cell3js.innerHTML = missjs;
        var cell4js=rowjs.insertCell(3);
        cell4js.innerHTML = totaljs;
        var cell5js=rowjs.insertCell(4);
        cell5js.innerHTML = perctjs + '%';
        
        
////Dashboard Updates        
        var jsperc = (dmakejs / dtotaljs) * 100;
        var jsperct = Math.round(jsperc);
        document.getElementById("stat1").innerHTML = jsperct + '%';
        
//        Reset
        makejs = 0;
        missjs = 0;
        totaljs = 0;
        perctjs = 0;
        document.getElementById("test").innerHTML = dtotaljs + dtotalft;
        document.getElementById("test1").innerHTML = jsperct + '%';
        $(".toggler2").removeClass('active1');
            
        setTimeout(function() {
        o.set('square-check').size(30);
        o.color('green');
        }, 100);
        }

    };    
    
    
// define our commands.
// * The key is what you want your users to say.
// * The value is the action to do.
//   You can pass a function, a function name (as a string), or write your function as part of the commands object.
    
    var commands = {
      'free throw': freeThrow,
      'make': make,
      'miss': miss,
      'jump shot':jShot,
      'save': done,
    };
    
  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening.
  annyang.start();
}


