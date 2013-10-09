var Lain = function() {
	var idle = PIXI.Texture.fromFrame('img/'+ lain.nude.idle +'.png');
	this.idle = new PIXI.Sprite(idle);
	this.idle.anchor.x = 0.5;
	this.idle.anchor.y = 0;
	this.idle.buttonMode = true;
	this.idle.setInteractive(true);
	this.idle.mousedown = function() {
		this.drag = true;
		console.warn('mouseDOWN');
	};
	this.idle.mouseup = function() {
		this.drag = false;
		console.warn('mouseUP');
	};
	var that = this;
	this.idle.mouseout = function() {
		if(this.drag) {
			console.warn('mouseupoutside');
			that.setUniform('nude');
			// FIXME: ugly
			dRoom.hideOnly('nude');
		} else {
			console.warn('NO');
		}
	};
	this.uniform = 'nude';
};

Lain.prototype.contains = function(x, y) {
	var obj = this.idle;
	var area = new PIXI.Rectangle(
			obj.position.x - obj.anchor.x * obj.width,
			obj.position.y - obj.anchor.y * obj.height,
			obj.width,
			obj.height);
	console.log(area, x, y, obj.position);
	return area.contains(x, y);
};

Lain.prototype.setUniform = function(name) {
	if(lain.hasOwnProperty(name)) {
		this.uniform = name;
		var idle = PIXI.Texture.fromFrame('img/'+ lain[name].idle +'.png');
		this.idle.setTexture(idle);
	}
};

var lain = {
	nude: {
		idle: 129,
	},
	school_uniform: {
		idle: 243,
	},
	jacket: {
		idle: 244,
	},
	pajamas: {
		idle: 245,
	},
	sweater: {
		idle: 246,
	},
	ufo: {
		idle: 225,
	},
};

