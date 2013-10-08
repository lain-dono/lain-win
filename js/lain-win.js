var renderer = PIXI.autoDetectRenderer(600, 400);
var stage = new PIXI.Stage(0x66FF99);

var Room = function(stage) {
	var bg = PIXI.Texture.fromFrame('img/'+ rooms.classroom.bg +'.png');
	var front = PIXI.Texture.fromFrame('img/'+ rooms.classroom.front +'.png');

	this.bg = new PIXI.Sprite(bg);
	this.front = new PIXI.Sprite(front);

	stage.addChild(this.bg);
	stage.addChild(this.front);
};

var l = new AllLoader();

l.onEnd = function() {
	var r = new Room(stage);
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