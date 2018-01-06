'use strict';

class Game {
	constructor() {
		// makes an array with 16 card classes of 8 different types (from type-0 to type-7)
		this.cardClasses = Array(16).fill('type-').map(function(item, i) {
			if (i > 7) return item + (i - 8);
			return item + i;
		});

		this.container = document.querySelector('.container');
		this.pickedCards = [];
		this.hiddenPairsCount = 0;
	}

	//shuffle array
	shuffle(o) {
		for(let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}

	makeCards() {
		// make single card of specified type in container
		let makeCard = type => {
			let card = document.createElement( 'div' );
			card.setAttribute( 'class', 'card ' + type );
			card.innerHTML = '<div class="flip-container"><div class="flipper"><div class="front"></div><div class="back"></div></div></div>';
			this.container.appendChild( card );
		};
		//shuffle cards classNames
		this.cardClasses = this.shuffle(this.cardClasses);
		// populate containder with cards
		this.cardClasses.forEach(function(type) {
			makeCard(type);
		});
	}

	init() {
		this.makeCards();
		this.cards = document.querySelectorAll('.card');
		this.addClickHandlers(this.cards);
	}

	pickCard(card) {
		card.classList.add('picked');
		this.pickedCards.push(card);
	}

	closeCards() {
		this.pickedCards.forEach(function(card) {
			card.classList.remove('picked');
		});
		this.pickedCards.length = 0;
	}

	checkWin() {
		if (this.hiddenPairsCount === 8) {
			setTimeout(() => {
				alert('You won!');
				this.restart();
			}, 300);
		}
	}

	hidePickedCards() {
		this.pickedCards.forEach(function(card) {
			card.classList.add( 'hidden' );
		});
		this.pickedCards.length = 0;
		this.hiddenPairsCount++;
		this.checkWin();
	}

	getType(card) {
		return card.getAttribute("class").slice(5, 11);
	}

	addClickHandlers(cards) {
		cards.forEach( card => {
			card.addEventListener('click', () => {
				if (this.pickedCards.length === 0) {
					this.pickCard(card);
				} else if (this.pickedCards.length === 1) {
					this.pickCard(card);
					if (this.pickedCards[0] === this.pickedCards[1]) {
						this.closeCards();
					} else if ( this.getType(this.pickedCards[0]) === this.getType(this.pickedCards[1]) && this.pickedCards[0] !== this.pickedCards[1]) {
						setTimeout( () => { this.hidePickedCards(); }, 800);
					} else {
						setTimeout( () => { this.closeCards(); }, 800);
					}
				}
			});
		});
	}

	restart() {
		this.cardClasses = this.shuffle(this.cardClasses);
		this.cards.forEach( (card, i) => {
			card.className = 'card';
			card.classList.add( this.cardClasses[i] );
		});
		this.hiddenPairsCount = 0;
	}

}

const game = new Game();
game.init();
