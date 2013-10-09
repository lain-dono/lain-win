var DressRoom = function() {
	PIXI.DisplayObjectContainer.call(this);

	var bg = PIXI.Texture.fromFrame('img/'+ 128 +'.png');
	this.bg = new PIXI.Sprite(bg);

	for(var index in this.data) { 
		if (this.data.hasOwnProperty(index)) {
			var attr = this.data[index];
			console.log(index, attr);

			attr.sprite = new Clothes(index, attr.img, attr.x, attr.y);
			this.addChild(attr.sprite);
		}
	}
};

DressRoom.constructor = DressRoom;
DressRoom.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

DressRoom.prototype.hideOnly = function(name) {
	for(var i=0, len = this.children.length; i<len; i++) {
		var obj = this.children[i];
		obj.visible = obj.name != name;
	}	
};

DressRoom.prototype.onUp = function(c) {
	console.log(c, c.name);
	var x = c.position.x + c.width/2;
	var y = c.position.y + c.height/2;

	if(Lain.contains(x, y)) {
		console.warn('contains', x, y);
		this.hideOnly(c.name);
		Lain.setUniform(c.name);
	}
	c.defaultPos();
};

DressRoom.prototype.data = {
	sweater: {
		img: 250,
		x: 110,
		y: 64,
	},
	school_uniform: {
		img: 247,
		x: 30,
		y: 64,
	},
	pajamas: {
		img: 249,
		x: 440,
		y: 64,
	},
	jacket: {
		img: 248,
		x: 335,
		y: 64,
	},

	ufo: {
		img: 618,
		x: 215,
		y: 8,
	},

	phone: {
		img: 614,
		x: 30,
		y: 110,
	},
	screwdriver: {
		img: 615,
		x: 30,
		y: 190,
	},
};

var Clothes = function(name, img, x, y) {
	this.name = name;
	this.img = img;
	this.x = x;
	this.y = y;
	console.warn('Clothes',name, img, x, y);

	var texture = PIXI.Texture.fromFrame('img/'+ img +'.png');


	PIXI.Sprite.call(this, texture);

	this.buttonMode = true;
	this.setInteractive(true);

	this.defaultPos();
};

Clothes.constructor = Clothes;
Clothes.prototype = Object.create(PIXI.Sprite.prototype);

Clothes.prototype.defaultPos = function() {
	this.position.x = this.x;
	this.position.y = this.y;
};
 
Clothes.prototype.mousedown = function(event) {
	this.drag = true;
	this.lastPos = event.getLocalPosition(this.parent);
	console.log('drag start', this.lastPos);
};
Clothes.prototype.mouseup = function(event) {
	this.drag = false;
	this.lastPos = event.getLocalPosition(this.parent);
	console.log('drag end', this.lastPos);

	if(this.parent.onUp) {
		this.parent.onUp(this);
	};
};
Clothes.prototype.mousemove = function(event) {
	if(!this.drag) return;
	var pos = event.getLocalPosition(this.parent);
	var re = new PIXI.Point(pos.x - this.lastPos.x, pos.y - this.lastPos.y);
	this.position.x += re.x;
	this.position.y += re.y;
	this.lastPos = pos;
	console.log('drag', this.lastPos);
};

