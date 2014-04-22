var _Lain = function() {
	PIXI.DisplayObjectContainer.call(this);
	PIXI.EventTarget.call(this);
	this.setUniform('nude', 'idle');

	this.to_room='';
};

_Lain.constructor = _Lain;
_Lain.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

_Lain.prototype.goToRight = function() {
	this.uniform.turnRight.loop = false;
	this.uniform.turnRight.onComplete = (function(that) {
		return function() {
			that.setAnimation('moveRight');
		};
	})(this);

	this.setAnimation('turnRight');

};

_Lain.prototype.setAnimation = function(type) {
	this.type = type || this.type || 'idle';

	if(this.animation) {
		this.removeChild(this.animation);
	}

	this.animation = this.uniform[this.type];
	this.addChild(this.animation);

	// На случай ежели это спрайт
	if(this.animation.gotoAndPlay) {
		this.animation.gotoAndPlay(0);
	}
}

_Lain.prototype.getHitArea = function(re) {
	//var obj = this.uniform;
	//var obj = this.animation;
	var obj = this.uniform['idle'];
	console.log('getHitArea', obj);
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

_Lain.prototype.contains = function(x, y) {
	var area = this.getHitArea();
	console.log(area, x, y);
	return area.contains(x, y);
};


_Lain.prototype.setUniform = function(name, type) {
	if(lain.hasOwnProperty(name) && lain[name].animations) {
		console.log('setUniform', name, type);
		this.name = name || this.name || 'nude';
		//this.type = type || this.type || 'idle';

		this.uniform = lain[name].animations;
		this.setAnimation(type);

		this.hitArea = this.getHitArea(true);
	} else {
		console.error('fail setUniform', name, type);
	}
};

_Lain.prototype.updateTransform = function() {
	PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
	if(!this.type) return;
	if(this.type === 'moveLeft') {
		this.x -= 4;
		//if(this.x < -100) this.emit({type:'exitToDressRoom', content:this});
	}
	if(this.type === 'moveRight') {
		this.x += 4;
		if(this.x > 600) this.emit({type:'exit', content:this});
	}
};

var InitAnimations = function() {
	for(var index in lain) {
		if (lain.hasOwnProperty(index)) {
			var animations = lain[index].animations;
			var dress = lain[index].dress;

			for(var anim_key in animations) {
				if(animations.hasOwnProperty(anim_key)) {
					var anim = animations[anim_key];

					if(typeof(anim) === 'number') {
						// Вместо анимации одна текстура
						console.log('is nuber');
						var texture = PIXI.Texture.fromFrame('img/'+ anim +'.png');
						anim = new PIXI.Sprite(texture);
					} else {
						// Заполняем анимацию
						console.log('maybe array');

						var textures = [];

						var i,len,t;
						for(i=0, len=anim.length; i<len; i++) {
							t = anim[i];
							t = PIXI.Texture.fromFrame('img/'+ t +'.png');
							textures.push(t);
						}

						var clip = new PIXI.MovieClip(textures);
						clip.animationSpeed = 0.05;

						anim = clip;
					}

					lain[index].animations[anim_key] = anim;

				}
			}
		}
	}
};

var lain = {
	nude: {
		animations: {
			idle: 129,
			turnRight: [130, 131, 132],
			moveRight: [133,134,135,136,137,138,139,140],
			moveLeft: [141,142,143,144,145,146,147,148],
		},
	},
	school_uniform: {
		animations: {
			idle: 243,
			turnRight: [149, 150, 151],
			moveRight: [152,153,154,155,156,157,158,159],
			moveLeft: [160,161,162,163,164,165,166,167],
		},
		dress: {
			img: 247,
			x: 30,
			y: 64,
		},
	},
	jacket: {
		animations: {
			idle: 244,
			turnRight: [168, 169, 170],
			moveRight: [171,172,173,174,175,176,177,178],
			moveLeft: [179,180,181,182,183,184,185,186],
		},
		dress: {
			img: 248,
			x: 335,
			y: 64,
		},
	},
	pajamas: {
		animations: {
			idle: 245,
			turnRight: [187, 188, 189],
			moveRight: [190,191,192,193,194,195,196,197],
			moveLeft: [198,199,200,201,202,203,204,205],
		},
		dress: {
			img: 249,
			x: 440,
			y: 64,
		},
	},
	sweater: {
		animations: {
			idle: 246,
			turnRight: [206, 207, 208],
			moveRight: [209,210,211,212,213,214,215,216],
			moveLeft: [217,218,219,220,221,222,223,224],
		},
		dress: {
			img: 250,
			x: 110,
			y: 64,
		},
	},
	ufo: {
		animations: {
			idle: 225,
			turnRight: [226],
			moveRight: [227,228,229,230,231,232,233,234],
			moveLeft: [235,236,237,238,239,240,241,242],
		},
		dress: {
			img: 618,
			x: 215,
			y: 8,
		},
	},


	phone: {
		//school_uniform
		animations: {
			idle: 243,
			turnRight: [149, 150, 151],
			moveRight: [152,153,154,155,156,157,158,159],
			moveLeft: [160,161,162,163,164,165,166,167],
		},
		dress: {
			img: 614,
			x: 30,
			y: 110,
		},
	},
	screwdriver: {
		//nude
		animations: {
			idle: 129,
			turnRight: [130, 131, 132],
			moveRight: [133,134,135,136,137,138,139,140],
			moveLeft: [141,142,143,144,145,146,147,148],
		},
		dress: {
			img: 615,
			x: 30,
			y: 190,
			stick_to: {
				x:30,
				y:50,
			}
		},
	},
};

