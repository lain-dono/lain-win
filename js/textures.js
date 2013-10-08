var rooms = {
	classroom: {
		icon: 606,
		bg: 251,
		front: 283,
	},
	exit_door: {
		icon: 607,
		bg: 284,
	},
	bedroom: {
		icon: 608,
		bg: 616,
	},
	alice_door: {
		icon: 609,
		bg: 617,
	},
	club: {
		icon: 610,
		bg: 379,
	},
	street: {
		icon: 611,
		bg: 391,
	},
	bridge: {
		icon: 612,
		bg: 437,
		front: 447,
	},
};

var AllLoader = function() {
	var start = 128;
	var end = 654;
	var crossorigin = false;

	var count = start;

	this.onEnd = function() {
		console.warn('END');
	};

	this.load = function() {
		for(var i = start; i <= end; i++) {
			var name = 'img/'+ i +'.png';
			var loader = new PIXI.ImageLoader(name, crossorigin);

			loader.addEventListener('loaded', (function(i, name, scope) {
				return function(event) {
					var lo = event.content;
					console.log('loaded[%d] %s',
						(++count) - start,
						name,
						lo.texture);
					if(count > end) scope.onEnd.call(scope); 

				};
			})(i, name, this) );

			loader.load();
		}
	};
};

