(function() {

var commandsBox = $('.all_commands');
var spinBtn = $('#spin-btn');
var autoplayBtn = $('#autoplay-btn');
var maxBet = $('#maxbet-btn');
var frame = $('.slot_frame');
var lineWrapp = $('.line_wrapp');
var line;
var betInput = $('#bet-input');
var bet = parseInt(betInput.val());
var cashInput = $('#cash-input');
var cash = parseInt(cashInput.val());
var winInput = $('#win-turn');
var win = parseInt(winInput.val());
var jackpotInput = $('#jackpot');
var jackpotCounter = 1;
var jackpotProgress;
var jackpot_WIN = 10000;
var duration;
var hitsExist, autoplayActive = false;

if (localStorage.getItem("jackpotProgress")) {
	jackpotCounter = localStorage.getItem("jackpotProgress");
}
var jackpotNumber = padd(jackpotCounter, 7);
// console.log(padd(jackpotCounter, 7));
for (var i = 0; i < jackpotNumber.length; i++) {
	jackpotInput.append("<span>" + jackpotNumber[i] + "</span>");
}
jackpotCounter++;

function padd(n, digits, z) {
  z = z || '0';
  n = n + '';
  return n.length >= digits ? n : new Array(digits - n.length + 1).join(z) + n;
}


createLines();
// Kreiranje kolona za pocetni spin
function createLines() {
	lineWrapp.css('top', '-4620px');

  lineWrapp.each(function(index, el) {
  	$('<div></div>', {
			'style': 'bottom: 0; position: absolute',
			'class': 'line'
		}).appendTo(el)
  });

	line = $('.line');
	// console.log(line);
	createImages(line);
}

// Kreiram kolone - ovo se pokrece nakon prvog spina
function createNewLines() {
	lineWrapp.css('top', '-4620px');

	for (var i = 2; i > 0; i--) {
    lineWrapp.each(function(index, el) {
    	$('<div></div>', {
				'style': 'top: 0',
				'class': 'line'
			}).prependTo(el)
    });
	}

	line = $('.line');
	createImages(line);
}

// Kreiranje slika
function createImages(line) {
  for (var i = 0; i < 21; i++) {

		// Ako nije prvi row uporedjujem nazive slika
		// da se ne poklapa sa prethodnom (poslednje kreiranom), kako ne bi bile dve iste slike u koloni
    if (i > 0) {
      line.each(function(index, el) {
        let rand = Math.floor(Math.random() * fruits.length);
          $(this).append('<div data-img="'+ (i+1) +'"><img src="images/'+ fruits[rand] +'.png" alt="'+ fruits[rand] +'"></div>')
      });

		// U prvom row ne treba da se uporedjuju slike
    }else {
      line.each(function(index, el) {
        let rand = Math.floor(Math.random() * fruits.length);
        $(this).append('<div data-img="'+ (i+1) +'"><img src="images/'+ fruits[rand] +'.png" alt="'+ fruits[rand] +'"></div>')
      });
    }
  }
}

// Event za povecanje i smanjenje BET
commandsBox.on('click', '#plus-btn', betIncrease);
commandsBox.on('click', '#minus-btn', betDecrease);
commandsBox.on('click', '#maxbet-btn', maximumBet);
commandsBox.on('change', '#bet-input', function (e) {
	e.preventDefault();
});

function betIncrease() {
	if (bet < 300) {
		bet += 50;
		betInput.val(bet);
	}else {
		bet = 300;
		betInput.val(bet);
	}
}
function betDecrease() {
	if (bet > 50) {
		bet -= 50;
		betInput.val(bet);
	}else {
		bet = 50;
		betInput.val(bet);
	}
}
function maximumBet() {
	bet = 300;
	betInput.val(bet);
}

// Event za START SPIN
commandsBox.on('click', '.spin_btn', startSpin);
commandsBox.on('click', '.autoplay_btn', startAutoplay);


// Pokrece se animacija za autoplay
function startAutoplay() {
	let self = $(this);
	hitsExist = false;
	jackpotNumber = padd(jackpotCounter, 7);
	jackpotInput.html("");
	for (var i = 0; i < jackpotNumber.length; i++) {
		jackpotInput.append("<span>" + jackpotNumber[i] + "</span>");
	}
	jackpotProgress = localStorage.setItem("jackpotProgress", jackpotCounter);
	jackpotCounter++;
	// autoplayActive = true;

	createNewLines();
	calculateCash();

	$('.scored').removeClass('scored');
  commandsBox.off('click','.spin_btn')
							.off('click','.autoplay_btn')
							.on('click','.autoplay_btn', stopAutoplay);
	spinBtn.attr('disabled',true).addClass('disabled');
	autoplayBtn.html('Stop!')

	function stopAutoplay() {
		hitsExist = true;
		// autoplayActive = false;
	}

	lineWrapp.each(function(index, el) {
		// console.log('autoplay');
		lineWrapp.eq(index).animate({top: '0px'}, 1000, 'easeOutCirc')
	});

	// Kada je sigurno zavrsena animacija ponovo kreiram kolone i dodajem event
	lineWrapp.promise().done(function () {
		spinBtn.attr('disabled',false).removeClass('disabled');
		line.addClass('line_done');
		if (cash <= 0) {
			endGame();
		}else {
		// Brisanje slika koje se vise ne vide
			deleteLines();

		// Uporedjivanje dobitnih kombinacija (pogodaka)
			let hits = $('.line_done').children();
			checkForHits(hits);

			if (hitsExist === true) {
				// console.log(hitsExist);

				// Event za START SPIN
				commandsBox.on('click', '.spin_btn', startSpin);
				commandsBox.off('click','.autoplay_btn')
									 .on('click', '.autoplay_btn', startAutoplay);
			  autoplayBtn.html('Autoplay');
				// return;
			}else {
					// console.log(autoplayActive);
					startAutoplay();
					// console.log(hitsExist);
			}
		}
	});
}

// Pokrece se animacija za obican spin
function startSpin() {
	// console.log('radi spin');
	// console.log(bet);
	// console.log(cash);
	// console.log(line);
	let self = $(this);

	hitsExist = false;
	jackpotNumber = padd(jackpotCounter, 7);
	jackpotInput.html("");
	for (var i = 0; i < jackpotNumber.length; i++) {
		jackpotInput.append("<span>" + jackpotNumber[i] + "</span>");
	}
	jackpotProgress = localStorage.setItem("jackpotProgress", jackpotCounter);
	jackpotCounter++;

	// Kreiranje novih kolona iznad
	createNewLines();
	calculateCash();

	$('.scored').removeClass('scored');
  commandsBox.off('click','.spin_btn');
  commandsBox.off('click','.autoplay_btn');
  spinBtn.attr('disabled',true).addClass('disabled');

	// Razlicito vreme trajanja animacije za svaku kolonu
	lineWrapp.each(function(index, el) {
		let rand = Math.floor(Math.random() * (3000 - 1500) + 1500);
		if (index == 0) {
			duration = 1500;
		// console.log(duration);
		}
		if (index == 1) {
			duration = rand;
		}
		else if (index == 2) {
			duration = rand;
		}
		else if (index == 3) {
			duration = rand;
		}
		else if (index == 4) {
			duration = 3000;
		}
		lineWrapp.eq(index).animate({top: '0px'}, duration, 'easeOutCirc')
	});

	// Kada je sigurno zavrsena animacija ponovo kreiram kolone i dodajem event
	lineWrapp.promise().done(function () {
		spinBtn.attr('disabled',false).removeClass('disabled');
		line.addClass('line_done');
		if (cash <= 0) {
			endGame();
		}else {
		// Brisanje slika koje se vise ne vide
			deleteLines();

		// Uporedjivanje dobitnih kombinacija (pogodaka)
			let hits = $('.line_done').children();
			// console.log(hits);
			checkForHits(hits);

		// Event za START SPIN
			commandsBox.on('click', '.spin_btn', startSpin);
			commandsBox.on('click', '.autoplay_btn', startAutoplay);
		}
	});
}
// Oduzimanje uloga od ukupne sume (cash)
function calculateCash() {
	winInput.val(0);
	win = 0;
	cash = parseInt(cashInput.val());
	cash -= bet;
	cashInput.val(cash);
	// console.log(cashInput.val(cash));
}

function endGame() {
	alert("Game over! :'(")
	commandsBox.off('click');
}

// Brisanje nakon animacije
function deleteLines() {

	// U prvim kolonama su dobitne kombinacije, zato
	// Brisemo sve osim njih koje su na 0 index poziciji sa svim svojim slicicama
	lineWrapp.each(function(index, el) {
		if (lineWrapp.eq(index).children('.line_done:gt(0)')) {
			lineWrapp.eq(index).children('.line_done:gt(0)').remove();
		}
	});

 // Brisanje preostalih slika iz prvih kolona
	let deleteItems = $('.line_done').children();
	deleteItems.each(function(index, el) {
		if (deleteItems.eq(index).attr('data-img') > 3) {
			deleteItems.eq(index).remove();
		}
		// console.log(deleteItems.eq(index).attr('data-img'));
	});
}

// Uporedjivanje dobitnih kombinacija (pogodaka)
function checkForHits(hits) {
	// console.log(hits);
	let allScoreLines = [], scoredLines = [], scoredLinesIndex = [];
	let imgHits = hits.find('img');
	// console.log(imgHits);
	allScoreLines = [
										[imgHits[0], imgHits[3], imgHits[6], imgHits[9], imgHits[12]],
										[imgHits[1], imgHits[4], imgHits[7], imgHits[10], imgHits[13]],
										[imgHits[2], imgHits[5], imgHits[8], imgHits[11], imgHits[14]],
										[imgHits[2], imgHits[4], imgHits[6], imgHits[10], imgHits[14]],
										[imgHits[0], imgHits[4], imgHits[8], imgHits[10], imgHits[12]]
									];

	$.each(allScoreLines, function(index,el) {
		let first = $(el).eq(0).attr('src');
		let second = $(el).eq(1).attr('src');
		let third = $(el).eq(2).attr('src');
			// console.log($(el).attr('src'));
			if (first !== second || first !== third) {
				el.splice(0, el.length);
				// console.log(el);
			}
			else if (first === second && first === third) {
				scoredLinesIndex.push(index);
				if (first !== $(el).eq(3).attr('src')) {
					allScoreLines[index].splice(3, allScoreLines[index].length)
				}
				if (first !== $(el).eq(4).attr('src')) {
					allScoreLines[index].splice(4, allScoreLines[index].length)
				}
				// console.log(allScoreLines[index]);
			}
	});

	$(allScoreLines).each(function(index, el) {
		if (allScoreLines[index].length !== 0) {
			console.log('pogodak na liniji -> ' + index);
			scoredLines.push(allScoreLines[index]);
			hitsExist = true;
		}
	});
	console.log(scoredLinesIndex);
	// console.log(scoredLines);
	checkFullhouse(scoredLines, scoredLinesIndex);
	checkJackpot(scoredLines, scoredLinesIndex)
}

function checkJackpot(scoredLines, scoredLinesIndex) {
	// console.log(jackpotCounter);
	// console.log(jackpot_WIN);
	if (jackpot_WIN === jackpotCounter) {
		$(scoredLines).each(function(index, el) {
			// console.log($(el).eq(0).attr('src'));
			if (el.length === 3 && $(el).eq(0).attr('src') === 'images/cherry.png') {
				alert('JACKPOT !!!\n YOU WON\n 1.000.000 din');
				winInput.val(100000);
				cashInput.val(cash + 100000);
				win = 100000;
			}
		});
		jackpot_WIN += jackpot_WIN;
	}
}

function checkFullhouse(scoredLines, scoredLinesIndex) {
	var hitedFruit = [];
	var time = 1850;
	let hitFullhouse = false;
	let hitPocker = false;
	let hitTrips = false;
	// console.log(bet);
	// console.log(cash);
	// console.log(winInput.val());

	if (scoredLines.length > 0) {
		console.log(scoredLinesIndex.length);
		console.log(scoredLines);

		$(scoredLines).each(function(index, el) {
			setTimeout(function () {
				setTimeout(function () {
					$(el).removeClass('scored_anim' + index);
				},1800);

				$(el).addClass('scored scored_anim' + index);

			},index * time);

			hitedFruit.push($(scoredLines[index]).attr('src'));

			if (el.length === 5) {
				let score = new CalculateFullhouse(bet,win,cash,hitedFruit[index]);
				winInput.val(score.win);
				cashInput.val(score.cash);
				win = score.win;
				console.log(score);
				// console.log(score.win);
				// console.log(hitedFruit);
			}
		});
		checkPocker(scoredLines,scoredLinesIndex,hitedFruit,time,win);
	}
}

function checkPocker(scoredLines,scoredLinesIndex,hitedFruit,time,win) {
	console.log(win);
	$(scoredLines).each(function(index, el) {
		// console.log(el);
		if (el.length === 4) {
			let score = new CalculatePocker(bet,win,cash,hitedFruit[index]);
			winInput.val(score.win);
			cashInput.val(score.cash);
			win = score.win;
			console.log(score);
			// console.log(score.win);
		}
	});
	checkTrips(scoredLines,scoredLinesIndex,hitedFruit,time,win);
}

function checkTrips(scoredLines,scoredLinesIndex,hitedFruit,time,win) {
	$(scoredLines).each(function(index, el) {
		if (el.length === 3) {
			let score = new CalculateTrips(bet,win,cash,hitedFruit[index]);
			winInput.val(score.win);
			cashInput.val(score.cash);
			win = score.win;
			console.log(score);
			// console.log(score.win);
		}
	});
}


console.log(result(12345));

function result(num) {
	return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

}());
