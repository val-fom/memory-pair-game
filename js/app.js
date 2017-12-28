// make html markup by JS

// makes an array with 16 cards of 8 different types (from type-0 to type-7)
var cardClasses = Array(16).fill('type-').map(function(item, i) {
	if (i > 7) return item + (i - 8);
	return item + i;
});

// shuffle it
cardClasses = Shuffle(cardClasses);

// make single card of specified type in container 
var makeCard = function(type) {
	var front = document.createElement( 'div' );
	front.setAttribute( 'class', 'front');

	var back = document.createElement( 'div' );
	back.setAttribute( 'class', 'back');

	var flipper = document.createElement( 'div' );
	flipper.setAttribute( 'class', 'flipper');
	flipper.appendChild( front );
	flipper.appendChild( back );

	var flipContainer = document.createElement( 'div' );
	flipContainer.setAttribute( 'class', 'flip-container');
	flipContainer.appendChild( flipper );

	var card = document.createElement( 'div' );
	card.setAttribute( 'class', 'card ' + type );
	card.appendChild( flipContainer );

	var container = document.querySelector('.container');
	container.appendChild( card );
};

// populate containder with cards
cardClasses.forEach(function(item) {
	makeCard(item);
})

//
var pickedCards = 0;
var cards = document.querySelectorAll('.card');

var pickCard = function(card) {
	card.classList.add('picked');
	pickedCards++;
}

var closeCards = function() {
	setTimeout(function() {
		document.querySelectorAll('.picked').forEach(function(card) {
			card.classList.remove('picked');
			pickedCards = 0;
		});
	}, 1000)
};

cards.forEach(function(card) {
	card.addEventListener('click', function() {
		if (pickedCards === 0) {
			pickCard(this);
		} else if (pickedCards === 1) {
			pickCard(this);
			closeCards();
		}
	});
});

//shuffle array
function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
};

