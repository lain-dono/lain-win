var renderer = PIXI.autoDetectRenderer(600, 400);
var stage = new PIXI.Stage(0x66FF99, true);

var Room = function(stage) {
	var bg = PIXI.Texture.fromFrame('img/'+ rooms.classroom.bg +'.png');
	var front = PIXI.Texture.fromFrame('img/'+ rooms.classroom.front +'.png');

	this.bg = new PIXI.Sprite(bg);
	this.front = new PIXI.Sprite(front);

	stage.addChild(this.bg);
	stage.addChild(this.front);
};

var l = new AllLoader();

var la = null;
var dRoom = null;

l.onEnd = function() {
	console.warn('END');
	//var r = new Room(stage);
	dRoom = new DressRoom();
	stage.addChild(dRoom.bg);
	console.warn('dRoom');

	//la = new Lain();
	console.warn('lain');

	Lain.position.x = 300-100;
	Lain.position.y = 105;
	stage.addChild(Lain);
/*
	xx = new LainMovable('nude', lain.nude);
	stage.addChild(xx.moveRight);
	xx.moveRight.animationSpeed = 0.04;
	xx.moveRight.play();
	*/

	stage.addChild(dRoom);

	var el_loader = document.getElementById('loader');
	el_loader.parentNode.removeChild(el_loader);
	document.body.appendChild(renderer.view);
	requestAnimFrame(animate);
};

l.load();

function animate() {
	requestAnimFrame(animate);
	renderer.render(stage);
}
