
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


function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
};

