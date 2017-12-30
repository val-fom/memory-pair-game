// make html markup by JS

// makes an array with 16 card classes of 8 different types (from type-0 to type-7)
var cardClasses = Array(16).fill('type-').map(function(item, i) {
	if (i > 7) return item + (i - 8);
	return item + i;
});

// shuffle it
cardClasses = shuffle(cardClasses);

// make single card of specified type in container 
var container = document.querySelector('.container');

var makeCard = function(type) {
	var card = document.createElement( 'div' );
	card.setAttribute( 'class', 'card ' + type );
	card.innerHTML = '<div class="flip-container"><div class="flipper"><div class="front"></div><div class="back"></div></div></div>';
	container.appendChild( card );
};

// populate containder with cards
cardClasses.forEach(function(type) {
	makeCard(type);
});

// game
var pickedCards = [];
var hiddenPairsCount = 0;
var cards = document.querySelectorAll('.card');

var pickCard = function(card) {
	card.classList.add('picked');
	pickedCards.push(card);
}

var closeCards = function() {
	setTimeout(function() {
		pickedCards.forEach(function(card) {
			card.classList.remove('picked');
		});
		pickedCards.length = 0;
	}, 1000);
};

var checkWin = function() {
	if (hiddenPairsCount === 8) {
		setTimeout(function() {
			alert('You won!');
		}, 300);
	}
}

var hidePickedCards = function(type) {
	pickedCards.forEach(function(card) {
		card.classList.add( 'hidden' );
	});
	pickedCards.length = 0;
	hiddenPairsCount++;
	checkWin();
};

var getType = function(card) {
	return card.getAttribute("class").slice(5, 11);
}

cards.forEach(function(card) {
	card.addEventListener('click', function() {
		if (pickedCards.length === 0) {
			pickCard(this);
		} else if (pickedCards.length === 1) {
			pickCard(this);
			if ( getType(pickedCards[0]) === getType(pickedCards[1]) && pickedCards[0] !== pickedCards[1]) {
				setTimeout(hidePickedCards, 1000);
			} else {
				closeCards();
			}
		}
	});
});

//shuffle array
function shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
};

