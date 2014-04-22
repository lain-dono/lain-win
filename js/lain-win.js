var renderer = PIXI.autoDetectRenderer(600, 400);
var stage = new PIXI.Stage(0x66FF99, true);

var Lain = null;
//var dRoom = null;

// Начальная загрузка текстур
var AllLoader = function() {
	console.groupCollapsed('Load Textures');
	var start = 128;
	var end = 654;
	var crossorigin = false;

	var count = start;

	this.onEnd = function() {
		console.warn('END');
		//dRoom = new DressRoom();
		//stage.addChild(dRoom.bg);
		//console.warn('dRoom');

		console.warn('lain');

		Lain = new _Lain();

		Lain.position.x = 300-100;
		Lain.position.y = 105;

		Room.initAll(stage);

		//stage.addChild(Lain);

		//stage.addChild(dRoom);


		var el_loader = document.getElementById('loader');
		el_loader.parentNode.removeChild(el_loader);
		document.body.appendChild(renderer.view);
		requestAnimFrame(animate);
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
					if(count > end) {
						console.groupEnd();
						scope.onEnd.call(scope); 
					}
				};
			})(i, name, this) );

			loader.load();
		}
	};
};

var l = new AllLoader();

l.load();

function animate() {
	requestAnimFrame(animate);
	renderer.render(stage);
}
