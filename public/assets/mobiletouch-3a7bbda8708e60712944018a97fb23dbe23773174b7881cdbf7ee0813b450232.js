function freeThrow(){return $("#option1").addClass("active"),$("#option2").removeClass("active"),o.set("square-o").size(30),o.color("#1a1a1a"),$(".click-play")[0].currentTime=0,$(".click-play")[0].play()}function jShot(){return $("#option2").addClass("active"),$("#option1").removeClass("active"),o.set("square-o").size(30),o.color("#1a1a1a"),$(".click-play")[0].currentTime=0,$(".click-play")[0].play()}function make(){if($("#option1").hasClass("active")){for(i=0;i<2;i++)action[i]+=1;return action[2]=Math.round(action[0]/action[1]*100),document.getElementById("test1").innerHTML=action[0]+"/"+action[1],document.getElementById("test2").innerHTML=action[2]+"%",$("#button5").removeClass("disabled"),setTimeout(function(){m.set("circle-o")},250),m.set("circle-o-filled").size(30),$(".audio-play")[0].currentTime=0,$(".audio-play")[0].play()}for(i=3;i<5;i++)action[i]+=1;return action[5]=Math.round(action[3]/action[4]*100),document.getElementById("test3").innerHTML=action[3]+"/"+action[4],document.getElementById("test4").innerHTML=action[5]+"%",setTimeout(function(){m.set("circle-o")},250),m.set("circle-o-filled").size(30),$("#button5").removeClass("disabled"),$(".audio-play")[0].currentTime=0,$(".audio-play")[0].play()}function miss(){return $("#option1").hasClass("active")?(action[1]+=1,action[2]=Math.round(action[0]/action[1]*100),document.getElementById("test1").innerHTML=action[0]+"/"+action[1],document.getElementById("test2").innerHTML=action[2]+"%",setTimeout(function(){n.set("circle-o")},300),n.set("circle-o-times").size(30),$("#button5").removeClass("disabled"),$(".miss-play")[0].currentTime=0,$(".miss-play")[0].play()):(action[4]+=1,action[5]=Math.round(action[3]/action[4]*100),document.getElementById("test3").innerHTML=action[3]+"/"+action[4],document.getElementById("test4").innerHTML=action[5]+"%",setTimeout(function(){n.set("circle-o")},300),n.set("circle-o-times").size(30),$("#button5").removeClass("disabled"),$(".miss-play")[0].currentTime=0,$(".miss-play")[0].play())}var action=new Array(6).fill(0),m=new Marka("#icon1");m.set("circle-o").size(30);var n=new Marka("#icon2");n.set("circle-o").size(30);var o=new Marka("#icon3");if(o.set("square-o").size(30),annyang){$("#option1").on("click",freeThrow),$("#option2").on("click",jShot),$("#button3").on("click",make),$("#button4").on("click",miss),$("#button5").on("click",function(){for($("#practice_makeft").val(action[0]),$("#practice_totalft").val(action[1]),$("#practice_percentageft").val(action[2]),$("#practice_makejs").val(action[3]),$("#practice_totaljs").val(action[4]),$("#practice_percentagejs").val(action[5]),i=0;i<action.length;i++)action[i]=0;return $(".col-xs-3 :first-child").html("0"),setTimeout(function(){o.set("square-check").size(30),o.color("green")},100),setTimeout(function(){$(".new_practice").children().val(0)},1e3),$("#button5").addClass("disabled"),$(".save-play")[0].currentTime=0,$(".save-play")[0].play()});var save=function(){for($("#button5").click(),$("#practice_makeft").val(action[0]),$("#practice_totalft").val(action[1]),$("#practice_percentageft").val(action[2]),$("#practice_makejs").val(action[3]),$("#practice_totaljs").val(action[4]),$("#practice_percentagejs").val(action[5]),i=0;i<action.length;i++)action[i]=0;return $(".col-xs-3 :first-child").html("0"),setTimeout(function(){o.set("square-check").size(30),o.color("green")},100),setTimeout(function(){$(".new_practice").children().val(0)},1e3),$("#button5").addClass("disabled"),$(".save-play")[0].currentTime=0,$(".save-play")[0].play()},commands={"free throw":freeThrow,make:make,miss:miss,"jump shot":jShot,save:save};annyang.addCommands(commands),annyang.start({autoRestart:!0,continuous:!0})}