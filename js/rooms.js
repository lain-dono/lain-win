var Room = function(obj, name) {
	PIXI.DisplayObjectContainer.call(this);
	this.name = name;

	/*
	if(name === 'dressroom') {
		this.scene = new DressRoom();
	} else {
		this.scene = new PIXI.DisplayObjectContainer();
		//this.scene = Lain;
	}
	*/

	if(obj.back) this.back = this.addPic(obj.back);
	if(obj.bg) this.bg = this.addPic(obj.bg);

	//var Lain = new _Lain();
	//this.lain = Lain;

	//this.addChild(Lain);
	this.scene = new PIXI.DisplayObjectContainer();
	this.addChild(this.scene);


	if(name === 'dressroom') {
		for(var index in lain) { 
			if (lain.hasOwnProperty(index)) {
				var attr = lain[index].dress;
				console.log(index, attr);
				if(!attr) continue;

				attr.sprite = new Clothes(index, attr.img, attr.x, attr.y);
				this.addChild(attr.sprite);
			}
		}

		this.hideOnly = function(name) {
			for(var i=0, len = this.children.length; i<len; i++) {
				var obj = this.children[i];
				obj.visible = obj.name != name;
			}
		};

		this.onUp = function(c) {
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

		Lain.buttonMode = true;
		Lain.setInteractive(true);

		Lain.mousedown = function() {
			this.drag = true;
			this._t = setTimeout((function() {
				this.drag = false;
			}).bind(this), 2000);
			console.warn('mouseDOWN');
		};
		Lain.mouseup = function() {
			this.drag = false;
			clearTimeout(this._t);
			console.warn('mouseUP');
		};
		Lain.mouseout = function() {
			if(this.drag) {
				console.warn('mouseupoutside');
				// FIXME: ugly
				//dRoom.hideOnly('nude');
				Room.data.dressroom.obj.hideOnly('nude');
				this.setUniform('nude');
				this.drag = false;
			} else {
				console.warn('NO');
			}
		};
	} else {

		if(obj.animation_back) {
			var anim = obj.animation_back;
			var textures = [];

			var i,len,t;
			for(i=0, len=anim.length; i<len; i++) {
				t = anim[i];
				t = PIXI.Texture.fromFrame('img/'+ t +'.png');
				textures.push(t);
			}

			var clip = new PIXI.MovieClip(textures);
			clip.animationSpeed = 0.15;
			this.animation_back = clip;

			this.addChild(clip);
		}

		if(obj.animation) {
			var anim = obj.animation;
			var textures = [];

			var i,len,t;
			for(i=0, len=anim.length; i<len; i++) {
				t = anim[i];
				t = PIXI.Texture.fromFrame('img/'+ t +'.png');
				textures.push(t);
			}

			var clip = new PIXI.MovieClip(textures);
			clip.animationSpeed = 0.15;
			this.animation = clip;

			this.addChild(clip);
		}
	}


	if(obj.front) this.bg = this.addPic(obj.front);
};


Room.constructor = Room;
Room.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Room.prototype.play = function() {
	if(this.animation) {
		this.animation.gotoAndPlay(0);
	}
	if(this.animation_back) {
		this.animation_back.gotoAndPlay(0);
	}
};

Room.prototype.addPic = function(img) {
	var t = PIXI.Texture.fromFrame('img/'+ img +'.png');
	var pic = new PIXI.Sprite(t);
	this.addChild(pic);
	return pic;
};

Room.prototype.run = function() {
};

Room.data = {
	dressroom: {
		bg: 128,
	},

	classroom: {
		icon: 606,
		bg: 251,
		front: 283,
		animation: [252, 253, 254, 255, 256, 257, 
		265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282,
		260, 261, 262, 263, 264
		],
	},
	exit_door: {
		icon: 607,
		bg: 284,
		animation: [
			301, 302, 303, 304, 304, 304,
			305, 306, 307, 308, 309, 310,
			311, 311, 311,
			311, 312, 312, 312,
			313, 314, 315, 316, 317, 318, 319, 320,
		],
		animation_back: [
			0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0,
			285, 286, 287,
			288, 289, 290,
			291, 292, 293, 294, 295, 297, 298, 299, 300,
			]
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

Room.active = '';



// Ходьба лейн из комнаты
Room.showRoom = function(name) {
	Lain.removeAllEventListeners();
	//this.
	Lain.on('exit', function() {
		console.log('exit');
	var lastRoom = Room.data[Room.active].obj;
		lastRoom.visible = false;
		lastRoom.scene.removeChild(Lain);
		Room._showRoom(name);
	});
	Lain.on('exitToDressRoom', function() {
		console.log('exitToDressRoom');
	var lastRoom = Room.data[Room.active].obj;
		lastRoom.visible = false;
		lastRoom.scene.removeChild(Lain);
		Room._showRoom('dressroom');
	});
	Lain.goToRight();
	//Room._showRoom(name);
};

// Переключение комнат
Room._showRoom = function(name) {
	Room.active = name;

	var newRoom = Room.data[name].obj;
	newRoom.scene.addChild(Lain);
	newRoom.visible = true;

	if(name === 'dressroom') {
		Lain.x = 300-100;
		Lain.y = 105;
		Lain.setAnimation('idle');
	} else {
		Lain.x = 600;
		Lain.setAnimation('moveLeft');
	}
}


Room.initAll = function(stage) {
	console.group('Rooms');
	for(var index in Room.data) { 
		if (Room.data.hasOwnProperty(index)) {
			var attr = this.data[index];
			var r = new Room(attr, index);
			stage.addChild(r);
			attr.room = r;
			r.visible = false;
			console.log('Room', index, attr);
			Room.data[index].obj = r;
		}
	}
	console.groupEnd();
	stage.removeChild(Lain);
	Room._showRoom('dressroom');
};

