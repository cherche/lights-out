$(function () {
	// Attach FastClick
	FastClick.attach(document.body);

	// Caching jQuery objects
	var $body = $('body'),
		$current = $('.current'),
		$best = $('.best'),
		$table = $('table'),
		$td = $('td'),
		$repeat = $('.fa-repeat');

	// Scoring system
	var score = 0,
		best = Number.MAX_VALUE,
		scoring = function () {
			score++;
			$current.html(score);
		};
		window.scoreControl = setInterval(scoring, 1000);
	if (Cookies.get('best')) {
		best = parseInt(Cookies.get('best'), 10);
		$best.html(best);
	}

	// Initialize game
	set();
	$body.fadeIn(500);
	$td.on('click', tdClick);
	$repeat.on('click', repeatClick);

	// Functions
	function flip(cell) {
		var $cell = $('.' + cell);
		$cell.css('background-color', ($cell.css('background-color') === 'rgb(255, 255, 255)') ? 'black'  : 'white');
		return flip;
	}
	function set() {
		for (var i = 1;i <= 9;i++) {
			if (Math.random() < 0.5) {
				flip(i);
			}
		}
		if (areAllOff()) {
			set();
		}
	}
	function areAllOff() {
		var allOff = true;
		for (var i = 1;i <= 9;i++) {
			if ($('.' + i).css('background-color') === 'rgb(255, 255, 255)') {
				allOff = false;
				i = 10;
			}
		}
		return allOff;
	}
	function tdClick() {
		switch (parseInt($(this).attr('class'), 10)) {
			case 1:
				flip(1)
					(2)
					(4);
				break;
			case 2:
				flip(1)
					(2)
					(3)
					(5);
				break;
			case 3:
				flip(2)
					(3)
					(6);
				break;
			case 4:
				flip(1)
					(4)
					(5)
					(7);
				break;
			case 5:
				flip(2)
					(4)
					(5)
					(6)
					(8);
				break;
			case 6:
				flip(3)
					(5)
					(6)
					(9);
				break;
			case 7:
				flip(4)
					(7)
					(8);
				break;
			case 8:
				flip(5)
					(7)
					(8)
					(9);
				break;
			case 9:
				flip(6)
					(8)
					(9);
				break;
		}
		if (areAllOff()) {
			clearInterval(scoreControl);
			best = (score < best) ? score : best;
			Cookies.set('best', best);
			$best.html(best);

			$td.off('click');
			$table.fadeOut(500);

			setTimeout(function () {
				$repeat.fadeIn(500, function () {
					$repeat.on('click', repeatClick);
				});
			}, 500);
		}
	}
	function repeatClick() {
		location.reload();
		$current.html(score = 0);
		clearInterval(scoreControl);
		window.scoreControl = setInterval(scoring, 1000);

		$repeat.off('click');
		$repeat.fadeOut(500);
		set();

		setTimeout(function () {
			$table.fadeIn(500, function () {
				$td.on('click', tdClick);
			});
		}, 500);
	}
});
/*
var score = 0;
var score_best = Number.MAX_VALUE;
$(function() {
	FastClick.attach(document.body);
	if (Cookies.get("score_best")) {
		score_best = parseInt(Cookies.get("score_best"), 10);
		$(".score-best").empty();
		$(".score-best").append(score_best);
	}
	//Randomize position
	if (Math.random() >= 0.5) {
		flip(".1");
	}
	if (Math.random() >= 0.5) {
		flip(".2");
	}
	if (Math.random() >= 0.5) {
		flip(".3");
	}
	if (Math.random() >= 0.5) {
		flip(".4");
	}
	if (Math.random() >= 0.5) {
		flip(".5");
	}
	if (Math.random() >= 0.5) {
		flip(".6");
	}
	if (Math.random() >= 0.5) {
		flip(".7");
	}
	if (Math.random() >= 0.5) {
		flip(".8");
	}
	if (Math.random() >= 0.5) {
		flip(".9");
	}
	//Game control
	$("td").click(function() {
		switch ($(this).attr("class")) {
			case "1":
				flip(".1");
				flip(".2");
				flip(".4");
				break;
			case "2":
				flip(".1");
				flip(".2");
				flip(".3");
				flip(".5");
				break;
			case "3":
				flip(".2");
				flip(".3");
				flip(".6");
				break;
			case "4":
				flip(".1");
				flip(".4");
				flip(".5");
				flip(".7");
				break;
			case "5":
				flip(".2");
				flip(".4");
				flip(".5");
				flip(".6");
				flip(".8");
				break;
			case "6":
				flip(".3");
				flip(".5");
				flip(".6");
				flip(".9");
				break;
			case "7":
				flip(".4");
				flip(".7");
				flip(".8");
				break;
			case "8":
				flip(".5");
				flip(".7");
				flip(".8");
				flip(".9");
				break;
			case "9":
				flip(".6");
				flip(".8");
				flip(".9");
				break;
		}
	});
	setTimeout(function() {
		$(".score, #wrapper, .share, table").fadeIn("slow");
		window.scoring = setInterval(function() {
			score += 1;
			$(".score-current").empty();
			$(".score-current").append(score);
		}, 1000);
	}, 2000);
	//Rickroll
	//$("table").click(function(){window.open("https://youtu.be/dQw4w9WgXcQ","_blank");});
});
//Self-explanatory light switching
function flip(light) {
	if ($(light).css("background-color") === "rgb(255, 255, 255)") {
		$(light).css("background-color", "black");
	} else {
		$(light).css("background-color", "white");
	}
	if (($(".1").css("background-color") + $(".2").css("background-color") + $(".3").css("background-color") + $(".4").css("background-color") + $(".5").css("background-color") + $(".6").css("background-color") + $(".7").css("background-color") + $(".8").css("background-color") + $(".9").css("background-color")) === "rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)") {
		setTimeout(function() {
			if (($(".1").css("background-color") + $(".2").css("background-color") + $(".3").css("background-color") + $(".4").css("background-color") + $(".5").css("background-color") + $(".6").css("background-color") + $(".7").css("background-color") + $(".8").css("background-color") + $(".9").css("background-color")) === "rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)") {
				if (score < score_best) {
					score_best = score;
					Cookies.set("score_best", score_best.toString(10), {
						expires: 365
					});
				}
				clearInterval(scoring);
				setTimeout(function() {
					if (Math.random() >= 0.5) {
						flip(".1");
					}
					if (Math.random() >= 0.5) {
						flip(".2");
					}
					if (Math.random() >= 0.5) {
						flip(".3");
					}
					if (Math.random() >= 0.5) {
						flip(".4");
					}
					if (Math.random() >= 0.5) {
						flip(".5");
					}
					if (Math.random() >= 0.5) {
						flip(".6");
					}
					if (Math.random() >= 0.5) {
						flip(".7");
					}
					if (Math.random() >= 0.5) {
						flip(".8");
					}
					if (Math.random() >= 0.5) {
						flip(".9");
					}
				}, 1000);
				//Hide table and best score
				$("table, .score-best").fadeOut("slow");
				setTimeout(function() {
					$(".replay, .share").fadeIn("slow");
				}, 500);
				$(".replay").click(function() {
					if (score < score_best) {
						$(".score-best").empty();
						$(".score-best").append(score);
					}
					if (Cookies.get("score_best")) {
						score_best = parseInt(Cookies.get("score_best"), 10);
						$(".score-best").empty();
						$(".score-best").append(score_best);
					}
					setTimeout(function() {
						score = 0;
						$(".score-current").empty();
						$(".score-current").append(score);
					}, 10);
					setTimeout(function() {
						clearInterval(scoring);
						window.scoring = setInterval(function() {
							score += 1;
							$(".score-current").empty();
							$(".score-current").append(score);
						}, 1000);
					}, 500);
					$(".replay").fadeOut("slow");
					while (($(".1").css("background-color") + $(".2").css("background-color") + $(".3").css("background-color") + $(".4").css("background-color") + $(".5").css("background-color") + $(".6").css("background-color") + $(".7").css("background-color") + $(".8").css("background-color") + $(".9").css("background-color")) === "rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)") {
						//Randomize position
						if (Math.random() >= 0.5) {
							flip(".1");
						}
						if (Math.random() >= 0.5) {
							flip(".2");
						}
						if (Math.random() >= 0.5) {
							flip(".3");
						}
						if (Math.random() >= 0.5) {
							flip(".4");
						}
						if (Math.random() >= 0.5) {
							flip(".5");
						}
						if (Math.random() >= 0.5) {
							flip(".6");
						}
						if (Math.random() >= 0.5) {
							flip(".7");
						}
						if (Math.random() >= 0.5) {
							flip(".8");
						}
						if (Math.random() >= 0.5) {
							flip(".9");
						}
					}
					setTimeout(function() {
						//Fade-in table and best score
						$("table, .score-best").fadeIn("slow");
					}, 500);
				});
			}
		}, 10);
	}
}*/
