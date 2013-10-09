var Lain = new function() {
	PIXI.DisplayObjectContainer.call(this);

	this.data = {};

	for(var index in lain) { 
		if (lain.hasOwnProperty(index)) {
			var attr = lain[index];
			console.log(index, attr);

			var idle_t = PIXI.Texture.fromFrame('img/'+ attr.idle +'.png');
			var obj = {
				idle: new PIXI.Sprite(idle_t),
				turnRight: this.createMovieClip(attr.turnRight),
				moveRight: this.createMovieClip(attr.moveRight),
				moveLeft: this.createMovieClip(attr.moveLeft),
			};
			obj.turnRight.loop = false;
			obj.turnRight.onComplete = (function(that, index) {
				return function() {
					that.setUniform(index, 'moveRight');
				};
			})(this, index);

			this.addChild(obj.idle);
			obj.idle.visible = false;
			this.data[index] = obj;
		}
	}
	this.type = 'idle';
	this.setUniform('nude');

	this.buttonMode = true;
	this.setInteractive(true);

	this.mousedown = function() {
		this.drag = true;
		this._t = setTimeout((function() {
			this.drag = false;
		}).bind(this), 2000);
		console.warn('mouseDOWN');
	};
	this.mouseup = function() {
		this.drag = false;
		clearTimeout(this._t);
		console.warn('mouseUP');
	};
	this.mouseout = function() {
		if(this.drag) {
			console.warn('mouseupoutside');
			this.setUniform('nude');
			// FIXME: ugly
			dRoom.hideOnly('nude');
		} else {
			console.warn('NO');
		}
	};
};

Lain.constructor = Lain;
Lain.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Lain.prototype.createMovieClip = function(arr) {
	var textures = [];
	console.group('createMovieClip');
	console.log(arr);

	var i,len,t;
	for(i=0, len=arr.length; i<len; i++) {
		t = arr[i];
		console.log(t);
		t = PIXI.Texture.fromFrame('img/'+ t +'.png');
		textures.push(t);
	}

	var clip = new PIXI.MovieClip(textures);
	clip.animationSpeed = 0.05;
	this.addChild(clip);
	console.groupEnd();
	return clip;
};

Lain.prototype.getHitArea = function(re) {
	var obj = this.uniform;
	var x=0,y=0;
	if(!re) {
		x = this.position.x;
		y = this.position.y;
	}
	return new PIXI.Rectangle(
		x - obj.anchor.x * obj.width,
		y - obj.anchor.y * obj.height,
		obj.width,
		obj.height);
};

Lain.prototype.contains = function(x, y) {
	var area = this.getHitArea();
	console.log(area, x, y);
	return area.contains(x, y);
};

Lain.prototype.setUniform = function(name, type) {
	if(lain.hasOwnProperty(name)) {
		this.name = name || this.name;
		this.type = type || this.type;

		for(var index in this.data) { 
			if (this.data.hasOwnProperty(index)) {
				var obj = this.data[index];
				var visible = index == name;
				for(var i in obj) { 
					if (obj.hasOwnProperty(i)) {
						var el = obj[i];
						el.visible = visible && (this.type == i);
						if(el.visible && el.gotoAndPlay) {
							el.gotoAndPlay(0);
						}
						this.uniform = el;
					}
				}
			}
		}
		this.hitArea = this.getHitArea(true);
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

