
function CalculateTrips(bet,win,cash,hitedFruit) {
	this.score = function () {
		if (hitedFruit === 'images/cherry.png') {
			this.win = win + (bet * 2);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/lemon.png') {
			this.win = win + (bet * 3);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/plum.png') {
			this.win = win + (bet * 4);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/orange.png') {
			this.win = win + (bet * 5);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/banana.png') {
			this.win = win + (bet * 6);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/watermellon.png') {
			this.win = win + (bet * 7);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/bar.png') {
			this.win = win + (bet * 8);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/jackpot.png') {
			this.win = win + (bet * 20);
			this.cash = this.win + cash;
		}
	}
	return this.score();
}

function CalculatePocker(bet,win,cash,hitedFruit) {

	this.score = function () {
		if (hitedFruit === 'images/cherry.png') {
			this.win = win + (bet * 4);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/lemon.png') {
			this.win = win + (bet * 6);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/plum.png') {
			this.win = win + (bet * 8);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/orange.png') {
			this.win = win + (bet * 10);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/banana.png') {
			this.win = win + (bet * 12);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/watermellon.png') {
			this.win = win + (bet * 14);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/bar.png') {
			this.win = win + (bet * 16);
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/jackpot.png') {
			this.win = win + (bet * 40);
			this.cash = this.win + cash;
		}
	}
	return this.score();
	// console.log(hitedFruit);
}

function CalculateFullhouse(bet,win,cash,hitedFruit) {

	this.score = function () {
		if (hitedFruit === 'images/cherry.png') {
			this.win = bet * 16;
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/lemon.png') {
			this.win = bet * 24;
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/plum.png') {
			this.win = bet * 32;
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/orange.png') {
			this.win = bet * 40;
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/banana.png') {
			this.win = bet * 48;
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/watermellon.png') {
			this.win = bet * 56;
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/bar.png') {
			this.win = bet * 64;
			this.cash = this.win + cash;
		}
		else if (hitedFruit === 'images/jackpot.png') {
			this.win = bet * 100;
			this.cash = this.win + cash;
		}
	}
	return this.score();
	// console.log(hitedFruit);
}
