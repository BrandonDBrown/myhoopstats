var dmakeft=0,dtotalft=0,dmakejs=0,dtotaljs=0,m=new Marka("#icon1");m.set("circle-o").size(30);var n=new Marka("#icon2");n.set("circle-o").size(30);var o=new Marka("#icon3");o.set("square-o").size(30),$(".toggler1").addClass("active1");var setme="Free Throw",button1=document.getElementById("button1"),button2=document.getElementById("button2"),button3=document.getElementById("button3"),button4=document.getElementById("button4"),button5=document.getElementById("button5");if(document.getElementById("practice_makeft").value=0,document.getElementById("practice_totalft").value=0,document.getElementById("practice_percentageft").value=0,document.getElementById("practice_makejs").value=0,document.getElementById("practice_totaljs").value=0,document.getElementById("practice_percentagejs").value=0,Hammer(button1).on("tap",function(){setme="Free Throw",$(".toggler1").addClass("active1"),$(".toggler2").removeClass("active1"),o.set("square-o").size(30),o.color("#1a1a1a")}),Hammer(button2).on("tap",function(){setme="Jump Shot",$(".toggler2").addClass("active1"),$(".toggler1").removeClass("active1"),o.set("square-o").size(30),o.color("#1a1a1a")}),Hammer(button3).on("tap",function(){if("Free Throw"===setme){dmakeft+=1,dtotalft+=1;var e=dmakeft/dtotalft*100,t=Math.round(e),a=dmakejs/dtotaljs*100,n=Math.round(a);document.getElementById("test1").innerHTML=dmakeft+"/"+dtotalft,document.getElementById("test2").innerHTML=t+"%",document.getElementById("practice_makeft").value=dmakeft,document.getElementById("practice_totalft").value=dtotalft,document.getElementById("practice_percentageft").value=t,$("#button5").removeClass("disabled"),setTimeout(function(){m.set("circle-o")},250),m.set("circle-o-filled").size(30)}else{dmakejs+=1,dtotaljs+=1;var a=dmakejs/dtotaljs*100,n=Math.round(a);document.getElementById("test3").innerHTML=dmakejs+"/"+dtotaljs,document.getElementById("test4").innerHTML=n+"%",document.getElementById("practice_makejs").value=dmakejs,document.getElementById("practice_totaljs").value=dtotaljs,document.getElementById("practice_percentagejs").value=n,setTimeout(function(){m.set("circle-o")},250),m.set("circle-o-filled").size(30)}$("#button5").removeClass("disabled")}),Hammer(button4).on("tap",function(){if("Free Throw"===setme){dtotalft+=1;var e=dmakeft/dtotalft*100,t=Math.round(e);document.getElementById("test1").innerHTML=dmakeft+"/"+dtotalft,document.getElementById("test2").innerHTML=t+"%",document.getElementById("practice_totalft").value=dtotalft,document.getElementById("practice_percentageft").value=t,setTimeout(function(){n.set("circle-o")},300),n.set("circle-o-times").size(30),$("#button5").removeClass("disabled")}else{dtotaljs+=1;var a=dmakejs/dtotaljs*100,o=Math.round(a);document.getElementById("test3").innerHTML=dmakejs+"/"+dtotaljs,document.getElementById("test4").innerHTML=o+"%",document.getElementById("practice_totaljs").value=dtotaljs,document.getElementById("practice_percentagejs").value=o,setTimeout(function(){n.set("circle-o")},300),n.set("circle-o-times").size(30)}$("#button5").removeClass("disabled")}),Hammer(button5).on("tap",function(){dmakeft=0,dtotalft=0,ftperct=0,ftperc=0,dmakejs=0,dtotaljs=0,jsperct=0,jsperc=0,setTimeout(function(){o.set("square-check").size(30),o.color("green")},100),document.getElementById("test1").innerHTML="0",document.getElementById("test2").innerHTML="0",document.getElementById("test3").innerHTML="0",document.getElementById("test4").innerHTML="0",setTimeout(function(){document.getElementById("practice_makejs").value=dmakejs,document.getElementById("practice_totaljs").value=dtotaljs,document.getElementById("practice_percentagejs").value=jsperct,document.getElementById("practice_makeft").value=dmakeft,document.getElementById("practice_totalft").value=dtotalft,document.getElementById("practice_percentageft").value=ftperct},1e3),$("#button5").addClass("disabled")}),annyang){var freeThrow=function(){setme="Free Throw",$(".toggler1").addClass("active1"),$(".toggler2").removeClass("active1"),o.set("square-o").size(30),o.color("#1a1a1a")},jShot=function(){setme="Jump Shot",$(".toggler2").addClass("active1"),$(".toggler1").removeClass("active1"),o.set("square-o").size(30),o.color("#1a1a1a")},make=function(){if("Free Throw"===setme){dmakeft+=1,dtotalft+=1;var e=dmakeft/dtotalft*100,t=Math.round(e),a=dmakejs/dtotaljs*100,n=Math.round(a);document.getElementById("test1").innerHTML=dmakeft+"/"+dtotalft,document.getElementById("test2").innerHTML=t+"%",document.getElementById("practice_makeft").value=dmakeft,document.getElementById("practice_totalft").value=dtotalft,document.getElementById("practice_percentageft").value=t,setTimeout(function(){m.set("circle-o")},250),m.set("circle-o-filled").size(30),$("#button5").removeClass("disabled")}else{dmakejs+=1,dtotaljs+=1;var a=dmakejs/dtotaljs*100,n=Math.round(a);document.getElementById("test3").innerHTML=dmakejs+"/"+dtotaljs,document.getElementById("test4").innerHTML=n+"%",document.getElementById("practice_makejs").value=dmakejs,document.getElementById("practice_totaljs").value=dtotaljs,document.getElementById("practice_percentagejs").value=n,setTimeout(function(){m.set("circle-o")},250),m.set("circle-o-filled").size(30),$("#button5").removeClass("disabled")}},miss=function(){if("Free Throw"===setme){dtotalft+=1;var e=dmakeft/dtotalft*100,t=Math.round(e);document.getElementById("test1").innerHTML=dmakeft+"/"+dtotalft,document.getElementById("test2").innerHTML=t+"%",document.getElementById("practice_totalft").value=dtotalft,document.getElementById("practice_percentageft").value=t,setTimeout(function(){n.set("circle-o")},300),n.set("circle-o-times").size(30),$("#button5").removeClass("disabled")}else{dtotaljs+=1;var a=dmakejs/dtotaljs*100,o=Math.round(a);document.getElementById("test3").innerHTML=dmakejs+"/"+dtotaljs,document.getElementById("test4").innerHTML=o+"%",document.getElementById("practice_totaljs").value=dtotaljs,document.getElementById("practice_percentagejs").value=o,setTimeout(function(){n.set("circle-o")},300),n.set("circle-o-times").size(30)}$("#button5").removeClass("disabled")},save=function(){dmakeft=0,dtotalft=0,ftperct=0,ftperc=0,dmakejs=0,dtotaljs=0,jsperct=0,jsperc=0,setTimeout(function(){o.set("square-check").size(30),o.color("green")},100),document.getElementById("test1").innerHTML="0",document.getElementById("test2").innerHTML="0",document.getElementById("test3").innerHTML="0",document.getElementById("test4").innerHTML="0",$("#button5").addClass("disabled"),setTimeout(function(){document.getElementById("practice_makejs").value=dmakejs,document.getElementById("practice_totaljs").value=dtotaljs,document.getElementById("practice_percentagejs").value=jsperct,document.getElementById("practice_makeft").value=dmakeft,document.getElementById("practice_totalft").value=dtotalft,document.getElementById("practice_percentageft").value=ftperct},1e3)},commands={"free throw":freeThrow,make:make,miss:miss,"jump shot":jShot,save:save};annyang.addCommands(commands),annyang.start({autoRestart:!0})}