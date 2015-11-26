$(function() {
	FastClick.attach(document.body);
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
		$("table").fadeIn("slow");
	}, 2000);
});

function flip(light) {
	if ($(light).css("background-color") === "rgb(255, 255, 255)") {
		$(light).css("background-color", "black");
	} else {
		$(light).css("background-color", "white");
	}
	if (($(".1").css("background-color") + $(".2").css("background-color") + $(".3").css("background-color") + $(".4").css("background-color") + $(".5").css("background-color") + $(".6").css("background-color") + $(".7").css("background-color") + $(".8").css("background-color") + $(".9").css("background-color")) === "rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)") {
		setTimeout(function() {
			if (($(".1").css("background-color") + $(".2").css("background-color") + $(".3").css("background-color") + $(".4").css("background-color") + $(".5").css("background-color") + $(".6").css("background-color") + $(".7").css("background-color") + $(".8").css("background-color") + $(".9").css("background-color")) === "rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)") {
				$("table").css("display", "none");
				while (($(".1").css("background-color") + $(".2").css("background-color") + $(".3").css("background-color") + $(".4").css("background-color") + $(".5").css("background-color") + $(".6").css("background-color") + $(".7").css("background-color") + $(".8").css("background-color") + $(".9").css("background-color")) === "rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)rgb(0, 0, 0)") {
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
				$("table").fadeIn("slow");
			}
		}, 10);
	}
}