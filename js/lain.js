var Lain = function() {
	var idle = PIXI.Texture.fromFrame('img/'+ lain.nude.idle +'.png');
	this.idle = new PIXI.Sprite(idle);
	this.idle.anchor.x = 0.5;
	this.idle.anchor.y = 0;
	this.idle.buttonMode = true;
	this.idle.setInteractive(true);
	this.idle.mousedown = function() {
		this.drag = true;
		this._t = setTimeout((function() {
			this.drag = false;
		}).bind(this), 2000);
		console.warn('mouseDOWN');
	};
	this.idle.mouseup = function() {
		this.drag = false;
		clearTimeout(this._t);
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
		turnRight: [130, 131, 132],
		moveRight: [133,134,135,136,137,138,139,140],
		moveLeft: [141,142,143,144,145,146,147,148],
	},
	school_uniform: {
		idle: 243,
		turnRight: [149, 150, 151],
		moveRight: [152,153,154,155,156,157,158,159],
		moveLeft: [160,161,162,163,164,165,166,167],
	},
	jacket: {
		idle: 244,
		turnRight: [168, 169, 170],
		moveRight: [171,172,173,174,175,176,177,178],
		moveLeft: [179,180,181,182,183,184,185,186],
	},
	pajamas: {
		idle: 245,
		turnRight: [187, 188, 189],
		moveRight: [190,191,192,193,194,195,196,197],
		moveLeft: [198,199,200,201,202,203,204,205],
	},
	sweater: {
		idle: 246,
		turnRight: [206, 207, 208],
		moveRight: [209,210,211,212,213,214,215,216],
		moveLeft: [217,218,219,220,221,222,223,224],
	},
	ufo: {
		idle: 225,
		turnRight: [226],
		moveRight: [227,228,229,230,231,232,233,234],
		moveLeft: [235,236,237,238,239,240,241,242],
	},
};

