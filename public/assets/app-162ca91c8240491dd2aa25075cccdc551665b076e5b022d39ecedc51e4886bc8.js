$(window).width()<768&&($("#row-eq-height").removeClass("row-eq-height"),$("#lastrow").removeClass("lastly"),$("#lastrow").addClass("lastlymob"),$("#lastrow2").removeClass("lastly"),$("#lastrow2").addClass("lastlymob")),$("#overall-link").click(function(e){$(".overall-form").show(),$(".recent-form").hide(),$("#user2-chart").removeClass("Fthrow"),$("#user2-chart").addClass("Fgoal"),$("#user1-chart").removeClass("Fgoal"),$("#user1-chart").addClass("Fthrow"),$("#recent-link").removeClass("activer"),$(this).addClass("activel"),e.preventDefault()}),$("#recent-link").click(function(e){$(".recent-form").show(),$(".overall-form").hide(),$("#user1-chart").removeClass("Fthrow"),$("#user1-chart").addClass("Fgoal"),$("#user2-chart").removeClass("Fgoal"),$("#user2-chart").addClass("Fthrow"),$("#overall-link").removeClass("activel"),$("#recent-link").addClass("activer"),e.preventDefault()}),$(".dropdown-toggle").dropdown(),$(function(){$('[data-toggle="tooltip"]').tooltip()}),jQuery(".best_in_place").best_in_place();